from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/log_ip', methods=['POST'])
def log_ip():
    ip = request.remote_addr
    with open('ips.txt', 'a') as f:
        f.write(f"{ip}\n")
    return jsonify({"message": "IP logged"}), 200

if __name__ == '__main__':
    app.run(debug=True)
