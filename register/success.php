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



function display_registration_success($CONFIG=Null){
	if ($CONFIG === NULL){
		$ROOT = ".";
		require_once($ROOT.'/config/imports.php');
		make_imports($ROOT);
		$CONFIG = get_config($ROOT);
	}
	$ROOT		= $CONFIG['ROOT'];
	$PATHS	= get_paths($ROOT);
	$body		= "";
	require_once($PATHS['HTML_REGISTER_USER']);
	require_once($PATHS['TEMPLATES_B']);
	$body.= "\n<!-- LANDED ON: REGISTRATION SUCCESS PAGE-->";

	/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
	$CONFIG['TITLE'] = "Register Success";
	$CONFIG['DISPLAY_HEADER'] = FALSE;
	
	$body .= $CONFIG['REGISTER_RESPONSE_CONTAINER'];
	$body .= $CONFIG['REGISTER_RESPONSE_ROW'];
	$body .= "\n\t\t<div class=\"col-12 pl-4 pr-4 pb-0 pt-0\">";
	$body .= "\n\t\t\t<h1>Start Writing on that Post-It!</h1>";
	$body .= "\n\t\t</div>";
	$body .= "\n\t</div><!-- END ROW -->";
	$body .= $CONFIG['REGISTER_RESPONSE_ROW'];
	$body .= "\n\t\t<div class=\"col-12 pl-4 pr-4 pb-0 pt-0\">";
	$body .= "\n\t\t<h2>You are now registered!</h2>";
	$body .= "\n\t\t</div>";
	$body .= "\n\t</div><!-- END ROW -->";
	//TODO: Make this button a part of .../strings.php
	$body .= "\n\t<a role=\"button\" class=\"btn btn-primary btn-block btn-lg\" ";
	$body .= "href=\"".$PATHS['NAV_HOME']."\">";
	$body .= "\n\t\tReturn home";
	$body .= "\n\t</a>";
	$body .= "\n</div><!-- END CONTAINER -->";
	return $body;
}

//
//$ROOT  = '..';
//CONFIG = get_config($ROOT);
//echo template_b(display_registration_success(), $CONFIG) . "\n";

?>
