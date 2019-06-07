<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink:
   Date:    2019-04-10

USAGE:
   In php, put at the head of function:
      require('/path/here/html.php');
	If registering: Take user $pw, add $salt, hash;
		Store $salt and $hash;
	If user,
		check db, verify $pw by adding salt and using a password verification;
		Check db if user exists;
		Check db if access level is correct;

Purpose:
    Authenticate that user exists and is logging in correctly;

TODO:
	1. Sesions...

******************************************************************************/


if (php_sapi_name() === "cli"){
	function __init_auth_user__($CONFIG=Null){
		if($CONFIG === Null){
			$ROOT = '.';
			require_once($ROOT . '/config/paths.php');
			$PATHS = get_paths($ROOT);
			require_once($PATHS['SETTINGS_PATH']);
			$CONFIG = get_config();
		}
		$ROOT = $CONFIG['ROOT'];
	}
	__init_auth_user__();
}
echo "\n<!-- " . $PATHS['LIBPATH_AUTH_USER'] . " imported -->\n";

function get_salt($email, $aLevel, $CONFIG=Null){
	/* Get preexisting salt from users db */
	/* Different from make_salt() */
	if($CONFIG === Null)
		$CONFIG = get_config();
	$dbpath	= $CONFIG['DBPATH_USERS'];
	$db = new SQLite3($dbpath);
	$salt_sql = $db->prepare("SELECT salt FROM users WHERE email = :email and accessLevel = :accessLevel");
	$salt_sql->bindValue(':email', $email);
	$salt_sql->bindValue(':accessLevel', $aLevel);
	$salt_res = $salt_sql->execute();
	$salt_row = $salt_res->fetchArray();
	$salt     = $salt_row["salt"];

	$db->close();
	return $salt;
}
function get_hash($email, $aLevel, $CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG = get_config();
	$dbpath		= $CONFIG['DBPATH_USERS'];
	$db			= new SQLite3($dbpath);
	$hash_sql	= $db->prepare("SELECT password FROM users WHERE email = :email and accessLevel = :accessLevel");
	$hash_sql->bindValue(':email', $email);
	$hash_sql->bindValue(':accessLevel', $aLevel);
	$hash_res = $hash_sql->execute();
	$hash_row = $hash_res->fetchArray();
	$hash     = $hash_row["password"];

	$db->close();
	return $hash;
}
function is_admin($CONFIG=Null){
	if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === TRUE){
		if(isset($_SESSION['alevel']) && $_SESSION['alevel'] === 'admin'){
			return TRUE;
		}
		return FALSE;
	}
	else{
		return FALSE;
	}
}
function is_logged_in($CONFIG=Null){
	if ($CONFIG === Null)
		$CONFIG = get_config();
	if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === TRUE){
		return TRUE;
	}
	else{
		return FALSE;
	}
}
function is_users_comment($commentObj, $CONFIG){
	//TODO: Add authorid to comment table;
	$userid	= $_SESSION['userid'];
	if($commentObj['authorid'] === $userid)
		return True;
	return False;
}
function is_valid_access($email, $access, $CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG = get_config();
	$dbpath		= $CONFIG['DBPATH_USERS'];
	$db			= new SQLite3($dbpath);
	$sql			= 'SELECT * FROM users WHERE  email = :email and accessLevel = :access';
	$statement	= $db->prepare($sql);
	$statement->bindValue(':email', 			$email);
	$statement->bindValue(':access', 		$access);
	$result = $statement->execute();
	$foo = $result->fetchArray();

	$db->close();
	if ($foo === false)
		$ret = false;
	else
		$ret = true;
	return $ret;
}
function is_valid_email($email, $CONFIG=Null){
	/*
	*SEE:
	*	https://www.w3schools.com/php/filter_validate_email.asp
	*/
	//Remove all illegal characters from email
	$email = filter_var($email, FILTER_SANITIZE_EMAIL);
	
	//Validate e-mail
	if (filter_var($email, FILTER_VALIDATE_EMAIL)) 
		return TRUE;
	else
		return FALSE;
}
function is_valid_handle($handle, $CONFIG=Null){
	//TODO: Change this into a parse check on handle;
	//			Dis-allow certain items like swear words;
	if (!$handle)
		return FALSE;
	return TRUE;
}
function is_valid_password($pw, $CONFIG){
	if (!$pw)
		return FALSE;
	return TRUE;
}
function make_salt($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG = get_config();
	$charset       = $CONFIG['SALT_CHARSET'];
	$randStringLen = $CONFIG['SALT_LENGTH'];
	$randString    = "";
	for ($i = 0; $i < $randStringLen; $i++) {
		$randString .= $charset[mt_rand(0, strlen($charset) - 1)];
	}
	return $randString;
}
function users_has_email($email, $CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG = get_config();
	$dbpath		= $CONFIG['DBPATH_USERS'];
	$db 			= new SQLite3($dbpath);
	$statement	= $db->prepare('SELECT * FROM users WHERE  email = :email');
	$statement->bindValue(':email',$email);
	$result = $statement->execute();
	$foo = $result->fetchArray();
	if ($foo === FALSE)
		$ret = FALSE;
	else
		$ret = TRUE;
	$db->close();
	return $ret;
}
function users_has_handle($handle, $CONFIG=Null){
	if (!$handle || $handle === "")
		return FALSE;
	if($CONFIG === Null)
		$CONFIG = get_config();
	$dbpath		= $CONFIG['DBPATH_USERS'];
	$db			= new SQLite3($dbpath);
	$sql			= 'SELECT * FROM users WHERE  handle = :handle';
	$statement	= $db->prepare($sql);
	$statement->bindValue(':handle', $handle);
	$result = $statement->execute();
	$foo = $result->fetchArray();

	$db->close();
	if ($foo === false)
		$ret = false;
	else
		$ret = true;
	return $ret;
}
?>
