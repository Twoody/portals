<?php
/*
	We are using the php password_hash() built in for hashing our passwords;
	In the initial testing of our DB, we are generating users with python;
	However, we need to generate their passwords with php to ensure that they
	are properly configured;

	In the test case, we are going to just have a password describing the test
	users access level: i.e. isOwner has a pw of `owner`.
*/
function get_test_users(){
	return Array(
		Array(
			'email'			=> 'tanner@foo.com',
			'handle'			=> 'twoody',
			'salt'			=> '',
			'password'		=> '',
			'accessLevel'	=> 'admin'
		),
		Array(
			'email'			=> 'tanner@bar.com',
			'handle'			=> 'an_owner',
			'salt'			=> '',
			'password'		=> '',
			'accessLevel'	=> 'owner'
		),
		Array(
			'email'			=> 'tanner@baz.com',
			'handle'			=> 'a_member',
			'salt'			=> '',
			'password'		=> '',
			'accessLevel'	=> 'member'
		),
	);
}
function init_users($db, $CONFIG){
	$ret = TRUE;
	$users = get_test_users();
	$db->exec('BEGIN;');
	try{
		foreach($users as $user){
			$email 	= $user['email'];
			$handle 	= $user['handle'];
			$aLevel	= $user['accessLevel'];
			$sql 		= "INSERT INTO users(email, accessLevel, handle) VALUES (:email, :aLevel, :handle)";
			$prepare	= $db->prepare($sql);
			$prepare->bindValue(':email',  $email);
			$prepare->bindValue(':aLevel', $aLevel);
			$prepare->bindValue(':handle', $handle);
			$result = $prepare->execute();
		}
		$db->exec('COMMIT;');
		$db->exec('BEGIN;');
		foreach($users as $user){	
			$email	= $user['email'];
			$handle	= $user['handle'];
			$sql		= "INSERT INTO userinfo(email, handle, join_date, userid) VALUES (:email, :handle, :date, :userid)";
			echo "\nSQL:\n\t".$sql;
			echo "\n\tEMAIL:\n\t\t".$email;
			echo "\n\tHANDLE:\n\t\t".$handle;
			echo "\n\tDATE:\n\t\t".get_todays_date();
			echo "\n\tUSER ID:\n\t\t".get_user_id($email, $CONFIG);
			$prepare	= $db->prepare($sql);
			$prepare->bindValue(':email',  $email);
			$prepare->bindValue(':handle', $handle);
			$prepare->bindValue( ':date', get_todays_date() );
			$prepare->bindValue(':userid', get_user_id($email, $CONFIG));
			$result = $prepare->execute();
		}
		$db->exec('COMMIT;');
		$db->exec('UPDATE TABLE userinfo SET notifications=0;');
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo clog("\"". $exception->getMessage() ."\"");
		$ret = FALSE;
		$db->exec('ROLLBACK;');
	}
	return $ret;
}
function init_userinfo($db, $CONFIG){
	$ret = TRUE;
	$users = get_test_users();
	$db->exec('BEGIN;');
	try{
		$db->exec('BEGIN;');
		foreach($users as $user){	
			$email	= $user['email'];
			$handle	= $user['handle'];
			$sql		= "INSERT INTO userinfo(email, handle, join_date, userid) VALUES (:email, :handle, :date, :userid)";
			echo "\nSQL:\n\t".$sql;
			echo "\n\tEMAIL:\n\t\t".$email;
			echo "\n\tHANDLE:\n\t\t".$handle;
			echo "\n\tDATE:\n\t\t".get_todays_date();
			echo "\n\tUSER ID:\n\t\t".get_user_id($email, $CONFIG);
			$prepare	= $db->prepare($sql);
			$prepare->bindValue(':email',  $email);
			$prepare->bindValue(':handle', $handle);
			$prepare->bindValue( ':date', get_todays_date() );
			$prepare->bindValue(':userid', get_user_id($email, $CONFIG));
			$result = $prepare->execute();
		}
		$db->exec('COMMIT;');
	}
	catch(Exception $exception){
		if (!$FLAGS['is_quite'])
			echo "\n".clog("\"". $exception->getMessage() ."\"\n");
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
	require_once($PATHS['LIBPATH_DATES']);
	require_once($PATHS['LIBPATH_DB_HELPER']);
	$CONFIG  = get_config($ROOT);
	$dbpath	= $PATHS['DB_USERS'];
	$db		= new SQLite3($dbpath);
	$ret		= '';
	$suc		= init_users($db, $CONFIG);
	if ($suc === FALSE){
		$ret .= "\n<p>\n\tBad inserts for users;\n</p>";
		return $ret;
	}
	$suc	= init_userinfo($db, $CONFIG);
	if ($suc === FALSE){
		$ret .= "\n<p>\n\tBad inserts for userinfo;\n</p>";
		return $ret;
	}

	
	$db->exec('UPDATE TABLE userinfo SET notifications=0;');

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
