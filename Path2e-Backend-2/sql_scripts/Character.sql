USE path2e_db;
DROP TABLE IF EXISTS characterSheet;
DROP TABLE IF EXISTS heritage;
DROP TABLE IF EXISTS racket;
DROP TABLE IF EXISTS baseWeapon;
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
    size VARCHAR(16) NOT NULL
		CHECK (size IN ("Small", "Medium")),
    speed INT NOT NULL,
    boost1 VARCHAR(12) 
		CHECK (boost1 IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma")),
    boost2 VARCHAR(12) 
		CHECK (boost2 IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma")),
    flaw VARCHAR(12) 
		CHECK (flaw IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"))
);

CREATE TABLE language (
	name VARCHAR(12) PRIMARY KEY,
    rarity VARCHAR(8) NOT NULL
		CHECK (rarity IN ("Commmon", "Uncommon", "Secret"))
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
    keyAbility1 VARCHAR(12) NOT NULL
		CHECK (keyAbility1 IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma")),
    keyAbility2 VARCHAR(12) 
		CHECK (keyAbility2 IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma", "Racket"))
);

CREATE TABLE background (
	name VARCHAR(16) PRIMARY KEY,
    feat VARCHAR(64) NOT NULL, /*Add skill 1 and skill 2*/
    keyAbility1 VARCHAR(12) NOT NULL
		CHECK (keyAbility1 IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma")),
    keyAbility2 VARCHAR(12) 
		CHECK (keyAbility2 IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma", "Racket"))
);

CREATE TABLE heritage(
	name VARCHAR(16) NOT NULL,
	ancestryName VARCHAR(16),
    PRIMARY KEY(name, ancestryName),
    FOREIGN KEY (ancestryName) REFERENCES ancestry (name)
);

CREATE TABLE racket (
	name VARCHAR(16) PRIMARY KEY,
    train1 VARCHAR(32),
    train2 VARCHAR(32),
    keyAbility VARCHAR(12) 
		CHECK (keyAbility IN ("Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"))
);

CREATE TABLE baseWeapon (
	name VARCHAR(32) PRIMARY KEY,
    type VARCHAR(6) NOT NULL
		CHECK (type IN ("Melee", "Ranged")),
	category VARCHAR(16) NOT NULL
		CHECK (category IN ("Simple", "Martial", "Advanced", "Ammunition"))
        /* INCOMPLETE */
    );

INSERT INTO ancestry VALUES ("Dwarf", 10, "Medium", 20, "Constitution", "Wisdom", "Charisma");
INSERT INTO ancestry VALUES ("Elf", 6, "Medium", 30, "Dexterity", "Intelligence", "Constitution");
INSERT INTO ancestry VALUES ("Gnome", 8, "Small", 25, "Constitution", "Charisma", "Strength");
INSERT INTO ancestry VALUES ("Goblin", 6, "Small", 25, "Dexterity", "Charisma", "Wisdom");
INSERT INTO ancestry VALUES ("Halfling", 6, "Small", 25, "Dexterity", "Wisdom", "Strength");
INSERT INTO ancestry VALUES ("Human", 8, "Medium", 25, null, null, null);

INSERT INTO racket VALUES ("Ruffian", "", "", "Strength");
INSERT INTO racket VALUES ("Scoundrel", "", "", "Charisma");
INSERT INTO racket VALUES ("Thief", "", "", null);

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

INSERT INTO heritage VALUES ("Ancient-Blooded", "Dwarf");
INSERT INTO heritage VALUES ("Death Warden", "Dwarf");
INSERT INTO heritage VALUES ("Forge", "Dwarf");
INSERT INTO heritage VALUES ("Rock", "Dwarf");
INSERT INTO heritage VALUES ("Strong-Blooded", "Dwarf");
INSERT INTO heritage VALUES ("Artic", "Elf");
INSERT INTO heritage VALUES ("Cavern", "Elf");
INSERT INTO heritage VALUES ("Seer", "Elf");
INSERT INTO heritage VALUES ("Whisper", "Elf");
INSERT INTO heritage VALUES ("Woodland", "Elf");
INSERT INTO heritage VALUES ("Chameleon", "Gnome");
INSERT INTO heritage VALUES ("Fey-Touched", "Gnome");
INSERT INTO heritage VALUES ("Sensate", "Gnome");
INSERT INTO heritage VALUES ("Umbral", "Gnome");
INSERT INTO heritage VALUES ("Wellspring", "Gnome");
INSERT INTO heritage VALUES ("Charade", "Goblin");
INSERT INTO heritage VALUES ("Irongut", "Goblin");
INSERT INTO heritage VALUES ("Razortooth", "Goblin");
INSERT INTO heritage VALUES ("Snow", "Goblin");
INSERT INTO heritage VALUES ("Unbreakable", "Goblin");
INSERT INTO heritage VALUES ("Gutsy", "Halfling");
INSERT INTO heritage VALUES ("Hillock", "Halfling");
INSERT INTO heritage VALUES ("Nomadic", "Halfling");
INSERT INTO heritage VALUES ("Twilight", "Halfling");
INSERT INTO heritage VALUES ("Wildwood", "Halfling");
INSERT INTO heritage VALUES ("Half-Elf", "Human");
INSERT INTO heritage VALUES ("Half-Orc", "Human");
INSERT INTO heritage VALUES ("Skilled", "Human");
INSERT INTO heritage VALUES ("Versatile", "Human");

CREATE TABLE charactersheet (
	name VARCHAR(32) NOT NULL,
	user VARCHAR(64) NOT NULL,
    level INT DEFAULT 1,
    heritage VARCHAR(16) NOT NULL, -- FOREIGN KEY
    background VARCHAR(16) NOT NULL, -- FOREIGN KEY
    gameClass VARCHAR(16) NOT NULL, -- FOREIGN KEY
    hp  INT NOT NULL CHECK (hp >= 12),
    str INT NOT NULL CHECK (str >= 8),
    dex INT NOT NULL CHECK (dex >= 8),
    con INT NOT NULL CHECK (con >= 8),
    itl INT NOT NULL CHECK (itl >= 8),
    wis INT NOT NULL CHECK (wis >= 8),
    cha INT NOT NULL CHECK (cha >= 8),
    backgroundChoice BOOL,
    gameClassChoice BOOL,
    PRIMARY KEY (name, user),
    FOREIGN KEY (user) REFERENCES user (email)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (heritage) REFERENCES heritage (name),
	FOREIGN KEY (background) REFERENCES background (name),
	FOREIGN KEY (gameClass) REFERENCES class (name)
);

-- INSERT INTO characterSheet VALUES ( "Duke of the Dreadmarsh", "tony.duke.evers@delphigym.com", "Goblin", "Merchant", "Alchemist", 12, 10, 10, 10, 10, 10, 10, true, true);

SELECT * FROM characterSheet;