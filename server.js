import express from 'express';
import { supabase } from './supabaseClient.js'; // Supabase 클라이언트 가져오기
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors'; // CORS 패키지 임포트

const app = express();
const port = 3000;

// CORS 설정
app.use(cors({
    origin: 'http://localhost:3000', // 허용할 도메인 설정
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 제공
app.use(express.static(path.join(process.cwd(), 'public')));

// 루트 라우트
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
});

// 연락처 폼 데이터 처리
app.post('/contact', async (req, res) => {
    console.log('Received request body:', req.body); // 요청 본문 로그

    const { name, email, message } = req.body;

    if (!message) {
        console.error('Message is required.');
        return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const { error } = await supabase
        .from('contact_messages')
        .insert([{ name: name || null, email: email || null, message }]);

    if (error) {
        console.error('Error saving message:', error.message);
        return res.status(500).json({ success: false, message: 'Error saving message. Please try again.' });
    }

    res.json({ success: true });
});



// 서버 시작
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
