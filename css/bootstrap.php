<?
require('./config/imports.php');

function get_css(){
	$bootstrap_css = "";
	if ($HAS_BOOTSTRAP){
		$bootstrap_css .= "\n\t<!-- BOOTSTRAP CSS -->";
		$boostrap_css .= make_css($BOOTSTRAP_CSS_REL, $BOOTSTRAP_CSS_LINK, $BOOTSTRAP_CSS_INTEGRITY, $BOOTSTRAP_CSS_ORIGIN);
	}
	else{ //TODO: Maybe if isVerbose?
		$bootstrap_css .= "\n\t<!-- PAGE HAS NO BOOTSTRAP-->";
	}
	return $bootstrap_css;
}
?>
