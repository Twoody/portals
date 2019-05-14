<?php
function get_config_strings($CONFIG=Null){
	if ($CONFIG === Null){
		$ROOT = ".";
		require_once($ROOT . '/config/paths.php');
		$PATHS	= get_paths($ROOT);
		require_once($PATHS['SETTINGS_PATH']);
		$CONFIG	= get_config();
	}
	$ROOT		= $CONFIG['ROOT'];
	$PATHS	= get_paths($ROOT);
	echo "\n<!-- RESOURCE FILE: ".$PATHS['STRINGS_PHP']." -->\n";

	return Array(
		"ADMIN_SQL_USERS" =>"Users MGMT",
		"DASHBOARD"=>"Dashboard",
		"DASHBOARD_GREETING"=> "Howdy, ". get_user_fname($CONFIG),
		"DASHBOARD_GO_SHOP"=> "Go Buy More Stuff",
		"DASHBOARD_VIEW_INV"=>"View Current Inventory",
		"HELPFUL_LINKS"=>'Here are some helpful links:',
		"UNDER_CONSTRUCTION"=>'Sorry, this page is under consturction;',
		"USER_ACCESS_LEVEL"=> "You are logged in as a ".$_SESSION['alevel'].".",
		"USER_INVALID_PERMISSION"=> "Warning: Access Denied;",
		"USER_NOT_LOGGED_IN"=> "Warning, not logged in;",

		"USER_PW_REQS" => "\n<small id=\"passwordHelpBlock\" class=\"form-text text-muted\">Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.</small>\n",
		"GET_PURPOSE"=>"What would you like to do today?",
	);
}

/***** Just for testing *****/
//echo get_config_strings() . "\n";
?>
