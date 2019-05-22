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
   userinfo updating path;
	show when user was last logged in;
	let user update facts about themselves;

Links:
	
******************************************************************************/

$ROOT = "../..";
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);
$PATHS  = get_paths($ROOT);
require_once($PATHS['TEMPLATES_B']);

$CONFIG	= get_config($ROOT);
$STRINGS	= get_config_strings($CONFIG);
$body		= "";
echo '<!-- LANDED ON: '.$PATHS['USER_SETTINGS'].' -->';
	
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE'] = $STRINGS['UNDER_CONSTRUCTION_TITLE'];;
$CONFIG['DISPLAY_HEADER'] = FALSE;

$h1_arr	= Array(
	'content'=>$STRINGS['UNDER_CONSTRUCTION_HEADER'],
);
$h1			= make_tag('h1', $h1_arr, $CONFIG);
$row0			= make_gen_row($h1, $config);
$container0	= make_gen_container($row0, $config);

$body .= $container0;

$CONFIG['BODY'] = $body;
echo template_b($CONFIG, $PATHS) . "\n";

?>
