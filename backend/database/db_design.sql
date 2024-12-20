drop database if exists users;
CREATE DATABASE IF NOT EXISTS users;
USE users;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    gender VARCHAR(10),
    password VARCHAR(255) NOT NULL,
    contact VARCHAR(20)
);

delete from users where id=6;
select * from users;