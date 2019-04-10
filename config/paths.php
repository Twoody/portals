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
	return Array(

		'BOOTSTRAP_CSS_PATH'	=> $ROOT.'/css/bootstrap.php',
		'BOOTSTRAP_JS_PATH'	=> $ROOT.'/js/bootstrap.php',
		'DATATABLES_CSS_PATH'=> $ROOT.'/css/datatables.php',
		'DATATABLES_JS_PATH'	=> $ROOT.'/js/datatables.php',
		'DATES_LIB_PATH'		=> $ROOT.'/utils/dates.php',
		'HTML_LIB_PATH'		=> $ROOT.'/utils/html.php',
		'SETTINGS_PATH'		=> $ROOT.'/config/settings.php',
	);
}
?>
