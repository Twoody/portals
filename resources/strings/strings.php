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
	$CONFIG['RESPONSE_CONTAINER'] = "\n<div class=\"container-fluid pr-3 pl-3 m-0\">";
	$CONFIG['RESPONSE_ROW']			= "\n\t<div class=\"row pl-3 pr-3 m-0\">";
	echo "\n<!-- RESOURCE FILE: ".$PATHS['STRINGS_PHP']." -->\n";

	return Array(
		"ADMIN_SQL_USERS" =>"Users MGMT",
		"HELPFUL_LINKS"=>'Here are some helpful links:',
		"DASHBOARD_GREETING"=> "Howdy, ". get_user_fname($CONFIG),
		"DASHBOARD"=>"Dashboard",
		"USER_INVALID_PERMISSION"=> $CONFIG['RESPONSE_CONTAINER'] .  $CONFIG['RESPONSE_ROW'] .  "\n\t\t\t\t<div class=\"col-12 bg-warning\">\n\t\t\t\t\tWarning: Access Denied;\n\t\t\t\t</div>\n\t\t\t</div><!-- End row -->\n\t\t</div><!-- End container -->",

		"USER_NOT_LOGGED_IN"=> $CONFIG['RESPONSE_CONTAINER'] .  $CONFIG['RESPONSE_ROW'] .  "\n\t\t\t\t<div class=\"col-12 bg-warning\">\n\t\t\t\t\tWarning, not logged in;\n\t\t\t\t</div>\n\t\t\t</div><!-- End row -->\n\t\t</div><!-- End container -->",

		"USER_PW_REQS" => "\n<small id=\"passwordHelpBlock\" class=\"form-text text-muted\">Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.</small>\n",
		"GET_PURPOSE"=>"What would you like to do today?",

	);
}

/***** Just for testing *****/
//echo get_config_strings() . "\n";
?>
