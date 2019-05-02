<?php

function test_insert($CONFIG=Null){
	/*
	*	Attempting a test insert into .../resources/dbs/users.db
	*	Tanner.L.Woody@gmail.com 2019-04-30
	*
	*/
	if($CONFIG === Null){
		$ROOT = ".";
		require_once($ROOT . '/config/paths.php');
		$PATHS	= get_paths($ROOT);
		require_once($PATHS['SETTINGS_PATH']);
		$CONFIG = get_config($ROOT);
		require_once($PATHS['LIBPATH_HTML']);
	}
	$ROOT		= $CONFIG['ROOT'];
	$PATHS	= get_paths($ROOT);
	require_once($PATHS['LIBPATH_AUTH_USER']);
	require_once($PATHS['LIBPATH_DB_HELPER']);
	echo "\n<!-- Testing INSERT -->\n";

	$dbpath	= $PATHS['DB_USERS'];
	$db		= new SQLite3($dbpath);
	$salt		= make_salt($CONFIG);
	$hash		= password_hash($pw.$salt, PASSWORD_DEFAULT);
	$sql 	= "INSERT INTO users(email, accessLevel, salt, password, handle) ";
	$sql	.= "VALUES ('abc@yahoo.com', 'member', 'salty', 'hash', 'foo');";
	echo alert('"'.$sql.'"');

	$prepare	= $db->prepare($sql);
//	$prepare->bindValue(':email',		$email);
//	$prepare->bindValue(':aLevel',	"member");
//	$prepare->bindValue(':salt',		$salt);
//	$prepare->bindValue(':hash',		$hash);
//	$prepare->bindValue(':handle',	$handle);
	$result = $prepare->execute();
	//$db->exec('COMMIT;');
	$db->close();
	$display_success_screen = TRUE;
}

$ROOT = "..";
require_once($ROOT . '/config/paths.php');
$PATHS	= get_paths($ROOT);
require_once($PATHS['SETTINGS_PATH']);
$CONFIG = get_config($ROOT);
test_insert($CONFIG);
?>
