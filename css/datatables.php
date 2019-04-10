<?
require_once('./config/imports.php');

echo "\n<!-- css/datatables.php imported -->\n";
function get_datatables_css($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$datatables_css = "";
	if ($CONFIG['HAS_DATATABLES']){
		$datatables_css .= "\n\t<!-- DATATABLES CSS -->";
		$datatables_css .= make_css($CONFIG['DATATABLES_CSS_REL'], $CONFIG['DATATABLES_CSS_LINK'], $CONFIG['DATATABLES_CSS_INTEGRITY'], $CONFIG['DATATABLES_CSS_ORIGIN']);
	}
	else{ //TODO: Maybe if isVerbose?
		$datatables_css .= "\n\t<!-- PAGE HAS NO DATATABLES-->";
	}
	return $datatables_css;
}

/***** Just for testing *****/
//$CONFIG	= get_config();
//$CONFIG['HAS_DATATABLES'] = TRUE;
//echo get_datatables_css($CONFIG) . "\n";
?>

