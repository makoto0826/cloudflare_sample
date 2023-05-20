CREATE TABLE users(
    user_id int NOT NULL AUTO_INCREMENT,
    user_name varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
)

CREATE TABLE board_categories(
    category_id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    PRIMARY KEY (category_id)
)

CREATE TABLE board_boards(
    board_id int NOT NULL AUTO_INCREMENT,
    category_id int NOT NULL,
    title varchar(255) NOT NULL,
    content text NOT NULL,
    PRIMARY KEY (board_id)
)

CREATE TABLE board_comments(
    comment_id int NOT NULL AUTO_INCREMENT,
    board_id int NOT NULL,
    user_id int NOT NULL,
    user_name  varchar(255) NOT NULL,
    content text NOT NULL,
    PRIMARY KEY (comment_id)
)