<?php
function get_datatables_scripts($CONFIG=Null, $ROOT=Null){
	if($ROOT === Null && $CONFIG===Null){
		$ROOT = '.';	//We can also check CONFIG for `ROOT`;
		require_once($ROOT . '/config/paths.php');
	}
	if($CONFIG === Null)
		$CONFIG	= get_config($ROOT);
	if($ROOT == Null)
		$ROOT = $CONFIG['ROOT'];
	$PATHS = get_paths($ROOT);
	echo "\n<!-- ".$PATHS['DATATABLES_JS_PATH']." imported -->\n";


	$ret = "";
	if ($CONFIG['HAS_DATATABLES']){
		$ret .= "\n\t<!-- jQuery first,then DataTables.js -->"; 
		if($CONFIG['IS_ONLINE']){
			$ret .= make_script(
				$CONFIG['DATATABLES_JS_JQUERY_SRC'],
				$CONFIG['DATATABLES_JS_JQUERY_INTEGRITY'],
				$CONFIG['DATATABLES_JS_JQUERY_ORIGIN']);
			$ret .= make_script(
				$CONFIG['DATATABLES_JS_SRC'],
				$CONFIG['DATATABLES_JS_INTEGRITY'],
				$CONFIG['DATATABLES_JS_ORIGIN']);
		}
		else{
			//Offline and running local;
			$ret .= make_script($PATHS['LOCAL_JS_JQUERY_DATATABLES']);
			$ret .= make_script($PATHS['LOCAL_JS_DATATABLES']);
		}
	}
	else if($CONFIG['HAS_DATATABLES_JQUERY']){
		$ret .= "\n\t<!-- jQuery first -->"; 
		if($CONFIG['IS_ONLINE'])
			$ret .= make_script(
				$CONFIG['DATATABLES_JS_JQUERY_SRC'],
				$CONFIG['DATATABLES_JS_JQUERY_INTEGRITY'],
				$CONFIG['DATATABLES_JS_JQUERY_ORIGIN']);
		else
			$ret .= make_script($PATHS['LOCAL_JS_JQUERY_DATATABLES']);
	}
	else
		$ret .= " \n\t<!-- NO DATATABLES MODULES IMPORTED-->\n";
	return $ret;
}

/***** Just for testing *****/
//$ROOT		= '.';
//$CONFIG	= get_config($ROOT);
//$CONFIG['HAS_DATATABLES'] = TRUE;
//echo get_datatables_scripts($CONFIG) . "\n";
?>
