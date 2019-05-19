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
		"AD_SMALL_TEXT_1"=>"\n\t\t\t\tButton 1 to Link 1",
		"AD_SMALL_TEXT_2"=>"\n\t\t\t\tButton 2 to Link 2",
		"AD_TEXT"=>"\n\t\t\t\tSome quick example text to build on the card title and make up the bulk of the card's content.",
		"AD_TITLE"=>"Card title",
		"ADMIN_SQL_USERS" =>"Users MGMT",
		"BRAND"=>"Portals",
		"CLOSE_X"=>"&times;",
		"CLOSE"=>"Close",
		"CONTACT_ADMIN"=>"Don't see what you are looking for? Contact " .$CONFIG['EMAIL_ADMIN'] . ".",
		"CURRENCY"=>"$$$",
		"DASHBOARD"=>"Dashboard",
		"DASHBOARD_GREETING"=> "Howdy, ". get_user_fname($CONFIG),
		"DASHBOARD_GO_SHOP"=> "Go Buy More Stuff",
		"DASHBOARD_VIEW_INV"=>"View Current Inventory",
		"GET_PURPOSE"=>"What would you like to do today?",
		"HELPFUL_LINKS"=>'Here are some helpful links:',
		"MODAL_HEADER"=>"Modal Header",
		"NAV_ADMIN"=>"Admin",
		"NAV_HOME"=>"Home",
		"NAV_ITEM2"=>"Features",
		"NAV_ITEM3"=>"Pricing",
		"UNDER_CONSTRUCTION"=>'Sorry, this page is under consturction;',
		"USER_ACCESS_LEVEL"=> "You are logged in as a ".$_SESSION['alevel'].".",
		"USER_INVALID_PERMISSION"=> "Warning: Access Denied;",
		"USER_NOT_LOGGED_IN"=> "Warning, not logged in;",

		"USER_PW_REQS" => "\n<small id=\"passwordHelpBlock\" class=\"form-text text-muted\">Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.</small>\n",
	);
}

/***** Just for testing *****/
//echo get_config_strings() . "\n";
?>
