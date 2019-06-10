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
    View the users current inventory;
	 TODO:
	 	Be able to edit the current inventory with pencils + modals;

Links:
	NA
******************************************************************************/

$ROOT = "../../..";
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);
$PATHS	= get_paths($ROOT);
$CONFIG	= get_config($ROOT);
$STRINGS = get_config_strings($CONFIG);
$userid	= get_user_id($CONFIG);
require_once($PATHS['HTML_LOGIN_OR_SIGNOUT']);
require_once($PATHS['HTML_GET_INVENTORY']);
require_once($PATHS['TEMPLATES_B']);

echo "<!-- LANDED ON: ".$PATHS['USER_GET_INVENTORY'].":INVENTORY PAGE-->";

$CONFIG['TABLE_ID'] = "inventory";
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE']						= "My Shopping Cart";
$CONFIG['DISPLAY_HEADER']			= FALSE;
$dt_orderby								= "name";

$CONFIG['CUSTOM_SCRIPTS'] .= get_js_inv($PATHS, $CONFIG);;
$CONFIG['CUSTOM_SCRIPTS'] .= get_form_nullifier($CONFIG);
$CONFIG['CUSTOM_SCRIPTS'] .= get_datatables_jquery($dt_orderby, $CONFIG);;

$CONFIG['CUSTOM_SCRIPTS'] .= "\n<script>";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t$(function(){";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t$(\".inventory-modal\").click(function(e){";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\te.preventDefault();";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\tvar mymodal = $(\"#inv_modal\");";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\t$(\".modal-body #product\").val(this.id);";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\tmymodal.modal(\"show\");";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t\t";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t\t});";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\t})";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n</script>";

if(isset($_GET['is_deleting_product']) && isset($_GET['delete_id'])){
	$product_id	= $_GET['delete_id'];
	$suc			= delete_product_from_cart($product_id, $userid, $CONFIG);
}
$cart			= get_cart($userid, $CONFIG);
$table		= get_checkout_table($cart, $CONFIG);
$cart_total	= get_cart_total($userid, $CONFIG);
$col0			= make_gen_info($STRINGS['VIEW_INV_TEXT'], $CONFIG);
$row0			= make_gen_row($col0, $CONFIG);
$container0	= make_gen_container($row0, $CONFIG);

$button_arr	= Array(
	'class'=>'btn btn-primary w-100 fixed-bottom mb-5 p-3',
	'content'=>"$".$cart_total." due. Checkout?",
	'name'=>'form_submit',
	'type'=>'submit',
);
$button		= make_tag('button', $button_arr, $CONFIG);
$row1			= make_gen_row($button, $CONFIG);
$container1	= make_gen_container($table, $CONFIG);
$container2	= make_gen_container($row1, $CONFIG);

$html	= "";
$html .= $container0;
$html .= "<hr>";
$html	.= $container1;
$html	.= $container2;

$CONFIG['BODY'] .= $html;
echo template_b($CONFIG, $PATHS) . "\n";
?>
