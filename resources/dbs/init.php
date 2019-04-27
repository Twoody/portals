<?
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink:
   Date:    2019-04-10

USAGE:
	Import via:
		require_once($PATHS['LIBPATH_DB_HELPER']);
Purpose:
    Simplify some of the db processing;

TODO:
	1. ...

******************************************************************************/
$ROOT		= ".";
require_once($ROOT . '/config/paths.php');
$PATHS	= get_paths($ROOT);
require_once($PATHS['SETTINGS_PATH']);
$CONFIG	= get_config($ROOT);
require_once($PATHS['LIBPATH_DB_HELPER']);
require_once($PATHS['LIBPATH_HTML']);

echo "\n\n<!-- RUNNING DATABASE INITIALIZER -->\n";
$created_tables	= make_users_tables($CONFIG);
$ret	= "\n<h1>";
$ret	.= "\n\tMADE `".$created_tables."` TABLES";
$ret	.= "\n</h1>\n";
echo  $ret;
echo "\n<!-- FINISHED DATABASE INITIALIZER -->\n";
?>
