CREATE TABLE IF NOT EXISTS blogs(
	id 				INTEGER PRIMARY KEY,
	author 			TEXT,
	date_posted 	TEXT,
	last_edited 	TEXT,
	title 			TEXT,
	filepath 		TEXT,
	views 			INTEGER,
	favorites		INTEGER,
	comments			INTEGER,
	claps 			INTEGER,
	rocks 			INTEGER,
	edits				INTEGER,
	flags				INTEGER,
	is_public		BOOLEAN,
	is_deleted		BOOLEAN,
	is_sponsored	BOOLEAN
);
CREATE TABLE IF NOT EXISTS comments(
	id 			INTEGER PRIMARY KEY,
	blog_id		INTEGER,
	author		TEXT,
	date_posted	TEXT,
	last_edited TEXT,
	claps			INTEGER,
	rocks 		INTEGER,
	edits			INTEGER,
	flags			INTEGER,
	is_deleted BOOLEAN
);
INSERT INTO blogs(
	author 		,
	date_posted ,
	last_edited ,
	title 		,
	filepath 	,	
	views 		,
	favorites	,
	comments		,
	claps 		,
	rocks 		,
	edits			,
	flags			,
	is_public	,
	is_deleted	
)
VALUES(
	'Tanner Lee Woody',
	'2019-05-29-00-00-00-000',
	'2019-05-29-00-00-00-000',
	'Local and Solo Github Workflow',
	'/resources/strings/blogs/DNE.html',
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	TRUE,
	FALSE
);
