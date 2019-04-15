<?
require_once('./config/imports.php');

echo "\n<!-- css/font_awesome.php imported -->\n";
function get_font_awesome_css($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$font_awesome_css = "";
	if ($CONFIG['HAS_FONT_AWESOME']) {
		$font_awesome_css .= "\n\t<!-- FONT AWESOME CSS -->";
		$font_awesome_css .= make_css(
			$CONFIG['FONT_AWESOME_CSS_REL'], 
			$CONFIG['FONT_AWESOME_CSS_LINK'], 
			$CONFIG['FONT_AWESOME_CSS_INTEGRITY'], 
			$CONFIG['FONT_AWESOME_CSS_ORIGIN']
		);
	}
	else{
		$font_awesome_css .= "\n\t<!-- PAGE HAS NO FONT_AWESOME CSS-->";
	}
	return $font_awesome_css;
}

/***** Just for testing *****/
//echo get_font_awesome_css() . "\n";
?>
