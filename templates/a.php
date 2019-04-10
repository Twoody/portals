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

//WARNING: DATATABLES not configured for new get_* config functions;
$CONFIG['HAS_DATATABLES'] = TRUE;


/* ----- ----- SECOND IMPORT ----- ----- */
//echo get_bootstrap_scripts($CONFIG) . "\n";
//echo get_css($CONFIG) . "\n";
echo get_header($CONFIG);
?>
