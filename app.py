from flask import Flask, request, jsonify, render_template
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/log_info', methods=['POST'])
def log_info():
    data = request.get_json()
    ip = data.get('ip', 'Unknown IP')
    user_agent = data.get('user_agent', 'Unknown User Agent')
    timestamp = data.get('timestamp', 'Unknown Timestamp')

    # 로그 형식 설정
    log_entry = f"Timestamp: {timestamp}, IP: {ip}, User Agent: {user_agent}\n"

    # 정보를 `ips.txt`에 추가
    with open('ips.txt', 'a') as f:
        f.write(log_entry)

    return jsonify({"message": "Information logged"}), 200

if __name__ == '__main__':
    app.run(debug=True)
