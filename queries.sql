DROP TABLE IF EXISTS blogposts;
<<<<<<< HEAD
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
=======

CREATE TABLE blogposts(
	post_id SERIAL PRIMARY KEY,
	post_title VARCHAR(70) NOT NULL,
	post_desc TEXT NOT NULL,
	post_date DATE NOT NULL,
	user_id INT DEFAULT 1
);

INSERT INTO blogposts (post_title, post_desc,post_date) VALUES ('How to do that','Do it this way','2024-08-24');
>>>>>>> 457b1ae8f1e8a18dc1f3c888431540d6f81425ea
