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

	if ($CONFIG['HAS_FONT_AWESOME']){
		if($CONFIG['IS_ONLINE'])
			$js_src = $CONFIG['FONT_AWESOME_JS_SRC'];
		else
			$js_src = $PATHS['LOCAL_JS_FA'];
	}
	$js_arr	= Array(
		'src'=>$js_src,
	);
	$script	= "\n\t<!-- Font Awesome Src -->"; 
	$script	.= make_tag('script', $js_arr, $CONFIG);
	return $script;
}

/***** Just for testing *****/
//echo get_font_awesome_scripts() . "\n";
?>
