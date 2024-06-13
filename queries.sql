DROP TABLE IF EXISTS blogposts;

CREATE TABLE blogposts(
	post_id SERIAL PRIMARY KEY,
	post_title VARCHAR(70) NOT NULL,
	post_desc TEXT NOT NULL,
	post_date DATE NOT NULL,
	user_id INT DEFAULT 1
);

INSERT INTO blogposts (post_title, post_desc,post_date) VALUES ('How to do that','Do it this way','2024-08-24');
