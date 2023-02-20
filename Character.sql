USE db;
DROP TABLE IF EXISTS characterStats;
DROP TABLE IF EXISTS characterMain;
DROP TABLE IF EXISTS class;
DROP TABLE IF EXISTS ancestralLanguage;
DROP TABLE IF EXISTS language;
DROP TABLE IF EXISTS ancestry;

CREATE TABLE ancestry (
	name VARCHAR(16) PRIMARY KEY,
    hp INT NOT NULL,
    size VARCHAR(16) CHECK (size IN ("Small", "Medium")) NOT NULL,
    speed INT NOT NULL,
    boost1 VARCHAR(12) CHECK (boost1 IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma")),
    boost2 VARCHAR(12) CHECK (boost2 IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma")),
    flaw VARCHAR(12) CHECK (flaw IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"))
);

CREATE TABLE language (
	name VARCHAR(12) PRIMARY KEY,
    rarity VARCHAR(8) CHECK (rarity IN ("Commmon", "Uncommon", "Secret")) NOT NULL
);

CREATE TABLE ancestralLanguage (
	ancestryName VARCHAR(16),
    languageName VARCHAR(12),
    PRIMARY KEY(ancestryName, languageName),
    FOREIGN KEY (ancestryName) REFERENCES ancestry (name),
    FOREIGN KEY (languageName) REFERENCES language (name)
);

CREATE TABLE class (
	name VARCHAR(16) PRIMARY KEY,
    hp INT NOT NULL,
    keyAbility1 VARCHAR(12) CHECK (keyAbility1 IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma")) NOT NULL,
    keyAbility2 VARCHAR(12) CHECK (keyAbility2 IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma", "Racket"))
);

INSERT INTO ancestry VALUES ("Dwarf", 10, "Medium", 20, "Constitution", "Wisdom", "Charisma");
INSERT INTO ancestry VALUES ("Elf", 6, "Medium", 30, "Dexterity", "Intelligence", "Constitution");
INSERT INTO ancestry VALUES ("Gnome", 8, "Small", 25, "Constitution", "Charisma", "Strength");
INSERT INTO ancestry VALUES ("Goblin", 6, "Small", 25, "Dexterity", "Charisma", "Wisdom");
INSERT INTO ancestry VALUES ("Halfling", 6, "Small", 25, "Dexterity", "Wisdom", "Strength");
INSERT INTO ancestry VALUES ("Human", 8, "Medium", 25, null, null, null);

INSERT INTO class VALUES ("Alchemist", "Intelligence", null);
INSERT INTO class VALUES ("Barbarian", "Strength", null);
INSERT INTO class VALUES ("Bard", "Charisma", null);
INSERT INTO class VALUES ("Champion", "Strength", "Dexterity");
INSERT INTO class VALUES ("Cleric", "Wisdom", null);
INSERT INTO class VALUES ("Druid", "Wisdom", null);
INSERT INTO class VALUES ("Fighter", "Dexterity", "Strength");
INSERT INTO class VALUES ("Monk", "Dexterity", "Strength");
INSERT INTO class VALUES ("Ranger", "Dexterity", "Strength");
INSERT INTO class VALUES ("Rogue", "Dexterity", "Racket");
INSERT INTO class VALUES ("Sorcerer", "Charisma", null);
INSERT INTO class VALUES ("Wizard", "Intelligence", null);

SELECT * FROM ancestry;