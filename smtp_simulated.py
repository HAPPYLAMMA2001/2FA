from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/receive_otp', methods=['POST'])
def receive_otp():
    data = request.get_json()
    otp = data.get('otp')
    email = data.get('email')
    
    if otp and email:
        print(f"Received OTP for {email}: {otp}")
        return jsonify({"status": "OTP received"}), 200
    else:
        return jsonify({"error": "Invalid data"}), 400

if __name__ == '__main__':
    app.run(port=8000, debug=True)
