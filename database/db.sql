CREATE TABLE creators (
	id_creator SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE,
	password VARCHAR(255) NOT NULL,
	image VARCHAR(255) NOT NULL,
	follows INTEGER[] DEFAULT '{}',
	liked_videos INTEGER[] DEFAULT '{}'
);

CREATE TABLE videos (
	id_video SERIAL PRIMARY KEY,
	url VARCHAR(255) NOT NULL,
	title VARCHAR(255) NOT NULL,
	date DATE DEFAULT CURRENT_DATE,
	published BOOLEAN DEFAULT false,
	id_creator int,
	FOREIGN KEY (id_creator) REFERENCES creators(id_creator)
);