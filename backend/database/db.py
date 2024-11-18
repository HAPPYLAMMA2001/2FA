import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()
cursor.execute('''
CREATE TABLE IF NOT EXISTS two_factor_auth (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    auth_token VARCHAR(255),
    token_expiry DATETIME,
    verified BINARY(1));
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    user_name VARCHAR(50),
    first_name VARCHAR(30),
    middle_name VARCHAR(30),
    last_name VARCHAR(30),
    email VARCHAR(100),
    age INTEGER,
    dob DATE,
    gender VARCHAR(10),
    password VARCHAR(255),
    contact VARCHAR(20));
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS verification_table (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    verification_token VARCHAR(255),
    verified BINARY(1));
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS verify_email (
    id INTEGER PRIMARY KEY,
    user_name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(255),
    verification_status BINARY(1),
    verification_token VARCHAR(255),
    token_expiry DATETIME);
''')
conn.commit()
conn.close()
