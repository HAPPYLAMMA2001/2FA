CREATE DATABASE IF NOT EXISTS info_sec;
USE info_sec;

-- Table for storing temporary user details during registration (before email verification)
CREATE TABLE verify_email (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255),
    verification_status BINARY,  -- 0: Not Verified, 1: Verified
    verification_token VARCHAR(255),  -- Token sent via email
    token_expiry DATETIME NOT NULL  -- Expiry time for the verification token
);

-- Main users table for storing verified user details
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(50),
    first_name VARCHAR(30) NOT NULL,
    middle_name VARCHAR(30),
    last_name VARCHAR(30),
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT NOT NULL,
    dob DATE,
    gender VARCHAR(10),
    password VARCHAR(255) NOT NULL,
    contact VARCHAR(20)
);

-- Table for email verification (token verification after registration)
CREATE TABLE verification_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    verification_token VARCHAR(255),
    verified BINARY,  -- 0: Not Verified, 1: Verified
    FOREIGN KEY (user_id) REFERENCES users(id) 
);

-- Table for storing two-factor authentication (2FA) details, limited to email-based 2FA
CREATE TABLE two_factor_auth (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    auth_token VARCHAR(255) NOT NULL,  -- 2FA token (sent via email)
    token_expiry DATETIME NOT NULL,  -- Expiry time for the token
    verified BINARY,  -- 0: Not Verified, 1: Verified
    FOREIGN KEY (user_id) REFERENCES users(id)
);
