<?
require_once('./config/imports.php');

function get_datatables_css(){
	$datatables_css = "";
	if ($HAS_DATATABLES){
		$datatables_css .= "\n\t<!-- DATATABLES CSS -->";
		$boostrap_css .= make_css($DATATABLES_CSS_REL, $DATATABLES_CSS_LINK, $DATATABLES_CSS_INTEGRITY, $DATATABLES_CSS_ORIGIN);
	}
	else{ //TODO: Maybe if isVerbose?
		$datatables_css .= "\n\t<!-- PAGE HAS NO DATATABLES-->";
	}
	return $datatables_css;
}
?>

