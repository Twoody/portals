<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: github.com/twoody/phpTests/utils/html.php
   Date:    20181118

USAGE:
   In php, put at the head of function:
      require('/path/here/html.php');

Purpose:
    General Util Library to ensure we have minimal errors while outputting HTML.

******************************************************************************/
if (php_sapi_name() === "cli"){
	if($CONFIG === Null){
		if ($ROOT === Null)
			$ROOT = ".";
		require_once($ROOT . '/config/paths.php');
		$PATHS = get_paths($ROOT);
		require_once($PATHS['SETTINGS_PATH']);
		$CONFIG = get_config();
	}
	else
		$PATHS = get_paths($CONFIG['ROOT']);
	$ROOT = $CONFIG['ROOT'];
}
echo "\n<!-- ".$PATHS['LIBPATH_HTML']." imported -->\n";
require_once($PATHS['LIBPATH_AUTH_USER']);

function alert($msg){
	$html =  "\n\t\t<script>";
	$html .= "\n\t\t\talert(JSON.stringify(".$msg."));";
	$html .= "\n\t\t</script>";
	return $html;
}
function clog($msg){
	$html =  "\n\t\t<script>";
	$html .= "\n\t\t\tconsole.log(";
	$html .= "JSON.stringify(";
	$html .= $msg."));";
	$html .= "\n\t\t</script>";
	return $html;
}
function get_css($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$ROOT = $CONFIG['ROOT'];
	$s = "";
	if($CONFIG['HAS_BOOTSTRAP'] || $CONFIG['HAS_POPPER'] || $CONFIG['HAS_JQUERY'] )
		$s .= get_bootstrap_css($CONFIG);
	if($CONFIG['HAS_DATATABLES'] || $CONFIG['HAS_DATATABLES_JQUERY'] )
		$s .= get_datatables_css($CONFIG);
	if($CONFIG['HAS_FONT_AWESOME'])
		$s .= get_font_awesome_css($CONFIG);
	$s .= $CONFIG['CUSTOM_STYLES'];
	return $s;
}
function get_footer($CONFIG=Null){
	if ($CONFIG === Null)
		$CONFIG = get_config();
	$ROOT = $CONFIG['ROOT'];
	$CONFIG['FA_STACK_SIZE'] = 'fa-md';
	$col1 = Array(
		Array(	'href'=>$CONFIG['LINK_GMAIL'],
					'icon'=>make_font_awesome_stack(Array(
						'backdrop-google fas fa-circle',
						'fab fa-fw fa-google'
					),$CONFIG),
		),
		Array(	'href'=>$CONFIG['LINK_STACKOVERFLOW'],
					'icon'=>make_font_awesome_stack(Array(
						'backdrop-stack-overflow fas fa-circle',
						'fab fa-tw fa-stack-overflow'
					),$CONFIG),
		),
		Array(	'href'=>$CONFIG['LINK_ANDROID'],
					'icon'=>make_font_awesome_stack(Array(
						'backdrop-android fas fa-circle',
						'fab fa-tw fa-android'
					),$CONFIG),
		),
	);
	$col2 = Array(
		Array(	'href' => $CONFIG['LINK_INSTA'],
					'icon' => make_font_awesome_stack(Array(
						'backdrop-instagram fas fa-circle',
						'fab fa-fw fa-instagram'
					),$CONFIG),
		),
		Array(	'href' => $CONFIG['LINK_STRAVA'] ,
					'icon' => make_font_awesome_stack(Array(
						'backdrop-strava fas fa-circle',
						'fab fa-tw fa-strava'
					),$CONFIG),
		),
		Array(	'href' => $CONFIG['LINK_GITHUB'],
					'icon' => make_font_awesome_stack(Array(
						'backdrop-github fas fa-circle',
						'fab fa-tw fa-github'
					),$CONFIG),
		),
	);
	$col3 = Array(
		Array(	'href' => $CONFIG['LINK_FACEBOOK'] ,
					'icon' => make_font_awesome_stack(Array(
						'backdrop-facebook fas fa-circle',
						'fab fa-fw fa-facebook'
					),$CONFIG),
		),
		Array(	'href'=> $CONFIG['LINK_TWITTER'] ,
					'icon'=> make_font_awesome_stack(Array(
						'backdrop-twitter fas fa-circle',
						'fab fa-tw fa-twitter'
					),$CONFIG),
		),
		Array(	'href' => $CONFIG['LINK_LINKEDIN'],
					'icon' => make_font_awesome_stack(Array(
						'backdrop-linkedin fas fa-circle',
						'fab fa-tw fa-linkedin'
					),$CONFIG),
		),
	);
	$CONFIG['FA_STACK_SIZE'] = 'fa-2x';

	$html = "";
	$html .= "\n\t\t<footer class=\"mt-5 ";
	if ($CONFIG['FOOTER_IS_STICKY'] === TRUE)
		$html .= " fixed-bottom ";
	$html .= "\">";
	if ($CONFIG['FOOTER_IS_STICKY'] === False){
		//$html .= "\n\t\t\t<div class=\"container-fluid bg-faded mt-5\">";
		$html .= "\n\t\t\t<div class=\"container-fluid bg-faded mt-4\">";
		$html .= "\n\t\t\t\t<div class=\"container\">";
		$html .= "\n\t\t\t\t\t<div class=\"row py-3 justify-content-between align-items-center\">";
		$html .= "\n\t\t\t\t\t<!-- footer column 1 start -->";
		$html .= "\n\t\t\t\t\t\t<div class=\"col-md-4\">";
		$html .= "\n\t\t\t\t\t\t<!-- row start -->";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"row py-3  d-none d-md-block\">";
		$html .= "\n\t\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t<a href=\"" . $CONFIG['LINK_TWITTER'] . "\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t\t";
		$html .= make_font_awesome_stack(Array(
					'backdrop-footer fas fa-circle',
					'fab fa-footer fa-twitter'
					),$CONFIG);
		$html .= "\n\t\t\t\t\t\t\t\t\t</a>";
		$html .= "\n\t\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t<h4>Tweets</h4>";
		$html .= "\n\t\t\t\t\t\t\t\t\tEmbed here";
		$html .= "\n\t\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t\t<!-- row end -->";
		$html .= "\n\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t<!-- footer column 1 end -->";			//End footer col 1
		$html .= "\n\t\t\t\t\t\t<!-- footer column 2 start -->";
		$html .= "\n\t\t\t\t\t\t<div class=\"col-md-4\">";
		$html .= "\n\t\t\t\t\t\t<!-- row start -->";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"row py-2  d-none d-md-block\">";
		$html .= "\n\t\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t<a href=\"#\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t";
		$html .= make_font_awesome_stack(Array(
					'backdrop-footer fas fa-circle',
					'fas fa-fw fa-footer fa-address-card',
					),$CONFIG);
		$html .= "\n\t\t\t\t\t\t\t\t</a>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t<h4>Contact us</h4>";
		$html .= "\n\t\t\t\t\t\t\t\t<p>Why not?</p>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t<!-- row end -->";
		$html .= "\n\t\t\t\t\t\t<!-- row start -->";
		$html .= "\n\t\t\t\t\t\t<div class=\"row py-2 d-none d-md-block\">";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"col text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t<a href=\"#\">";
		$html .= "\n\t\t\t\t\t\t\t\t\t";
		$html .= make_font_awesome_stack(Array(
					'backdrop-footer fas fa-circle',
					'fas fa-fw fa-footer fa-laptop',
					),$CONFIG);
		$html .= "\n\t\t\t\t\t\t\t\t</a>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t<h4>Cookie policy</h4>";
		$html .= "\n\t\t\t\t\t\t\t\t<p class=\" \">We use <a class=\" \" href=\"/# \">cookies </a></p>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t<!-- row end -->";
		$html .= "\n\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t<!-- footer column 2 end -->";
		$html .= "\n\t\t\t\t\t<!-- footer column 3 start -->";
		$html .= "\n\t\t\t\t\t<div class=\"col-md-4\">";
		$html .= "\n\t\t\t\t\t\t<!-- row starting  -->";
		$html .= "\n\t\t\t\t\t\t<div class=\"row py-2 d-none d-md-block\">";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t<a href=\"# \">";
		$html .= make_font_awesome_stack(Array(
					'backdrop-footer fas fa-circle',
					'fas fa-fw fa-footer fa-file-pdf-o',
					),$CONFIG);
		$html .= "\n\t\t\t\t\t\t\t\t</a>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t<h4>Download pdf</h4>";
		$html .= "\n\t\t\t\t\t\t\t\t<p> You like print?</a></p>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t<!-- row ended -->";
		$html .= "\n\t\t\t\t\t\t<!-- row starting  -->";
		$html .= "\n\t\t\t\t\t\t<div class=\"row py-2 d-none d-md-block\">";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t<a href=\"". $CONFIG['LINK_TWITTER'] . "\">";
		$html .= make_font_awesome_stack(Array(
					'backdrop-footer fas fa-circle',
					'fas fa-fw fa-footer fa-info',
					),$CONFIG);
		$html .= "\n\t\t\t\t\t\t\t\t</a>";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t\t<div class=\"col-md-12 text-center\">";
		$html .= "\n\t\t\t\t\t\t\t\t<h4>Info</h4>";
		$html .= "\n\t\t\t\t\t\t\t\tAbout us.";
		$html .= "\n\t\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t\t<!-- row ended -->";
		$html .= "\n\t\t\t\t\t</div>";
		$html .= "\n\t\t\t\t\t<!-- footer column 3 end -->";
		$html .= "\n\t\t\t\t</div>";
		$html .= "\n\t\t\t</div>";
		$html .= "\n\t\t</div>";
	}
	$html .= "\n\t\t\t<div class=\"container-fluid bg-primary p-0 pl-3 pr-3\">";
	$html .= "\n\t\t\t\t<div class=\"container bg-secondary p-0\">";
	$html .= "\n\t\t\t\t\t<div class=\"row py-3 justify-content-between\">";
	$html .= make_footer_bottom_cols($col1, $CONFIG);
	$html .= "\n\t\t\t\t\t\t<!-- End Col 1 -->";
	$html .= make_footer_bottom_cols($col2, $CONFIG);
	$html .= "\n\t\t\t\t\t\t<!-- End Col 2 -->";
	$html .= make_footer_bottom_cols($col3, $CONFIG);
	$html .= "\n\t\t\t\t\t\t<!-- End Col 3 -->";
	$html .= "\n\t\t\t\t\t</div>";
	$html .= "\n\t\t\t\t</div>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</footer>";
	return $html;
}
function get_header($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$ROOT = $CONFIG['ROOT'];
	$s = "";
	$s .= "\n<html lang=\"".$CONFIG['LANG']."\">";
	$s .=	"\n<head>";
	$s .=	"\n\t<!-- Required meta tags -->";
	$s .=	"\n\t<meta charset=\"".$CONFIG['CHAR_SET']."\">";
	$s .=	"\n\t<meta name=\"viewport\" content=\"".$CONFIG['META_CONTENT']."\">";
	$s .= get_css($CONFIG); //<link> elements
	$s .= "";
	$s .=	"\n\t<title>".$CONFIG['TITLE']."</title>";
	$s .=	"\n</head>\n";
	return $s;
}
function get_js($CONFIG=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	$ROOT = $CONFIG['ROOT'];
	$s = "";
	if($CONFIG['HAS_BOOTSTRAP'] || $CONFIG['HAS_POPPER'] || $CONFIG['HAS_JQUERY'] )
		$s .= get_bootstrap_scripts($CONFIG);
	if($CONFIG['HAS_DATATABLES'] || $CONFIG['HAS_DATATABLES_JQUERY'] )
		$s .= get_datatables_scripts($CONFIG);
	if($CONFIG['CUSTOM_SCRIPTS']){
		$s .= "\n\t<!-- Optional JavaScript -->\n";
		$s .= $CONFIG['CUSTOM_SCRIPTS'];

	}
	return $s;
}
function get_nav($CONFIG=Null, $PATHS=Null){
	if($CONFIG === Null)
		$CONFIG	= get_config();
	if($PATHS === Null)
		$PATHS	= get_paths($CONFIG['ROOT']);
	$home			= $PATHS['NAV_HOME'];
	$features	= $PATHS['NAV_DISPLAY_FEATURES'];
	$pricing		= $PATHS['NAV_DISPLAY_PRICING'];
	$settings	= $PATHS['NAV_USER_SETTINGS'];
	$html = "";
	$html .= "\n\t\t<nav class=\"navbar fixed-top navbar-expand-sm navbar-light bg-light pl-3 pr-3 pb-0 pt-0\">";
	$html .= "\n\t\t\t<a class=\"navbar-brand\" href=\"" .$home. "\">";
	$html .= "Portals</a>";
	$html .= "\n\t\t\t<button ";
	$html .= "\n\t\t\t\tclass=\"navbar-toggler\"";
	$html .= "\n\t\t\t\ttype=\"button\"";
	$html .= "\n\t\t\t\tdata-toggle=\"collapse\"";
	$html .= "\n\t\t\t\tdata-target=\"#navbarText\"";
	$html .= "\n\t\t\t\taria-controls=\"navbarText\"";
	$html .= "\n\t\t\t\taria-expanded=\"false\"";
	$html .= "\n\t\t\t\taria-label=\"Toggle navigation\"";
	$html .= "\n\t\t\t>";
	$html .= "\n\t\t\t\t<span class=\"navbar-toggler-icon\"></span>";
	$html .= "\n\t\t\t</button>";
	$html .= "\n\t\t\t<div class=\"collapse navbar-collapse\" id=\"navbarText\">";
	$html .= "\n\t\t\t\t<ul class=\"navbar-nav mr-auto\">";
	$html .= "\n\t\t\t\t\t<li class=\"nav-item active\">";
	$html .= "\n\t\t\t\t\t\t<a class=\"nav-link\" href=\"".$home."\">Home <span class=\"sr-only\">(current)</span></a>";
	$html .= "\n\t\t\t\t\t</li>";
	$html .= "\n\t\t\t\t\t<li class=\"nav-item\">";
	$html .= "\n\t\t\t\t\t\t<a class=\"nav-link\" href=\"".$features."\">Features</a>";
	$html .= "\n\t\t\t\t\t</li>";
	$html .= "\n\t\t\t\t\t<li class=\"nav-item\">";
	$html .= "\n\t\t\t\t\t\t<a class=\"nav-link\" href=\"".$pricing."\">Pricing</a>";
	$html .= "\n\t\t\t\t\t</li>";
	$html .= "\n\t\t\t\t</ul>";
	$html .= "\n\t\t\t\t<span class=\"navbar-text\">";
	if (is_logged_in($CONFIG) === False){
		$html .= "<a href=\"".$PATHS['USER_LOGIN']."\">";
		$html .= "Sign in";
		$html .= "</a>";
		$html .= " or ";
		$html .= "<a href=\"".$PATHS['USER_REGISTER']."\">";
		$html .= "Register now";
		$html .= "</a>";
	}
	else{
		//TODO: HREF to settings;
		$html .= "\n\t\t\t\t\tWelcome, ";
		$html .= $_SESSION['username'];
		$html .= "\n<br/>\n<a class=\"mute\" href=\"".$PATHS['USER_LOGOUT']."\">Logout\n</a>\n";
	}
	$html .= "\n\t\t\t\t</span>";
	$html .= "\n\t\t\t</div>";
	$html .= "\n\t\t</nav>";
	$html .= "\n";
	return $html;
}
function make_css($REL, $LINK, $INTEGRITY="", $ORIGIN=""){
	/* Make a CSS stylesheet to be imported into HTML page */
	$css .= "\n\t<link";
	$css .= "\n\t\trel=\"".$REL."\"";
	$css .= "\n\t\thref=\"".$LINK."\"";
	$css .= "\n\t\tintegrity=\"".$INTEGRITY."\"";
	$css .= "\n\t\tcrossorigin=\"".$ORIGIN."\">";
	$css .= "\n\t</link>";
	return $css;
}
function make_par( $s, $args=null ){
	//Take string `s` and be sure string is properly encapsulated as HTML paragraph
	/*
	if ($args === null)
		$args = new \stdClass;
	$isclass = var_dump(isset($args->{'class'}));
	*/
	$ret = '<p';
	/*
   if ($isclass === true){
		ret .= ' class='.$args->class;
	*/
	$ret .= ">\n";
	$ret .= $s."</p>\n";
	return $ret;
}
function make_script($src, $integrity, $origin){
	/* Make a JS script to be imported into HTML page */
	$s = "";
	$s .= "\n\t<script";
	$s .= "\n\t\tsrc=\"".$src."\"";
	$s .= "\n\t\tintegrity=\"".$integrity."\"";
	$s .= "\n\t\tcrossorigin=\"".$origin."\">";
	$s .= "\n\t</script>";
	return $s;
}
function tab(){
	//Return HTML tab; TODO: param for length of tab;
	return "&nbsp;&nbsp;&nbsp;&nbsp;";
}

?>

