<!doctype html>
<?
require_once('./config/imports.php');
$CONFIG = get_config();

/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
//TODO: Store title in a pages db;
$CONFIG['TITLE'] = "TEMPLATE A";

//WARNING: DATATABLES not configured for new get_* config functions;
//$CONFIG['HAS_DATATABLES'] = TRUE;


/* ----- ----- SECOND IMPORT ----- ----- */
//echo get_bootstrap_scripts($CONFIG) . "\n";
//echo get_css($CONFIG) . "\n";
echo get_header($CONFIG);
?>
