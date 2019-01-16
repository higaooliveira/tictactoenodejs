CREATE DATABASE tictactoe;

USE tictactoe;

CREATE TABLE games (
    id int PRIMARY KEY AUTO_INCREMENT,
    playerX VARCHAR(30),
    playerO VARCHAR(30),
    plays VARCHAR(30),
    img text
)