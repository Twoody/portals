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
$CONFIG['TITLE']				= "Shop's Inventory";
$CONFIG['DISPLAY_HEADER']	= FALSE;
$CONFIG['TABLE_ID']			= "inventory";
$dt_orderby						= "name";
$table							= html_get_inventory($CONFIG);
$html								= "";
$js_inv_arr						= get_js_arr();
$js_inv_arr['src']			= $PATHS['JS_INVENTORY'];
$CONFIG['CUSTOM_SCRIPTS'] .= make_tag('script', $js_inv_arr, $CONFIG);

//JS Option to prevent form resubmissions on refresh and back;
$CONFIG['CUSTOM_SCRIPTS'] .= get_form_nullifier($CONFIG);

//jQuery to update `DOES NOT EXIST` product id;
$CONFIG['CUSTOM_SCRIPTS'] .= "\n<script>";

$CONFIG['CUSTOM_SCRIPTS'] .= get_datatables_jquery($dt_orderby, $CONFIG);;
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t$(function(){";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t$(\".inventory-modal\").click(function(e){";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\te.preventDefault();";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\tvar mymodal = $(\"#inv_modal\");";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\t$(\".modal-body #productid\").val(this.id);";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\tmymodal.modal(\"show\");";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t});";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t})";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n</script>";

$col_0			= make_gen_info("Some text before the invenory list", $CONFIG);
$row_0			= make_gen_row($col_0, $CONFIG);
$container_0	= make_gen_container($row_0, $CONFIG);

$html .= $container_0;
$html .= "\n\t<hr>";
$html .= $table;

$CONFIG['BODY'] .= $html;
echo template_b($CONFIG, $PATHS) . "\n";
?>
