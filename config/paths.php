<?
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: github.com/twoody/phpTests/utils/html.php
   Date:    2019-04-09

USAGE:
   One file and one location for all relative paths we will use throughout
	our php experience,

Purpose:
	Stay organized and avoid having to backtrack multiple href and paths
	upon any kind of restructure or update,

******************************************************************************/

function get_paths(){
	$ROOT = "/Users/tannerleewoody/Workspace/testdir/php/bootstrap";
	$ROOT = ".";
	return Array(
		'BOOTSTRAP_CSS_PATH'			=> $ROOT.'/css/bootstrap.php',
		'BOOTSTRAP_JS_PATH'			=> $ROOT.'/js/bootstrap.php',
		'DATATABLES_CSS_PATH'		=> $ROOT.'/css/datatables.php',
		'DATATABLES_JS_PATH'			=> $ROOT.'/js/datatables.php',
		'DB_USERS'						=> $ROOT."/resources/dbs/users.db",
		'FONT_AWESOME_CSS_PATH'		=> $ROOT.'/css/font_awesome.php',
		'FORMS_LOGIN'					=> $ROOT."/resources/forms/login.php",
		'FORMS_USER_REGISTRATION'	=> $ROOT."/resources/forms/user_registration.php",
		'HTML_DISPLAY_FEATURES'		=> $ROOT."/src/display_features.php",
		'HTML_DISPLAY_PRICING'		=> $ROOT."/src/display_pricing.php",
		'HTML_LOGIN_OR_SIGNOUT'		=> $ROOT."/src/html_login_or_signout.php",
		'HTML_REGISTER_USER'			=> $ROOT."/src/register_new_user.php",
		'HTML_USER_SETTINGS'			=> $ROOT."/src/user_settings.php",
		'LIBPATH_AUTH_USER'			=> $ROOT.'/utils/auth.php',
		'LIBPATH_DATES'				=> $ROOT.'/utils/dates.php',
		'LIBPATH_DB_HELPER'			=> $ROOT.'/utils/db_helper.php',
		'LIBPATH_FA'					=> $ROOT.'/utils/font_awesome.php',
		'LIBPATH_HTML'					=> $ROOT.'/utils/html.php',
		'LIBPATH_JSON'					=> $ROOT.'/utils/json_helper.php',
		'ROOT'							=> $ROOT,
		'SETTINGS_PATH'				=> $ROOT.'/config/settings.php',
		'STRINGS_ERRORS'     		=> $ROOT."/resources/strings/errors.json",
		'TEMPLATES_B'					=> $ROOT."/templates/b.php",
		'TEMPLATES_LOGIN'				=> $ROOT."/templates/login.php",
		'TEMPLATES_FOOTER'			=> $ROOT."/templates/footer.php",
		'TEMPLATES_SOCIAL_MEDIA'	=> $ROOT."/templates/socail_media.php",
	);
}
?>
