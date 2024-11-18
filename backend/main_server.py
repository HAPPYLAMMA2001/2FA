from flask import Flask, request, jsonify, render_template
import mysql.connector
import random
import string
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_cors import CORS
from dotenv import dotenv_values
import bcrypt
#--------------------------------------------------------------------

secrets = dotenv_values(r"backend\pass.env")
app = Flask(__name__)
CORS(app)
otp_storage = {}
password_storage = {}


db = mysql.connector.connect(
    host="localhost",
    user="root",
    password=secrets["DATABASEPW"],
    database="users"
)
cursor = db.cursor()

def generate_otp(length=6):
    return ''.join(random.choices(string.digits, k=length))

def send_otp_via_email(email, otp):
    sender_email = secrets["API_EMAIL"]
    sender_password = secrets["API_KEY"]
    smtp_server = "smtp.gmail.com" 
    smtp_port = 587 

    subject = "Your OTP Code"
    body = f"Your OTP code is: {otp}. Please use this to verify your account."

    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()  
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, email, message.as_string())
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False
#----------------------------------------------------------
@app.route('/login', methods=['POST'])
def login_user():
    print("LOGIN EXECUTED")
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        query = "SELECT password FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        result = cursor.fetchone()

        if result:
            stored_hashed_password = result[0].encode('utf-8') 
            if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password):
                return jsonify({"status": "Login successful"}), 200
            else:
                return jsonify({"error": "Invalid password"}), 401
        else:
            return jsonify({"error": "Email not found"}), 404
    except mysql.connector.Error as e:
        print(f"Database error: {e}")
        return jsonify({"error": "Database error occurred"}), 500

#----------------------------------------------------------
def verify_otp(user_otp, stored_otp):
    return user_otp == stored_otp

def insert_user_data(email,password):
    user_name = "React_testing"
    first_name = "John"
    middle_name = "M"
    last_name = "Doe"
    age = 30
    dob = "1993-01-01"
    gender = "Male"
    contact = "1234567890"
    
    try:
        query = """
        INSERT INTO users (user_name, email, gender, password, contact)
        VALUES (%s, %s, %s, %s, %s)
        """
        values = (user_name, email, gender, password, contact)
        cursor.execute(query, values)
        db.commit()
        return True
    except mysql.connector.Error as e:
        print(f"Database error: {e}")
        return False
def verify_password(provided_password, stored_hashed_password):
    return bcrypt.checkpw(provided_password.encode('utf-8'), stored_hashed_password)

def hash_password(password):
    bytes = password.encode('utf-8') 
    salt = bcrypt.gensalt() 
    hashed = bcrypt.hashpw(bytes, salt) 
    print("Hashed Password: ",hashed)
    return hashed
# Route to serve the HTML form
# @app.route('/')
# def index():
#     return render_template('index.html')

@app.route('/generate_otp', methods=['POST'])
def generate_and_send_otp():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    print("GENEMAIL",email)
    password = hash_password(password)
    if not email:
        return jsonify({"error": "Email is required"}), 400

    otp = generate_otp()
    otp_storage[email] = otp  # Store the OTP for this email
    password_storage[email] = password
    print("Generated OTP:", otp)

    if send_otp_via_email(email, otp):
        return jsonify({"status": "OTP sent to your email"}), 200
    else:
        return jsonify({"error": "Failed to send OTP via email"}), 500
    
@app.route('/verify_otp', methods=['POST'])
def verify_and_insert_data():
    data = request.get_json()
    email = data.get('email')
    user_input_otp = data.get('otp')
    password = data.get('password')
    print(email,":",password)
    if email not in otp_storage:
        return jsonify({"error": "OTP not generated for this email"}), 400
    stored_otp = otp_storage[email]
    if verify_otp(user_input_otp, stored_otp):
        if insert_user_data(email,password_storage[email]):
            otp_storage.pop(email, None)
            password_storage.pop(email,None)
            return jsonify({"status": "User data inserted successfully"}), 200
        else:
            return jsonify({"error": "Failed to insert user data"}), 500
    else:
        return jsonify({"error": "Invalid OTP"}), 401

if __name__ == '__main__':
    app.run(port=5000, debug=True)