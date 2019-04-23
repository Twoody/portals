<?
function get_bootstrap_css($CONFIG=Null, $ROOT=Null){
	if($ROOT === Null && $CONFIG===Null){
		$ROOT = '.';
		require_once($ROOT . '/config/paths.php');
		$PATHS = get_paths($ROOT);
		require_once($PATHS['SETTINGS_PATH']);
		require_once($PATHS['LIBPATH_HTML']);
	}
	if($CONFIG === Null)
		$CONFIG	= get_config($ROOT);
	if($ROOT == Null)
		$ROOT = $CONFIG['ROOT'];
	$PATHS = get_paths($ROOT);
	echo "\n<!-- ".$PATHS['BOOTSTRAP_CSS_PATH']." imported -->\n";
	
	$bootstrap_css = "";
	if ($CONFIG['HAS_BOOTSTRAP']) {
		$bootstrap_css .= "\n\t<!-- BOOTSTRAP CSS -->";
		$bootstrap_css .= make_css($CONFIG['BOOTSTRAP_CSS_REL'], $CONFIG['BOOTSTRAP_CSS_LINK'], $CONFIG['BOOTSTRAP_CSS_INTEGRITY'], $CONFIG['BOOTSTRAP_CSS_ORIGIN']);
	}
	else{
		$bootstrap_css .= "\n\t<!-- PAGE HAS NO BOOTSTRAP CSS-->";
	}
	return $bootstrap_css;
}

/***** Just for testing *****/
//echo get_bootstrap_css() . "\n";
?>
