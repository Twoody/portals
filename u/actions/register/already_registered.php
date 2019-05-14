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
    Put together expected body for when user is trying to register with
	 alreayd registered email address;

Links:
	NA
******************************************************************************/
function display_already_registered($CONFIG=Null){
	if ($CONFIG === NULL){
		$ROOT = ".";
		require_once($ROOT.'/config/imports.php');
		make_imports($ROOT);
		$CONFIG	= get_config($ROOT);
		$PATHS 	= get_paths($ROOT);
		require_once($PATHS['HTML_REGISTER_USER']);
		require_once($PATHS['TEMPLATES_B']);
	}
	$ROOT	= $CONFIG['ROOT'];
	$PATHS 	= get_paths($ROOT);
	$body =  "\n<!-- MESSAGE FROM: REGISTRATION FAILURE PAGE-->";

	/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
	$CONFIG['TITLE'] = "Register Failure";

	$body .= $CONFIG['GEN_CONTAINER'];
	$body .= $CONFIG['GEN_ROW'];
	//TODO: Test and anaylze following padding;
	$body .= "\n\t\t<div class=\"col-12 pl-4 pr-4 pb-0 pt-0\">";
	$body .= "\n\t\t\t<h1>Did You Lose Your Post-It!</h1>";
	$body .= "\n\t\t</div>";
	$body .= "\n\t</div><!-- END ROW -->";
	$body .= $CONFIG['GEN_ROW'];
	//TODO: Test and anaylze following padding;
	$body .= "\n\t\t<div class=\"col-12 pl-4 pr-0 pb-0 pt-0\">";
	$body .= "\n\t\t\t<h2>This email is already registered!</h2>";
	$body .= "\n\t\t</div><!-- END COL -->";
	$body .= "\n\t</div><!-- END ROW -->";
	//TODO: Form to submit forgotten password to email;
	//TODO: Link back to register another email address;
	//TODO: Make this button a part of .../strings.php
	$body .= "\n\t<a role=\"button\" class=\"btn btn-primary btn-block btn-lg\" ";
	$body .= "href=\"".$PATHS['NAV_HOME']."\">";
	$body .= "\n\t\tReturn home";
	$body .= "\n\t</a>";
	$body .= "\n</div><!-- END CONTAINER -->";
	$CONFIG['BODY'] .= $body;
	return $CONFIG;
}

//
//$ROOT  = '..';
//CONFIG = get_config($ROOT);
//echo template_b(display_already_registered(), $CONFIG) . "\n";
?>
