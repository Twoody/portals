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
		'BOOTSTRAP_CSS_PATH'	=> $ROOT.'/css/bootstrap.php',
		'BOOTSTRAP_JS_PATH'	=> $ROOT.'/js/bootstrap.php',
		'DATATABLES_CSS_PATH'=> $ROOT.'/css/datatables.php',
		'DATATABLES_JS_PATH'	=> $ROOT.'/js/datatables.php',
		'DB_USERS'				=> $ROOT."/resources/dbs/users.db",
		'FORMS_LOGIN'			=> $ROOT."/resources/forms/login.php",
		'LIBPATH_AUTH_USER'	=> $ROOT.'/utils/auth.php',
		'LIBPATH_DATES'		=> $ROOT.'/utils/dates.php',
		'LIBPATH_DB_HELPER'	=> $ROOT.'/utils/db_helper.php',
		'LIBPATH_HTML'			=> $ROOT.'/utils/html.php',
		'LIBPATH_JSON'			=> $ROOT.'/utils/json_helper.php',
		'ROOT'					=> $ROOT,
		'SETTINGS_PATH'		=> $ROOT.'/config/settings.php',
		'STRINGS_ERRORS'     => $ROOT."/resources/strings/errors.json",
		'TEMPLATES_LOGIN'		=> $ROOT."/templates/login.php",
	);
}
?>
