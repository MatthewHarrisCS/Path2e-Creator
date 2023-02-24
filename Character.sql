USE db;
DROP TABLE IF EXISTS background;
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

CREATE TABLE background (
	name VARCHAR(16) PRIMARY KEY,
    feat VARCHAR(64) NOT NULL, /*Add skill 1 and skill 2*/
    keyAbility1 VARCHAR(12) CHECK (keyAbility1 IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma")) NOT NULL,
    keyAbility2 VARCHAR(12) CHECK (keyAbility2 IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma", "Racket"))
);

INSERT INTO ancestry VALUES ("Dwarf", 10, "Medium", 20, "Constitution", "Wisdom", "Charisma");
INSERT INTO ancestry VALUES ("Elf", 6, "Medium", 30, "Dexterity", "Intelligence", "Constitution");
INSERT INTO ancestry VALUES ("Gnome", 8, "Small", 25, "Constitution", "Charisma", "Strength");
INSERT INTO ancestry VALUES ("Goblin", 6, "Small", 25, "Dexterity", "Charisma", "Wisdom");
INSERT INTO ancestry VALUES ("Halfling", 6, "Small", 25, "Dexterity", "Wisdom", "Strength");
INSERT INTO ancestry VALUES ("Human", 8, "Medium", 25, null, null, null);

INSERT INTO class VALUES ("Alchemist", 8, "Intelligence", null);
INSERT INTO class VALUES ("Barbarian", 12, "Strength", null);
INSERT INTO class VALUES ("Bard", 8, "Charisma", null);
INSERT INTO class VALUES ("Champion", 10, "Strength", "Dexterity");
INSERT INTO class VALUES ("Cleric", 8, "Wisdom", null);
INSERT INTO class VALUES ("Druid", 8, "Wisdom", null);
INSERT INTO class VALUES ("Fighter", 10, "Dexterity", "Strength");
INSERT INTO class VALUES ("Monk", 10, "Dexterity", "Strength");
INSERT INTO class VALUES ("Ranger", 10,  "Dexterity", "Strength");
INSERT INTO class VALUES ("Rogue", 8, "Dexterity", "Racket");
INSERT INTO class VALUES ("Sorcerer", 6, "Charisma", null);
INSERT INTO class VALUES ("Wizard", 6, "Intelligence", null);

INSERT INTO background VALUES ("Acolyte", "", "Intelligence", "Wisdom");
INSERT INTO background VALUES ("Acrobat", "", "Strength", "Dexterity");
INSERT INTO background VALUES ("Animal Whisperer", "", "Wisdom", "Charisma");
INSERT INTO background VALUES ("Artisan", "", "Strength", "Intelligence");
INSERT INTO background VALUES ("Artist", "", "Dexterity", "Charisma");
INSERT INTO background VALUES ("Barkeep", "", "Constitution", "Charisma");
INSERT INTO background VALUES ("Barrister", "", "Intelligence", "Charisma");
INSERT INTO background VALUES ("Bounty Hunter", "", "Strength", "Wisdom");
INSERT INTO background VALUES ("Charlatan", "", "Intelligence", "Charisma");
INSERT INTO background VALUES ("Criminal", "", "Dexterity", "Intelligence");
INSERT INTO background VALUES ("Detective", "", "Intelligence", "Wisdom");
INSERT INTO background VALUES ("Emissary", "", "Intelligence", "Charisma");
INSERT INTO background VALUES ("Entertainer", "", "Dexterity", "Charisma");
INSERT INTO background VALUES ("Farmhand", "", "Constitution", "Wisdom");
INSERT INTO background VALUES ("Field Medic", "", "Constitution", "Wisdom");
INSERT INTO background VALUES ("Fortune Teller", "", "Intelligence", "Charisma");
INSERT INTO background VALUES ("Gambler", "", "Dexterity", "Charisma");
INSERT INTO background VALUES ("Gladiator", "", "Strength", "Charisma");
INSERT INTO background VALUES ("Guard", "", "Strength", "Charisma");
INSERT INTO background VALUES ("Herbalist", "", "Constitution", "Wisdom");
INSERT INTO background VALUES ("Hermit", "", "Constitution", "Intelligence");
INSERT INTO background VALUES ("Hunter", "", "Dexterity", "Wisdom");
INSERT INTO background VALUES ("Laborer", "", "Strength", "Constitution");
INSERT INTO background VALUES ("Martial Disciple", "", "Strength", "Dexterity");
INSERT INTO background VALUES ("Merchant", "", "Intelligence", "Charisma");
INSERT INTO background VALUES ("Miner", "", "Strength", "Wisdom");
INSERT INTO background VALUES ("Noble", "", "Intelligence", "Charisma");
INSERT INTO background VALUES ("Nomad", "", "Constitution", "Wisdom");
INSERT INTO background VALUES ("Prisoner", "", "Strength", "Constitution");
INSERT INTO background VALUES ("Sailor", "", "Strength", "Dexterity");
INSERT INTO background VALUES ("Scholar", "", "Intelligence", "Wisdom");
INSERT INTO background VALUES ("Scout", "", "Dexterity", "Wisdom");
INSERT INTO background VALUES ("Street Urchin", "", "Dexterity", "Constitution");
INSERT INTO background VALUES ("Tinker", "", "Dexterity", "Intelligence");
INSERT INTO background VALUES ("Warrior", "", "Strength", "Constitution");

SELECT * FROM background;