USE path2e_db;
DROP TABLE IF EXISTS characterSheet;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
	email VARCHAR(64) PRIMARY KEY 
		CHECK (regexp_like(email, '^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+\$')),
	username VARCHAR(32) NOT NULL
		CHECK (regexp_like(username, '^([a-zA-Z0-9])+$')),
    password CHAR(64) NOT NULL
);

INSERT INTO user VALUES ("tony.duke.evers@delphigym.com", "Duke", "94e13c52e1cb2d585407282e4687fe62f1ceee254d6ea93307b1f4dc5a0d6b12"); -- PASSWORD: PunchOut
INSERT INTO user VALUES ("test@temporary.com", "TempUser", "1d996e033d612d9af2b44b70061ee0e868bfd14c2dd90b129e1edeb7953e7985"); -- PASSWORD: hellothere

SELECT * FROM user;