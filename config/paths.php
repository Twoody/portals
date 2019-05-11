<?
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    2019-04-09

USAGE:
   One file and one location for all relative paths we will use throughout
	our php experience,

Purpose:
	Stay organized and avoid having to backtrack multiple href and paths
	upon any kind of restructure or update,

******************************************************************************/
function get_paths($ROOT=Null){
	if ($ROOT === Null){
		$ROOT = "/Users/tannerleewoody/Workspace/testdir/php/bootstrap";
		$ROOT = ".";
	}
	return Array(
		'ADMIN_DASH'					=> $ROOT."/a/index.php",
		'ADMIN_VIEWPORT'				=> $ROOT."/a/actions/viewport_users.php",
		'BOOTSTRAP_CSS_PATH'			=> $ROOT.'/resources/css/bootstrap.php',
		'BOOTSTRAP_JS_PATH'			=> $ROOT.'/resources/js/bootstrap.php',
		'DATATABLES_CSS_PATH'		=> $ROOT.'/resources/css/datatables.php',
		'DATATABLES_JS_PATH'			=> $ROOT.'/resources/js/datatables.php',
		'DB_USERS'						=> $ROOT."/resources/dbs/users.db",
		'DB_INVENTORY'					=> $ROOT."/resources/dbs/inventory.db",
		'FONT_AWESOME_CSS_PATH'		=> $ROOT.'/resources/css/font_awesome.php',
		'FORMS_ADMIN_VIEWPORT'		=> $ROOT."/resources/forms/admin_viewport.php",
		'FORMS_INVENTORY'				=> $ROOT."/resources/forms/user_inventory.php",
		'FORMS_LOGIN'					=> $ROOT."/resources/forms/login.php",
		'FORMS_USER_REGISTRATION'	=> $ROOT."/resources/forms/register.php",
		'HTML_DISPLAY_FEATURES'		=> $ROOT."/src/display_features.php",
		'HTML_DISPLAY_PRICING'		=> $ROOT."/src/display_pricing.php",
		'HTML_GET_INVENTORY'			=> $ROOT.'/src/get_inventory.php',
		'HTML_LOGIN_OR_SIGNOUT'		=> $ROOT."/src/html_login_or_signout.php",
		'HTML_REGISTER_USER'			=> $ROOT."/src/register_new_user.php",
		'HTML_USER_SETTINGS'			=> $ROOT."/src/user_settings.php",
		'JS_INVENTORY'					=> $ROOT."/resources/js/inventory-form.js",
		'LIBPATH_AUTH_USER'			=> $ROOT.'/src/utils/auth.php',
		'LIBPATH_DATES'				=> $ROOT.'/src/utils/dates.php',
		'LIBPATH_DB_HELPER'			=> $ROOT.'/src/utils/db_helper.php',
		'LIBPATH_FA'					=> $ROOT.'/src/utils/font_awesome.php',
		'LIBPATH_HTML'					=> $ROOT.'/src/utils/html.php',
		'LIBPATH_JSON'					=> $ROOT.'/src/utils/json_helper.php',
		'NAV_ADMIN_PANEL'				=> $ROOT.'/a/index.php',
		'NAV_CART'						=> $ROOT.'/u/actions/index.php',
		'NAV_HOME'						=> $ROOT.'/index.php',
		'NAV_DISPLAY_FEATURES'		=> $ROOT.'/src/display_features.php',
		'NAV_DISPLAY_PRICING'		=> $ROOT.'/src/display_pricing.php',
		'NAV_USER_SETTINGS'			=> $ROOT.'/src/user_settings.php',
		'ROOT'							=> $ROOT,
		'SETTINGS_PATH'				=> $ROOT.'/config/settings.php',
		'STRINGS_ERRORS'     		=> $ROOT."/resources/strings/errors.json",
		'STRINGS_PHP'     			=> $ROOT."/resources/strings/strings.php",
		'TEMPLATES_B'					=> $ROOT."/templates/b.php",
		'TEMPLATES_LOGIN'				=> $ROOT."/templates/login.php",
		'TEMPLATES_FOOTER'			=> $ROOT."/templates/footer.php",
		'TEMPLATES_SOCIAL_MEDIA'	=> $ROOT."/templates/social_media.php",
		'USER_DASH'						=> $ROOT.'/u/actions/index.php',
		'USER_GET_INVENTORY'			=> $ROOT.'/u/actions/get_inventory/index.php',
		'USER_VIEW_INVENTORY'		=> $ROOT.'/u/actions/view_inventory/index.php',
		'USER_LOGIN'					=> $ROOT.'/u/actions/login/index.php',
		'USER_LOGOUT'					=> $ROOT.'/u/actions/logout/index.php',
		'USER_REGISTER'				=> $ROOT.'/u/actions/register/index.php',
		'USER_REGISTER_DOES_EXIST'	=> $ROOT.'/u/actions/register/already_registered.php',
		'USER_REGISTER_SUCCESS'		=> $ROOT.'/u/actions/register/success.php',
	);
}
?>
