<?php
function get_react_scripts($CONFIG=Null, $ROOT=Null){
	if($ROOT === Null && $CONFIG===Null){
		$ROOT = '.';
		require_once($ROOT . '/config/paths.php');
	}
	if($CONFIG === Null)
		$CONFIG	= get_config($ROOT);
	if($ROOT == Null)
		$ROOT = $CONFIG['ROOT'];
	$PATHS = get_paths($ROOT);
	echo "\n<!-- ".$PATHS['REACT_JS_PATH']." imported -->\n";

	if (!$CONFIG['HAS_REACT'])
		return "";
	if($CONFIG['IS_ONLINE']){
		$react_src		= $CONFIG['REACT_JS_SRC'];
		$react_dom_src	= $CONFIG['REACT_JS_SRC'];
		$babel_src		= $CONFIG['REACT_JS_SRC'];
	}
	else{
		$react_src		= $PATHS['LOCAL_JS_REACT'];
		$react_dom_src	= $PATHS['LOCAL_JS_REACT_DOM'];
		$babel_src		= $PATHS['LOCAL_JS_BABEL'];
	}
	$script	= "\n\t<!-- REACT Src -->"; 
	$react_arr	= Array(
		'src'=>$react_src,
		'crossorigin'=>'',
	);
	$react_dom_arr	= Array(
		'src'=>$react_dom_src,
		'crossorigin'=>'',
	);
	$babel_arr	= Array('src'=>$babel_src);
	$script		.= "\n\t" . make_tag('script', $react_arr, $CONFIG);
	$script		.= "\n\t" . make_tag('script', $react_dom_arr, $CONFIG);
	$script		.= "\n\t" . make_tag('script', $babel_arr, $CONFIG);
	return $script;
}

/***** Just for testing *****/
//echo get_font_awesome_scripts() . "\n";
?>
