<?php
function get_datatables_css($CONFIG=Null, $ROOT=Null){
	if($ROOT === Null && $CONFIG===Null){
		$ROOT = '.';
		require_once($ROOT . '/config/paths.php');
	}
	if($CONFIG === Null)
		$CONFIG	= get_config($ROOT);
	if($ROOT == Null)
		$ROOT = $CONFIG['ROOT'];
	$PATHS = get_paths($ROOT);
	echo "\n<!-- ".$PATHS['DATATABLES_CSS_PATH']." imported -->\n";

	$datatables_css = "";
	if ($CONFIG['HAS_DATATABLES']){
		$datatables_css .= "\n\t<!-- DATATABLES CSS -->";
		if($CONFIG['IS_ONLINE'])
			$datatables_css .= make_css(
				$CONFIG['DATATABLES_CSS_REL'],
				$CONFIG['DATATABLES_CSS_LINK'],
				$CONFIG['DATATABLES_CSS_INTEGRITY'],
				$CONFIG['DATATABLES_CSS_ORIGIN']);
		else
			$datatables_css .= make_css(
				$CONFIG['DATATABLES_CSS_REL'],
				$PATHS['LOCAL_CSS_DATATABLES']);
	}
	else{ //TODO: Maybe if isVerbose?
		$datatables_css .= "\n\t<!-- PAGE HAS NO DATATABLES-->";
	}
	return $datatables_css;
}

/***** Just for testing *****/
//$ROOT		= '.';
//$CONFIG	= get_config();
//$CONFIG['HAS_DATATABLES'] = TRUE;
//echo get_datatables_css($CONFIG) . "\n";
?>

