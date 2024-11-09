from flask import Flask, request, jsonify
import mysql.connector
import random
import string
import requests

app = Flask(__name__)

db = mysql.connector.connect(
    host="localhost",
    user="dbms",
    password="dbms21i@",
    database="info_sec"
)
cursor = db.cursor()

def generate_otp(length=6):
    otp = ''.join(random.choices(string.digits, k=length))
    return otp

def send_otp_to_server(email, otp):
    url = 'http://localhost:8000/receive_otp'
    data = {"email": email, "otp": otp}
    response = requests.post(url, json=data)
    return response.status_code == 200

def verify_otp(user_otp, generated_otp):
    return user_otp == generated_otp

def insert_user_data(user_name, first_name, middle_name, last_name, email, age, dob, gender, password, contact):
    try:
        query = """
        INSERT INTO users (user_name, first_name, middle_name, last_name, email, age, dob, gender, password, contact)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (user_name, first_name, middle_name, last_name, email, age, dob, gender, password, contact)
        cursor.execute(query, values)
        db.commit()
        return True
    except mysql.connector.Error as e:
        print(f"Database error: {e}")
        return False

# Route to start OTP process
# @app.route('/generate_otp', methods=['POST'])
# def generate_and_verify_otp():
#     data = request.get_json()
#     email = data.get('email')
#     user_data = data.get('user_data')  # user_data should contain other user details

#     if not email or not user_data:
#         return jsonify({"error": "Email and user data are required"}), 400

#     # Generate OTP and send it to the OTP receiver server
#     otp = generate_otp()
#     if send_otp_to_server(email, otp):
#         user_input_otp = data.get('otp')
        
#         # Verify OTP if provided by user
#         if user_input_otp:
#             if verify_otp(user_input_otp, otp):
#                 # Insert user data only if OTP is verified
#                 if insert_user_data(**user_data):
#                     return jsonify({"status": "User data inserted successfully"}), 200
#                 else:
#                     return jsonify({"error": "Failed to insert user data"}), 500
#             else:
#                 return jsonify({"error": "Invalid OTP"}), 401
#         else:
#             return jsonify({"status": "OTP sent, awaiting verification"}), 202
#     else:
#         return jsonify({"error": "Failed to send OTP to the receiver server"}), 500
@app.route('/generate_otp', methods=['POST'])
def generate_and_verify_otp():
    user_name = "hardcoded_username"
    first_name = "John"
    middle_name = "M"
    last_name = "Doe"
    email = "john.doe@example.com"
    age = 30
    dob = "1993-01-01"
    gender = "Male"
    password = "securepassword"
    contact = "1234567890"

    otp = generate_otp()
    if send_otp_to_server(email, otp):
        user_input_otp = request.json.get('otp')  # Get the user-provided OTP from the request data
        
        if user_input_otp:
            if verify_otp(user_input_otp, otp):
                
                if insert_user_data(user_name, first_name, middle_name, last_name, email, age, dob, gender, password, contact):
                    return jsonify({"status": "User data inserted successfully"}), 200
                else:
                    return jsonify({"error": "Failed to insert user data"}), 500
            else:
                return jsonify({"error": "Invalid OTP"}), 401
        else:
            return jsonify({"status": "OTP sent, awaiting verification"}), 202
    else:
        return jsonify({"error": "Failed to send OTP to the receiver server"}), 500


if __name__ == '__main__':
    app.run(port=5000, debug=True)
