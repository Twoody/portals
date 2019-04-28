<?php
function get_user_settings($CONFIG=Null){
	if ($CONFIG === Null)
		$CONFIG = get_config();
	$ROOT = $CONFIG['ROOT'];
	require_once($ROOT . '/config/paths.php');
	$PATHS = get_paths($ROOT);
	echo "\n<!-- ".$PATHS['USER_SETTINGS']." imported -->\n";
	return Array(
		/* ----- ----- GENERAL OPTIONS ----- ----- */
		//TODO: Make the comments the key to their own array;
		//			Maybe pull fromg get_user_tables?
		"PROPERTIES"=> Array(
			//general
			"loggedin",
			//user table
			"username",
			"aLevel",
			"email",
			//userinfo table
			"fname",
			"lname",
			"joindate",
			"isActive",
			"lastActive",
			"isSubscribed",
			"notificationLevel",
		),
	);
}

?>
