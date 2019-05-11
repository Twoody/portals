<?php
function get_font_awesome_scripts($CONFIG=Null, $ROOT=Null){
	if($ROOT === Null && $CONFIG===Null){
		$ROOT = '.';
		require_once($ROOT . '/config/paths.php');
	}
	if($CONFIG === Null)
		$CONFIG	= get_config($ROOT);
	if($ROOT == Null)
		$ROOT = $CONFIG['ROOT'];
	$PATHS = get_paths($ROOT);
	echo "\n<!-- ".$PATHS['FONT_AWESOME_JS_PATH']." imported -->\n";

	$ret	= "";
	if ($CONFIG['HAS_FONT_AWESOME']){
		$ret .= "\n\t<!-- jQuery first,then Popper.js,then Bootstrap.JS -->"; 
		if($CONFIG['IS_ONLINE'])
			$ret .= make_script($CONFIG['FONT_AWESOME_JS_SRC']);
		else
			$ret .= make_script($PATHS['LOCAL_JS_FA']);
			//$ret .= '';
	}
	return $ret;
}

/***** Just for testing *****/
//echo get_bootstrap_scripts() . "\n";
?>
