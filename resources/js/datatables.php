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

	$dt_arr		= get_js_arr();
	$jquery_arr	= get_js_arr();
	$ret = "";
	if ($CONFIG['HAS_DATATABLES']){
		$ret .= "\n\t<!-- jQuery first,then DataTables.js -->"; 
		if($CONFIG['IS_ONLINE']){
			$jquery_arr['src']			= $CONFIG['DATATABLES_JS_JQUERY_SRC'];
			$jquery_arr['integrity']	= $CONFIG['DATATABLES_JS_JQUERY_INTEGRITY'];
			$jquery_arr['crossorigin']	= $CONFIG['DATATABLES_JS_JQUERY_ORIGIN'];

			$dt_arr['src']					= $CONFIG['DATATABLES_JS_SRC'];
			$dt_arr['integrity']			= $CONFIG['DATATABLES_JS_INTEGRITY'];
			$dt_arr['crossorigin']		= $CONFIG['DATATABLES_JS_ORIGIN'];
		}
		else{
			//Offline and running local;
			$jquery_arr['src']	= $PATHS['LOCAL_JS_JQUERY_DATATABLES'];
			$dt_arr['src']			= $PATHS['LOCAL_JS_DATATABLES'];
		}
		$ret .= make_tag('script', $jquery_arr, $CONFIG);
		$ret .= make_tag('script', $dt_arr, $CONFIG);
	}
	else if($CONFIG['HAS_DATATABLES_JQUERY']){
		$ret .= "\n\t<!-- DataTables jQuery -->"; 
		if($CONFIG['IS_ONLINE']){
			$jquery_arr['src']			= $CONFIG['DATATABLES_JS_JQUERY_SRC'];
			$jquery_arr['integrity']	= $CONFIG['DATATABLES_JS_JQUERY_INTEGRITY'];
			$jquery_arr['crossorigin']	= $CONFIG['DATATABLES_JS_JQUERY_ORIGIN'];
		}
		else
			$jquery_arr['src']	= $PATHS['LOCAL_JS_JQUERY_DATATABLES'];
		$ret .= make_tag('script', $jquery_arr, $CONFIG);
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
