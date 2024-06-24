DROP TABLE IF EXISTS blogposts;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
	userid SERIAL PRIMARY KEY,
	name VARCHAR(20) NOT NULL,
	email VARCHAR(30) NOT NULL UNIQUE,
	password VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS blogposts(
    post_id SERIAL PRIMARY KEY,
    post_title VARCHAR(100) NOT NULL,
    post_desc TEXT NOT NULL,
    post_date DATE,
	userid INT,
    FOREIGN KEY (userid) REFERENCES users(userid)
);