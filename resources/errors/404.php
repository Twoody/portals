<?php
session_start();
?>
<!doctype html>
<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    2019-04-22

USAGE:
	First Check for compilation errors:
		php index.php
	Second, host:
		With PHP:
			clear & php -S localhost:8000 templates/login.php
		With APACHE:
			sudo apachectl start

Purpose:
    Fun way to show that page was not found;

Links:
	https://www.w3schools.com/bootstrap4/bootstrap_carousel.asp
******************************************************************************/

$ROOT = "../..";
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);
$CONFIG	= get_config($ROOT);
$PATHS	= get_paths($ROOT);
$STRINGS	= get_config_strings($CONFIG);
require_once($PATHS['TEMPLATES_B']);

	
$body		= "";
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE'] = "PG-14 Not Found";
$CONFIG['DISPLAY_HEADER'] = FALSE;

//TODO: Make HEADER
$body .= make_tag('h1', Array('content'=>$STRINGS['404']), $CONFIG);

$CONFIG['BODY'] = $body;
//echo '<!-- '.$PATHS['NAV_HOME'].' -->';
echo template_b($CONFIG, $PATHS) . "\n";

?>
