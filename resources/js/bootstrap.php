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

	$ret 		= "";
	if ($CONFIG['HAS_BOOTSTRAP']){
		$ret .= "\n\t<!-- jQuery first,then Popper.js,then Bootstrap.JS -->"; 
		if($CONFIG['IS_ONLINE']){
			$ret .= make_script(
				$CONFIG['BOOTSTRAP_JS_JQUERY_SRC'],	
				$CONFIG['BOOTSTRAP_JS_JQUERY_INTEGRITY'],	
				$CONFIG['BOOTSTRAP_JS_JQUERY_ORIGIN']);
			$ret .= make_script(
				$CONFIG['BOOTSTRAP_JS_POPPER_SRC'],	
				$CONFIG['BOOTSTRAP_JS_POPPER_INTEGRITY'],	
				$CONFIG['BOOTSTRAP_JS_POPPER_ORIGIN']);
			$ret .= make_script(
				$CONFIG['BOOTSTRAP_JS_SRC'],
				$CONFIG['BOOTSTRAP_JS_INTEGRITY'],
				$CONFIG['BOOTSTRAP_JS_ORIGIN']);
		}
		else{
			//Offline and running local;
			$ret .= make_script($PATHS['LOCAL_JS_JQUERY']);
			$ret .= make_script($PATHS['LOCAL_JS_POPPER']);
			$ret .= make_script($PATHS['LOCAL_JS_BOOTSTRAP']);
		}

	}
	else if($COINFIG['HAS_POPPER'] || $CONFIG['HAS_JQUERY']){
		if ($CONFIG['HAS_JQUERY']){
			$ret .= "\n\t<!-- jQuery first,then Popper.js -->"; 
			if($CONFIG['IS_ONLINE'])
				$ret .= make_script(
					$CONFIG['BOOTSTRAP_JS_JQUERY_SRC'],	
					$CONFIG['BOOTSTRAP_JS_JQUERY_INTEGRITY'],	
					$CONFIG['BOOTSTRAP_JS_JQUERY_ORIGIN']);
			else
				$ret .= make_script($PATHS['LOCAL_JS_JQUERY']);
		}
		if ($CONFIG['HAS_POOPER']){
			$ret .= "\n\t<!-- Then Popper.js -->"; 
			if($CONFIG['IS_ONLINE'])
				$ret .= make_script(
					$CONFIG['BOOTSTRAP_JS_POPPER_SRC'],
					$CONFIG['BOOTSTRAP_JS_POPPER_INTEGRITY'],
					$CONFIG['BOOTSTRAP_JS_POPPER_ORIGIN']);
			else
			$ret .= make_script($PATHS['LOCAL_JS_POPPER']);
		}
	}
	else
		$ret .= " \n\t<!-- NO BOOTSTRAP MODULES IMPORTED-->\n";
	return $ret;
}

/***** Just for testing *****/
//echo get_bootstrap_scripts() . "\n";
?>
