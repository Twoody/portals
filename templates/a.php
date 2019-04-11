<!doctype html>
<?
require_once('./config/imports.php');
$PATHS = get_paths();

require_once($PATHS['DATATABLES_CSS_PATH']);
require_once($PATHS['DATATABLES_JS_PATH']);
$CONFIG = get_config();

/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
//TODO: Store title in a pages db;
$CONFIG['TITLE'] = "TEMPLATE A";

$CONFIG['HAS_DATATABLES'] = TRUE;

$html = '';
$html .= get_header($CONFIG);

echo $html."\n";
?>
