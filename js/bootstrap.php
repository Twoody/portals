<?
require_once('./config/imports.php');

function get_bootstrap_scripts($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$ret 		= "";
	var_dump($CONFIG['HAS_BOOTSTRAP']);
	if ($CONFIG['HAS_BOOTSTRAP']){
		$ret .= "\n\t<!-- jQuery first,then Popper.js,then Bootstrap.JS -->"; 
		$ret .= make_script($CONFIG['BOOTSTRAP_JS_SRC'],			$CONFIG['BOOTSTRAP_JS_INTEGRITY'],			$CONFIG['BOOTSTRAP_JS_ORIGIN']);
		$ret .= make_script($CONFIG['BOOTSTRAP_JS_POPPER_SRC'],	$CONFIG['BOOTSTRAP_JS_POPPER_INTEGRITY'],	$CONFIG['BOOTSTRAP_JS_POPPER_ORIGIN']);
		$ret .= make_script($CONFIG['BOOTSTRAP_JS_JQUERY_SRC'],	$CONFIG['BOOTSTRAP_JS_JQUERY_INTEGRITY'],	$CONFIG['BOOTSTRAP_JS_JQUERY_ORIGIN']);
	}
	else if($COINFIG['HAS_POPPER'] || $CONFIG['HAS_JQUERY']){
		if ($CONFIG['HAS_JQUERY']){
			$ret .= "\n\t<!-- jQuery first,then Popper.js,then Bootstrap.JS -->"; 
			$ret .= make_script($CONFIG['BOOTSTRAP_JS_JQUERY_SRC'],	$CONFIG['BOOTSTRAP_JS_JQUERY_INTEGRITY'],	$CONFIG['BOOTSTRAP_JS_JQUERY_ORIGIN']);
		}
		if ($CONFIG['HAS_POOPER']){
			$ret .= "\n\t<!-- jQuery first,then Popper.js,then Bootstrap.JS -->"; 
			$ret .= make_script($CONFIG['BOOTSTRAP_JS_POPPER_SRC'],	$CONFIG['BOOTSTRAP_JS_POPPER_INTEGRITY'],	$CONFIG['BOOTSTRAP_JS_POPPER_ORIGIN']);
		}
	}
	else
		$ret .= " \n\t<!-- NO BOOTSTRAP MODULES IMPORTED-->\n";
	return $ret;
}

//echo get_bootstrap_scripts() . "\n";
?>
