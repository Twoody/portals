<!doctype html>
<?
require_once('./config/imports.php');
$PATHS = get_paths();

require_once($PATHS['DATATABLES_CSS_PATH']);
require_once($PATHS['DATATABLES_JS_PATH']);
$CONFIG = get_config();

/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['TITLE'] = "TEMPLATE LOGIN";
$CONFIG['HAS_DATATABLES'] = TRUE;

$html = '';
$html .= get_header($CONFIG);
$html .= "\n";
$html .= "\n<body>";
$html .= "\n\t<h1>DataTables Template</h1>";
$html .= get_nav($CONFIG);
$html .= get_js($CONFIG);
$html .=	"\n\t<!-- Optional JavaScript -->\n";
$html .= "\n</body>";
$html .= "\n</html>\n";
echo $html;
?>
