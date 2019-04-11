<?
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
require_once('./config/paths.php');
$PATHS = get_paths();
require_once($PATHS['SETTINGS_PATH']);

echo "\n<!-- /utils/auth.php imported -->\n";

function get_salt($email, $CONFIG=Null){
	/* Get preexisting salt from users db */
	/* Different from make_salt() */
	if($CONFIG === Null)
		$CONFIG = get_config();
	$dbpath	= $CONFIG['DBPATH_USERS'];
	$db = new SQLite3($dbpath);
	$salt_sql = $db->prepare("SELECT salt FROM users WHERE email = :email");
	$salt_sql->bindValue(':email', $email);
	$salt_res = $salt_sql->execute();
	$salt_row = $salt_res->fetchArray();
	$salt     = $salt_row["salt"];

	$db->close();
	return $salt;
}
function get_hash($email, $CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG = get_config();
	$dbpath		= $CONFIG['DBPATH_USERS'];
	$db			= new SQLite3($dbpath);
	$hash_sql	= $db->prepare("SELECT password FROM users WHERE email = :email");
	$hash_sql->bindValue(':email', $email);
	$hash_res = $hash_sql->execute();
	$hash_row = $hash_res->fetchArray();
	$hash     = $hash_row["password"];

	$db->close();
	return $hash;
}
function is_valid_email($email, $CONFIG=Null){
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
function is_valid_access($email, $access, $CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG = get_config();
	$dbpath		= $CONFIG['DBPATH_USERS'];
	$db			= new SQLite3($dbpath);
	$sql			= 'SELECT * FROM users WHERE  email = :email and accessLevel = :access';
	$statement	= $db->prepare('SELECT * FROM users WHERE  email = :email and accessLevel = :access');
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

?>
