<?php
session_start();
?>
<!doctype html>
<?
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    2019-04-24

USAGE:
	First Check for compilation errors:
		php index.php
	Second, host:
		With PHP:
			clear & php -S localhost:8000 templates/login.php
		With APACHE:
			sudo apachectl start

Purpose:
    Allow user to login;

Links:
	NA
******************************************************************************/

$ROOT = "../../..";
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);
$PATHS  = get_paths($ROOT);
$CONFIG = get_config($ROOT);
require_once($PATHS['HTML_LOGIN_OR_SIGNOUT']);
require_once($PATHS['TEMPLATES_B']);

echo "<!-- LANDED ON: LOGIN PAGE-->";

$body	= "";
	
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE']				= "Login";
$CONFIG['DISPLAY_HEADER']	= FALSE;

//TODO: What is really going on below 0.o
$CONFIG = html_login_or_signout($CONFIG, $PATHS); //Will get ./resources/forms/foo IFF user logged in;
echo template_b($CONFIG, $PATHS) . "\n";
?>
