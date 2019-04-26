<?php
/*
	We are using the php password_hash() built in for hashing our passwords;
	In the initial testing of our DB, we are generating users with python;
	However, we need to generate their passwords with php to ensure that they
	are properly configured;

	In the test case, we are going to just have a password describing the test
	users access level: i.e. isOwner has a pw of `owner`.
*/
function init_users($db){
	$ret = TRUE;
	$users = Array(
		Array(
			'email'			=> 'tanner@foo.com',
			'salt'			=> '',
			'password'		=> '',
			'accessLevel'	=> 'admin'
		),
		Array(
			'email'			=> 'tanner@bar.com',
			'salt'			=> '',
			'password'		=> '',
			'accessLevel'	=> 'owner'
		),
		Array(
			'email'			=> 'tanner@baz.com',
			'salt'			=> '',
			'password'		=> '',
			'accessLevel'	=> 'member'
		),
	);
	$db->exec('BEGIN;');
	try{
		foreach($users as $user){
			$email 	= $user['email'];
			$aLevel	= $user['accessLevel'];
			$sql 		= "INSERT INTO users(email, accessLevel) VALUES (:email, :aLevel)";
			$prepare	= $db->prepare($sql);
			$prepare->bindValue(':email',  $email);
			$prepare->bindValue(':aLevel', $aLevel);
			$result = $prepare->execute();
		}
		$db->exec('COMMIT;');
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
		$ret = FALSE;
		$db->exec('ROLLBACK;');
	}
	return $ret;
}
function get_all_users($db, $where=null){
	//TODO: Move to DBHelper file;
	if ($where === null)
		$where=[];
	$sql       = 'SELECT * FROM users WHERE 1=1';
	foreach($where as $w){
		$sql .= " AND " .$w;
		echo "\n<p>\n\t".$w."\n</p>";
	}
	echo "\n<p>ERROR 44:\n\t".$sql."\n</p>";
	$result    = $db->query($sql);
	return $result;
}
function update_hash($user, $hash){
	/* Users can have emails for multiple accessLevels;
		Each email should share the same password though;
		Each email has to be unique;
	*/
	//TODO: Move to DBHelper file;
	//TODO: Get dbpath from config file...
	$dbpath = "./resources/dbs/users.db";
	$db     = new SQLite3($dbpath);
	$sql    = 'UPDATE users SET password = :password WHERE email= :email';
	$update = $db->prepare($sql);
	$update->bindValue(':password', $hash);
	$update->bindValue(':email', $user['email']);
	echo "\n<p>\n\t".$sql."\n</p>";
	$update->execute();
	if ($update)
		$ret = $db->changes();
	else
		$ret = 0;
	$db->close();
	return $ret;
}
function set_hash($user){
	/*
		Take the user object and set a hash for the provided email;
		This is the initial call and should only be made during testing...
	*/
	$salt = $user['salt'];
	$pw   = $user['accessLevel'];
	$hash = password_hash($pw.$salt, PASSWORD_DEFAULT);
	echo "\n<p>\n\tNEW HASH0: ".gettype($hash)."\n</p>";
	echo "\n<p>\n\tNEW HASH1: ".($hash)."\n</p>";
	update_hash($user, $hash);
	return TRUE;
}

function __main__($ROOT){
	require_once($ROOT . '/config/paths.php');
	$PATHS   = get_paths($ROOT);
	require_once($PATHS['SETTINGS_PATH']);
	$CONFIG  = get_config($CONFIG);
	$dbpath	= $PATHS['DB_USERS'];
	$db		= new SQLite3($dbpath);
	$ret		= '';
	$suc		= init_users($db);
	if ($suc === FALSE){
		$ret .= "\n<p>\n\tBad inserts;\n</p>";
		return $ret;
	}

	$where_clause = ['(password is Null or password = "")'];
	$users        = get_all_users($db, $where_clause);
	$updateThese  = [];
	$ret .= "\n<hr>";
	while ($user = $users->fetchArray()){
		array_push($updateThese, $user);
	}
	$db->close();
	foreach ($updateThese as $user){
		$ret .= "\n<p>\n\tSETTING UP HASH FOR <br/>\n\t".$user["email"]."\n</p>";
		set_hash($user);
		$ret .= "\n<hr>";
	}
	return $ret;
}

$ROOT = "../..";
$ROOT = ".";
echo __main__($ROOT);
?>
