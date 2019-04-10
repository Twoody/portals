<?
require_once('./config/imports.php');

function get_bootstrap_css($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
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

//echo get_bootstrap_css() . "\n";
?>
