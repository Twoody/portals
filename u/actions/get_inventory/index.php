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
require_once($PATHS['HTML_GET_INVENTORY']);
require_once($PATHS['TEMPLATES_B']);

echo "<!-- LANDED ON: ".$PATHS['USER_GET_INVENTORY'].":INVENTORY PAGE-->";

/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE']						= "Inventory";
$CONFIG['DISPLAY_HEADER']			= FALSE;
$CONFIG['INVENTORY_CONTAINER']	= "\n<div class=\"container-fluid pr-3 pl-3 m-0\">";
$CONFIG['INVENTORY_ROW']			= "\n\t<div class=\"row pl-3 pr-3 m-0\">";

$table = get_inventory($CONFIG);

$html = "";
$html .= $CONFIG['INVENTORY_CONTAINER'];
$html .= $CONFIG['INVENTORY_ROW'];
$html .= "\n\t\t\t<div class=\"col-12 bg-info\">";
$html .= "Some text before the invenory list";
$html .= "\n\t\t\t</div><!-- END COL -->";
$html .= "\n\t\t</div><!-- END ROW -->";
$html .= "\n\t</div><!-- END CONTAINER -->";

$html .= $table;

$CONFIG['BODY'] .= $html;
echo template_b($CONFIG, $PATHS) . "\n";
?>
