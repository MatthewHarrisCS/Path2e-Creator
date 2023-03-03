USE path2e_db;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
	email VARCHAR(64) PRIMARY KEY 
		CHECK (regexp_like(email, '^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+\$')),
	username VARCHAR(32) NOT NULL
		CHECK (regexp_like(username, '^([a-zA-Z0-9])+$')),
    password VARCHAR(32) NOT NULL
		CHECK ((password NOT LIKE '% %') AND (LENGTH(password) >= 8))
);

INSERT INTO user VALUES ("great.googly.moogly@gmail.com", "MMonogram3", "carlnum2");

SELECT * FROM user;