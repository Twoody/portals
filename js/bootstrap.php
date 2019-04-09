<?
require('./config/imports.php');

function get_scripts(){
	$ret = "";
	if ($HAS_BOOTSTRAP === TRUE){
		$ret .= "\n\t<!-- jQuery first,then Popper.js,then Bootstrap.JS -->"; 
		$ret .= make_script($BOOTSTRAP_JS_SRC, $BOOTSTRAP_JS_INTEGRITY, $BOOTSTRAP_JS_ORIGIN);
		$ret .= make_script($BOOTSTRAP_JS_CLOUDFLARE_SRC,$BOOTSTRAP_JS_CLOUDFLARE_INTEGRITY, $BOOTSTRAP_JS_CLOUDFLARE_ORIGIN);
		$ret .= make_script($BOOTSTRAP_JS_JQUERY_SRC, $BOOTSTRAP_JS_JQUERY_INTEGRITY, $BOOTSTRAP_JS_JQUERY_ORIGIN);
	}
	else if($HAS_POPPER || $HAS_JQUERY){
		if ($HAS_POOPER){
			$ret .= "\n\t<!-- jQuery first,then Popper.js,then Bootstrap.JS -->"; 
			$ret .= make_script($BOOTSTRAP_JS_CLOUDFLARE_SRC,$BOOTSTRAP_JS_CLOUDFLARE_INTEGRITY, $BOOTSTRAP_JS_CLOUDFLARE_ORIGIN);
		}
		if ($HAS_JQUERY){
			$ret .= "\n\t<!-- jQuery first,then Popper.js,then Bootstrap.JS -->"; 
			$ret .= make_script($BOOTSTRAP_JS_JQUERY_SRC, $BOOTSTRAP_JS_JQUERY_INTEGRITY, $BOOTSTRAP_JS_JQUERY_ORIGIN);
		}
	}
	return $ret
}
?>
