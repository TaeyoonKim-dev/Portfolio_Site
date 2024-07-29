const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// SQLite 데이터베이스 파일 경로
const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// JSON 요청 본문을 파싱할 미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 제공
app.use(express.static(__dirname));

// 데이터베이스 초기화
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS contact_messages (
                                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                        name TEXT NOT NULL,
                                                        email TEXT NOT NULL,
                                                        message TEXT NOT NULL
        )
    `);
});

// 루트 라우트
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 연락처 폼 데이터 처리
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const stmt = db.prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");
    stmt.run(name, email, message, function(err) {
        if (err) {
            console.error('Error saving message:', err.message);
            res.status(500).json({ success: false, message: 'Error saving message. Please try again.' });
        } else {
            res.json({ success: true });
        }
    });
    stmt.finalize();
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
