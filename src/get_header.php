<?
require_once('./config/imports.php');
$TITLE = ""; //TODO: Store title in a pages db;

function get_header(){
	$s = "<!doctype html>";
	$s .= "\n<html lang=\"".$LANG."\">";
	$s .=	"\n<head>";
	$s .=	"\n\t<!-- Required meta tags -->";
	$s .=	"\n\t<meta charset=\"".$CHAR_SET."\">";
	$s .=	"\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">";
	$s .= 

	$s .=	"	<link ";
	$s .=	"		rel="stylesheet" 
	$s .=	"		href= 
	$s .=	"		integrity="" 
	$s .=	"		crossorigin="anonymous">
	$s .=	"	</linka">
	$s .=
	$s .=	"\n\t<title>".$TITLE."</title>";
	$s .=	"\n</head>";
}
function get_footer(){
	</body>
	</html>
}
?>
