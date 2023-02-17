USE db;
DROP TABLE IF EXISTS characterStats;
DROP TABLE IF EXISTS characterMain;
DROP TABLE IF EXISTS ancestry;

CREATE TABLE ancestry (
	name VARCHAR(16) PRIMARY KEY,
    hp INT,
    size VARCHAR(16) CHECK (size IN ("Small", "Medium")),
    speed INT,
    boost1 VARCHAR(12) CHECK (boost1 IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma")),
    boost2 VARCHAR(12) CHECK (boost2 IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma")),
    flaw VARCHAR(12) CHECK (flaw IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"))
);

CREATE TABLE class (
	name VARCHAR(16) PRIMARY KEY
);

CREATE TABLE characterSheet;