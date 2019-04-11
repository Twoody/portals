<?php
	/** ** ** ** ** ** ** GENERAL ** ** ** ** ** **/
	require_once('./config/paths.php');
	$PATHS = get_paths();

	require_once($PATHS['SETTINGS_PATH']);
	require_once($PATHS['BOOTSTRAP_CSS_PATH']);
	require_once($PATHS['BOOTSTRAP_JS_PATH']);

	/** ** ** ** ** ** ** UTILS ** ** ** ** ** ** **/
	require_once($PATHS['LIBPATH_HTML']);
	require_once($PATHS['LIBPATH_DATES']);


if (!function_exists("get_imports")){
	/* FUNCTION WRAPPED IN IF-STMNT BECAUSE MULTIPLE IMPORTS WILL LEAD TO ERRORS; */
	//TODO: Determine if this function will be necessary or not...
	function get_imports(){
		return Array(
			'./config/paths.php',
			$PATHS['SETTINGS_PATH'],
			$PATHS['BOOTSTRAP_CSS_PATH'],
			$PATHS['BOOTSTRAP_JS_PATH'],
	
			/** ** ** ** ** ** ** UTILS ** ** ** ** ** ** **/
			$PATHS['LIBPATH_HTML'],
			$PATHS['LIBPATH_DATES'],
		);
	}
}
?>
