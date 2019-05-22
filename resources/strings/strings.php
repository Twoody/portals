<?php
echo "\n<!-- RESOURCE FILE: ".$PATHS['STRINGS_PHP']." -->\n";
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
		"DASHBOARD_ADMIN"=>"Admin Dashboard",
		"DASHBOARD_GREETING"=> "Howdy, ". get_user_fname($CONFIG),
		"DASHBOARD_GO_SHOP"=> "Go Buy More Stuff",
		"DASHBOARD_VIEW_INV"=>"View Current Inventory",
		"DELETE_ENTRY"=>"Delete Entry",
		"GET_PURPOSE"=>"What would you like to do today?",
		"GEN_OR"=>" or ",
		"HELPFUL_LINKS"=>'Here are some helpful links:',
		"LOGOUT"=>'Logout',
		"LOGOUT_SUCCESS"=>'Successfully logged out',
		"LOGOUT_WARNING"=>"Warning, not logged in",
		"MODAL_HEADER"=>"Modal Header",
		"NAV_ADMIN"=>"Admin",
		"NAV_HOME"=>"Home",
		"NAV_ITEM2"=>"Features",
		"NAV_ITEM3"=>"Pricing",
		"NAV_REGISTER"=>"Register Now",
		"NAV_SIGN_IN"=>"Sign In",
		"NAV_WELCOME"=>"Welcome, " . get_user_fname($CONFIG),
		"RET_HOME"=>"Return Home",
		"REGISTER"=>"Register",
		"SHOPPING_TITLE"=>"Shop's Inventory",
		"UNDER_CONSTRUCTION"=>'Sorry, this page is under consturction;',
		"UNDER_CONSTRUCTION_TITLE"=>'IN CONSTRUCTION',
		"UNDER_CONSTRUCTION_HEADER"=>'PAGE IN CONSTRUCTION',
		"USER_ACCESS_LEVEL"=> "You are logged in as a ".$_SESSION['alevel'].".",
		"USER_INVALID_PERMISSION"=> "Warning: Access Denied;",
		"USER_NOT_LOGGED_IN"=> "Warning, not logged in;",
//TODO: Get rid of html...
		"USER_PW_REQS" => "\n<small id=\"passwordHelpBlock\" class=\"form-text text-muted\">Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.</small>\n",
		"VIEW_INV_TEXT"=>"Some text before the checkout list.",
	);
}

/***** Just for testing *****/
//echo get_config_strings() . "\n";
?>
