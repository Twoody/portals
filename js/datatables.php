<?
require_once('./config/imports.php');

echo "\n<!-- js/datatables.php imported -->\n";
function get_datatables_scripts($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$ret = "";
	if ($CONFIG['HAS_DATATABLES']){
		$ret .= "\n\t<!-- jQuery first,then DataTables.js -->"; 
		$ret .= make_script($CONFIG['DATATABLES_JS_JQUERY_SRC'],	$CONFIG['DATATABLES_JS_JQUERY_INTEGRITY'],	$CONFIG['DATATABLES_JS_JQUERY_ORIGIN']);
		$ret .= make_script($CONFIG['DATATABLES_JS_SRC'], 			$CONFIG['DATATABLES_JS_INTEGRITY'],			$CONFIG['DATATABLES_JS_ORIGIN']);
	}
	else if($CONFIG['HAS_DATATABLES_JQUERY']){
		$ret .= "\n\t<!-- jQuery first -->"; 
		$ret .= make_script($CONFIG['DATATABLES_JS_JQUERY_SRC'],	$CONFIG['DATATABLES_JS_JQUERY_INTEGRITY'],	$CONFIG['DATATABLES_JS_JQUERY_ORIGIN']);
	}
		$ret .= " \n\t<!-- NO DATATABLES MODULES IMPORTED-->\n";
	return $ret;
}

/***** Just for testing *****/
//$CONFIG	= get_config();
//$CONFIG['HAS_DATATABLES'] = TRUE;
//echo get_datatables_scripts($CONFIG) . "\n";
?>
