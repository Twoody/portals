<?
require_once('./config/imports.php');

function get_datatables_scripts(){
	$ret = "";
	if ($HAS_DATATABLES){
		$ret .= "\n\t<!-- jQuery first,then Popper.js,then Bootstrap.JS -->"; 
		$ret .= make_script($DATATABLES_JS_SRC, $DATATABLES_JS_INTEGRITY, $DATATABLES_JS_ORIGIN);
		$ret .= make_script($DATATABLES_JS_JQUERY_SRC, $DATATABLES_JS_JQUERY_INTEGRITY, $DATATABLES_JS_JQUERY_ORIGIN);
	}
	else if($HAS_DATATABLES_JQUERY){
		$ret .= "\n\t<!-- jQuery first,then Popper.js,then Bootstrap.JS -->"; 
		$ret .= make_script($DATATABLES_JS_JQUERY_SRC, $DATATABLES_JS_JQUERY_INTEGRITY, $DATATABLES_JS_JQUERY_ORIGIN);
	}
	return $ret;
}
?>
