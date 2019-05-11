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

$CONFIG['TABLE_ID'] = "inventory";
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE']						= "My Shopping Cart";
$CONFIG['DISPLAY_HEADER']			= FALSE;
$CONFIG['INVENTORY_CONTAINER']	= "\n<div class=\"container-fluid pr-3 pl-3 m-0\">";
$CONFIG['INVENTORY_ROW']			= "\n\t<div class=\"row pl-3 pr-3 m-0\">";

$CONFIG['CUSTOM_STYLES'] .= "\n<style>";
$CONFIG['CUSTOM_STYLES'] .= "\n\t.sticky{position: sticky; top: 0;}"; 
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting:after,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting:before,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_asc:after,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_asc:before,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_asc_disabled:after,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_asc_disabled:before,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_desc:after,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_desc:before,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_desc_disabled:after,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_desc_disabled:before { bottom: .5em; }";
$CONFIG['CUSTOM_STYLES'] .= "\n</style>";

$CONFIG['CUSTOM_SCRIPTS'] .= "\n<script src=\"".$PATHS['JS_INVENTORY']."\"></script>";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n<script>";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t$(document).ready(function(){";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t$('#".$CONFIG['TABLE_ID']."').DataTable({";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\t\"order\": [[ 1, \"name\" ]]";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t});";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t$('.dataTables_length').addClass('bs-select');";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t});";

$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t$(function(){";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t$(\".inventory-modal\").click(function(e){";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\te.preventDefault();";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\tvar mymodal = $(\"#inv_modal\");";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\t$(\".modal-body #product\").val(this.id);";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\tmymodal.modal(\"show\");";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\t";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t});";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t})";

//TODO: Move into config option to turn on/off;
//JS Option to prevent form resubmissions on refresh and back;
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\tif ( window.history.replaceState ){window.history.replaceState( null, null, window.location.href );}";

$CONFIG['CUSTOM_SCRIPTS'] .= "\n</script>";

$userid		= $_SESSION['userid'];
$cart			= get_cart($userid, $CONFIG);
$table		= get_checkout_table($cart, $CONFIG);
$cart_total	= get_cart_total($userid, $CONFIG);


$html = "";
$html .= $CONFIG['INVENTORY_CONTAINER'];
$html .= $CONFIG['INVENTORY_ROW'];
$html .= "\n\t\t\t<div class=\"col-12 bg-info\">";
$html .= "Some text before the checkout list";
$html .= "\n\t\t\t</div><!-- END COL -->";
$html .= "\n\t\t</div><!-- END ROW -->";
$html .= "\n\t</div><!-- END CONTAINER -->";
$html .= "<hr>";

$html .= $CONFIG['INVENTORY_CONTAINER'];
$html .= $table;
$html .= "\n\t</div><!-- END CONTAINER -->";
$html .= "\n\t\t<div class=\"container\">";
$html .= "\n\t\t<div class=\"row\">";
$html .= "\n\t\t\t<button type=\"submit\" class=\"btn btn-primary w-100 fixed-bottom mb-5 p-3\" name=\"form_submit\">";
$html	.= "\n\t\t\t\t$".$cart_total." due. Checkout?";
$html .= "\n\t\t\t</button>";
$html .= "\n\t\t</div><!-- END ROW -->";


//$html .= "\n\t\t\t<div class=\"col-5 text-right bg-info mb-5\">";
//$html .= "<h1>Total Amount Due: $$$$</h1>";
//$html .= "\n\t\t\t</div><!-- END COL -->";
//$html .= "\n\t\t</div><!-- END ROW -->";
$html .= "\n\t</div><!-- END CONTAINER -->";

$CONFIG['BODY'] .= $html;
echo template_b($CONFIG, $PATHS) . "\n";
?>
