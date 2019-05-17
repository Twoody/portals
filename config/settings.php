<?
function get_config($ROOT=Null){
	if ($ROOT === Null)
		$ROOT = ".";
	require_once($ROOT . '/config/paths.php');
	$PATHS = get_paths($ROOT);
	echo "\n<!-- ".$PATHS['SETTINGS_PATH']." imported -->\n";
	return Array(
		/* ----- ----- GENERAL OPTIONS ----- ----- */
		'ACTIVE_PAGE'=>"./",
		'BODY'=>"",
		'CHAR_SET'=>"utf-8",
		'FLAGS'=>[],
		'FOOTER_IS_STICKY'=>TRUE,
		'HAS_LOGIN'=>FALSE,
		//'IS_ONLINE'=>FALSE,
		'IS_ONLINE'=>TRUE,
		'LANG'=>"en",
		'META_CONTENT'=>"width=device-width, initial-scale=1, shrink-to-fit=no",
		'ROOT'=>$ROOT,
		'GEN_CONTAINER'=>"\n<div class=\"container-fluid pr-3 pl-3 m-0\">",
		'GEN_ROW'=> "\n\t<div class=\"row pl-3 pr-3 m-0\">",
		'GEN_COL'=> "\n\t\t\t\t<div class=\"col-12\">",
		'GEN_INFO'=> "\n\t\t\t\t<div class=\"col-12 bg-info\">",
		'GEN_WARNING'=> "\n\t\t\t\t<div class=\"col-12 bg-warning\">",
		'TITLE '=> "", 			//Surely overwritten,
		'VERSION'=>1.10,
	
		/* ----- ----- LINKS ----- ----- */
		/* WILL PROBABLY BE OWN FUNCTION IN THE FUTURE */
		'LINK_ANDROID' => 'https://play.google.com/store/apps/details?id=com.beWoody.tanner.KISS_List',
		'LINK_TWITTER' => 'https://twitter.com/woody_tanner',
		'LINK_FACEBOOK' => 'https://www.facebook.com/tanner.woody.9',
		'LINK_GMAIL' => 'mailto:Tanner.L.Woody@gmail.com',
		'LINK_LINKEDIN' => 'ihttps://www.linkedin.com/in/tanner-woody-113208b7/',
		'LINK_INSTA' => 'https://www.instagram.com/thatguywoody/',
		'LINK_STRAVA' => 'https://www.strava.com/athletes/9502204',
		'LINK_STACKOVERFLOW' => 'https://stackoverflow.com/users/2957890/t-woody',
		'LINK_GITHUB' => 'https://github.com/TWoody',
		//TODO: Client links and page...
		//'LINK_CLIENT1' => '',

		/* ----- ----- CUSTOM JS and CSS ----- ----- */
		'CUSTOM_STYLES'=>"",
		'CUSTOM_SCRIPTS'=>"",

		/* ----- ----- DATABASE MANAGEMENT ----- ----- */
		'DBPATH_USERS'=> $PATHS['DB_USERS'],
		'DBPATH_INVENTORY'=> $PATHS['DB_INVENTORY'],
		'USERS_VERSION'=>1.00,
		
		/* ----- ----- BOOTSTRAP REQUIRED PARAMETERS AND CONFIGURATION ----- ----- */
		'HAS_BOOTSTRAP'=>TRUE,
		'HAS_POPPER'=>TRUE,
		'HAS_JQUERY'=>TRUE,
		
		'BOOTSTRAP_CSS_REL'=>"stylesheet", //The required rel attribute specifies the relationship between the current document and the linked document/resource
		'BOOTSTRAP_CSS_LINK'=>"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
		'BOOTSTRAP_CSS_INTEGRITY'=>"sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO",
		'BOOTSTRAP_CSS_ORIGIN'=>"anonymous",
		
		'BOOTSTRAP_JS_SRC'=>"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
		'BOOTSTRAP_JS_INTEGRITY'=>"sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy",
		'BOOTSTRAP_JS_ORIGIN'=>"anonymous",
	
		// - POPPER.js
		'BOOTSTRAP_JS_POPPER_SRC'=>"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
		'BOOTSTRAP_JS_POPPER_INTEGRITY'=>"sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49",
		'BOOTSTRAP_JS_POPPER_ORIGIN'=>"anonymous",
	
		// - jQuery
		'BOOTSTRAP_JS_JQUERY_SRC'=>"https://code.jquery.com/jquery-3.3.1.slim.min.js",
		'BOOTSTRAP_JS_JQUERY_INTEGRITY'=>"sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo",
		'BOOTSTRAP_JS_JQUERY_ORIGIN'=>"anonymous",
	
		/* ----- ----- DATATABLES REQUIRED PARAMETERS AND CONFIGURATION ----- ----- */
		'HAS_DATATABLES'=>FALSE,
		'HAS_DATATABLES_JQUERY'=>FALSE,
	
		'DATATABLES_CSS_REL'=>"stylesheet", //The required rel attribute specifies the relationship between the current document and the linked document/resource
		'DATATABLES_CSS_LINK'=>"https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css",
		'DATATABLES_CSS_INTEGRITY'=>"",
		'DATATABLES_CSS_ORIGIN'=>"anonymous",
		
		'DATATABLES_JS_SRC'=>"https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js",
		'DATATABLES_JS_INTEGRITY'=>"",
		'DATATABLES_JS_ORIGIN'=>"anonymous",
		
		// - jQuery
		'DATATABLES_JS_JQUERY_SRC'=>"https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js",
		'DATATABLES_JS_JQUERY_INTEGRITY'=>"",
		'DATATABLES_JS_JQUERY_ORIGIN'=>"anonymous",

		/* ----- ----- FONT AWESOME REQUIRED PARAMETERS AND CONFIGURATION ----- ----- */
		'HAS_FONT_AWESOME'=>FALSE,
		'FONT_AWESOME_CSS_REL'=>"stylesheet",
		'FONT_AWESOME_CSS_LINK'=>"https://use.fontawesome.com/releases/v5.8.1/css/all.css",
		'FONT_AWESOME_CSS_INTEGRITY'=>"sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf",
		'FONT_AWESOME_CSS_ORIGIN'=>"anonymous",
		'FONT_AWESOME_JS_SRC'=>"https://use.fontawesome.com/18fb4b0697.js",

		/* ----- ----- AUTHENTIFICATION CONFIGURATION ----- ----- */
		'SALT_CHARSET'=>'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\][{}\'";:?.>,<!@#$%^&*()-_=+|',
		'SALT_LENGTH'=>64,

		/* ----- ----- HTML CONFIGURATION ----- ----- */
		'HREF_CLASS'=>'',
		'HREF_LINK'=>'',
		'HREF_ROLE'=>'',
	);
}
?>
