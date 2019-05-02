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
		"USER_PW_REQS" => "<small id=\"passwordHelpBlock\" class=\"form-text text-muted\">Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.</small>",
	);
}

/***** Just for testing *****/
//echo get_config_strings() . "\n";
?>
