<?php
function get_font_awesome_css($CONFIG=Null, $ROOT=Null){
	if($ROOT === Null && $CONFIG === Null){
		$ROOT = ".";
		require_once($ROOT . '/config/paths.php');
	}
	if($CONFIG === Null)
		$CONFIG	= get_config($ROOT);
	if($ROOT === Null)
		$ROOT = $CONFIG['ROOT'];
	$PATHS = get_paths($ROOT);
	echo "\n<!-- ".$PATHS['FONT_AWESOME_CSS_PATH']." imported -->\n";

	$font_awesome_css = "";
	if ($CONFIG['HAS_FONT_AWESOME']) {
		$font_awesome_css .= "\n\t<!-- FONT AWESOME CSS -->";
		if($CONFIG['IS_ONLINE']){
			$font_awesome_css .= make_css(
				$CONFIG['FONT_AWESOME_CSS_REL'], 
				$CONFIG['FONT_AWESOME_CSS_LINK'], 
				$CONFIG['FONT_AWESOME_CSS_INTEGRITY'], 
				$CONFIG['FONT_AWESOME_CSS_ORIGIN']
			);
		}
		else
			$font_awesome_css .= make_css(
				$CONFIG['FONT_AWESOME_CSS_REL'],
				$PATHS['LOCAL_CSS_FA']);
	}
	else{
		$font_awesome_css .= "\n\t<!-- PAGE HAS NO FONT_AWESOME CSS-->";
	}
	return $font_awesome_css;
}

/***** Just for testing *****/
//echo get_font_awesome_css() . "\n";
?>
