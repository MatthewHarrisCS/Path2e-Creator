USE path2e_db;
DROP TABLE IF EXISTS characterSheet;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
	email VARCHAR(64) PRIMARY KEY 
		CHECK (regexp_like(email, '^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+\$')),
	username VARCHAR(32) NOT NULL
		CHECK (regexp_like(username, '^([a-zA-Z0-9])+$')),
    password CHAR(60) NOT NULL
);

INSERT INTO user VALUES ("tony.duke.evers@delphigym.com", "Duke", "$2b$12$bf0XsHB7HnB3eM83IlCPBeJ8WVJ2YTonqw11Hajk8tB6p1hU8yNRq"); -- PASSWORD: PunchOut
INSERT INTO user VALUES ("test@temporary.com", "TempUser", "$2b$12$Jsfyb.K/t3gZVHca3L5gpuyT3mcK7qXl3VB2/5shTxRO8CDZotF9u"); -- PASSWORD: hellothere

SELECT * FROM user;