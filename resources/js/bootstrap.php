<?php
function get_bootstrap_scripts($CONFIG=Null, $ROOT=Null){
	if($ROOT === Null && $CONFIG===Null){
		$ROOT = '.';
		require_once($ROOT . '/config/paths.php');
	}
	if($CONFIG === Null)
		$CONFIG	= get_config($ROOT);
	if($ROOT == Null)
		$ROOT = $CONFIG['ROOT'];
	$PATHS = get_paths($ROOT);
	echo "\n<!-- ".$PATHS['BOOTSTRAP_JS_PATH']." imported -->\n";

	$ret			= "";
	$bs_arr		= get_js_arr();
	$popper_arr	= get_js_arr();
	$jquery_arr	= get_js_arr();
	if ($CONFIG['HAS_BOOTSTRAP']){
		$ret .= "\n\t<!-- jQuery first,then Popper.js,then Bootstrap.JS -->"; 
		if($CONFIG['IS_ONLINE']){
			$bs_arr['src']					= $CONFIG['BOOTSTRAP_JS_SRC'];
			$bs_arr['integrity']			= $CONFIG['BOOTSTRAP_JS_INTEGRITY'];
			$bs_arr['crossorigin']		= $CONFIG['BOOTSTRAP_JS_ORIGIN'];

			$popper_arr['src']			= $CONFIG['BOOTSTRAP_JS_POPPER_SRC'];
			$popper_arr['integrity']	= $CONFIG['BOOTSTRAP_JS_POPPER_INTEGRITY'];
			$popper_arr['crossorigin']	= $CONFIG['BOOTSTRAP_JS_POPPER_ORIGIN'];

			$jquery_arr['src']			= $CONFIG['BOOTSTRAP_JS_JQUERY_SRC'];
			$jquery_arr['integrity']	= $CONFIG['BOOTSTRAP_JS_JQUERY_INTEGRITY'];	
			$jquery_arr['crossorigin']	= $CONFIG['BOOTSTRAP_JS_JQUERY_ORIGIN'];
		}
		else{
			//Offline and running local;
			$bs_arr['src']			= $PATHS['LOCAL_JS_BOOTSTRAP'];
			$popper_arr['src']	= $PATHS['LOCAL_JS_POPPER'];
			$jquery_arr['src']	= $PATHS['LOCAL_JS_JQUERY'];
		}
		$ret .= make_tag('script', $jquery_arr, $CONFIG);
		$ret .= make_tag('script', $popper_arr, $CONFIG);
		$ret .= make_tag('script', $bs_arr, $CONFIG);
	}
	else if($COINFIG['HAS_POPPER'] || $CONFIG['HAS_JQUERY']){
		if ($CONFIG['HAS_JQUERY']){
			$ret .= "\n\t<!-- jQuery first,then Popper.js -->"; 
			if($CONFIG['IS_ONLINE']){
				$jquery_arr['src']			= $CONFIG['BOOTSTRAP_JS_JQUERY_SRC'];
				$jquery_arr['integrity']	= $CONFIG['BOOTSTRAP_JS_JQUERY_INTEGRITY'];	
				$jquery_arr['crossorigin']	= $CONFIG['BOOTSTRAP_JS_JQUERY_ORIGIN'];
			}
			else
				$jquery_arr['src']	= $PATHS['LOCAL_JS_JQUERY'];
			$ret .= make_tag('script', $jquery_arr, $CONFIG);
		}
		if ($CONFIG['HAS_POOPER']){
			$ret .= "\n\t<!-- Then Popper.js -->"; 
			if($CONFIG['IS_ONLINE']){
				$popper_arr['src']			= $CONFIG['BOOTSTRAP_JS_POPPER_SRC'];
				$popper_arr['integrity']	= $CONFIG['BOOTSTRAP_JS_POPPER_INTEGRITY'];
				$popper_arr['crossorigin']	= $CONFIG['BOOTSTRAP_JS_POPPER_ORIGIN'];
			}
			else
				$popper_arr['src']	= $PATHS['LOCAL_JS_POPPER'];
			$ret .= make_tag('script', $popper_arr, $CONFIG);
		}
	}
	else
		$ret .= " \n\t<!-- NO BOOTSTRAP MODULES IMPORTED-->\n";
	return $ret;
}

/***** Just for testing *****/
//echo get_bootstrap_scripts() . "\n";
?>
