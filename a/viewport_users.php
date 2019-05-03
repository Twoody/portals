<?php
session_start();
?>
<!doctype html>
<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: 
   Date:    2019-04-22

USAGE:
	First Check for compilation errors:
		php index.php
	Second, host:
		With PHP:
			clear & php -S localhost:8000 templates/login.php
		With APACHE:
			sudo apachectl start

Purpose:
    Fun way to show that page was not found;

Links:
	https://www.w3schools.com/bootstrap4/bootstrap_carousel.asp
******************************************************************************/

$ROOT = "..";
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);
$PATHS	= get_paths($ROOT);
$home		= $PATHS['NAV_HOME'];
require_once($PATHS['TEMPLATES_B']);
require_once($PATHS['FORMS_ADMIN_VIEWPORT']);

$CONFIG	= get_config($ROOT);
$body		= "";
	
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['DISPLAY_HEADER']			= FALSE;
$CONFIG['TITLE']						= "SQL Experience";
$CONFIG['ACTION_ADMIN_VIEWPORT']	= $PATHS["ADMIN_VIEWPORT"];	
$CONFIG['RESPONSE_CONTAINER'] 	= "\n<div class=\"container-fluid pr-3 pl-3 m-0\">";
$CONFIG['RESPONSE_ROW']				= "\n\t<div class=\"row pl-3 pr-3 m-0\">";
$CONFIG['CUSTOM_STYLES'] .= "\n<style>";
$CONFIG['CUSTOM_STYLES'] .= "\n\t.sticky{position: sticky; top: 0;}"; 
$CONFIG['CUSTOM_STYLES'] .= "\n</style>";

echo '<!-- RUNNING '.$PATHS['ADMIN_VIEWPORT'].' -->';

if (!is_logged_in($CONFIG)){
	$CONFIG['BODY'] .= $STRINGS['USER_NOT_LOGGED_IN'];
}
else if($_SESSION['alevel'] !== 'admin'){
	$CONFIG['BODY'] .= $STRINGS['USER_INVALID_PERMISSION'];
	$CONFIG['BODY'] .= $CONFIG['RESPONSE_CONTAINER'];
	$CONFIG['BODY'] .= $CONFIG['RESPONSE_ROW'];
	$CONFIG['BODY'] .= "\n\t\t\t\t<div class=\"col-12 bg-info\">";
	$CONFIG['BODY'] .= "You are logged in as a " . $_SESSION['alevel'] . ".";
	$CONFIG['BODY'] .= "\n\t\t\t\t</div><!-- END COL -->";
	$CONFIG['BODY'] .= "\n\t\t\t</div><!-- END ROW -->";
	$CONFIG['BODY'] .= "\n\t\t</div><!-- End container -->";
}
else{
	//Admin level access
	if(isset($_POST['form_submit'])){
		//Parse apart query;
		$query	= $_POST["query"];
		$CONFIG = display_admin_viewport_form($CONFIG);
		$CONFIG['BODY'] .= "\n<hr>";
		$CONFIG['BODY'] .= $CONFIG['RESPONSE_CONTAINER'];
		$CONFIG['BODY'] .= $CONFIG['RESPONSE_ROW'];
		$CONFIG['BODY'] .= "\n\t\t\t<div class=\"col-12 bg-info\">";
		$CONFIG['BODY'] .= "\n\t\t\t\tPrevious Query:`" . $query . "`";
		$CONFIG['BODY'] .= "\n\t\t\t</div>";
		$CONFIG['BODY'] .= "\n\t\t<hr>";

		//Get results of query;
		$dbpath	= $PATHS['DB_USERS'];
		$db		= new SQLite3($dbpath);
		$prepare = $db->prepare($query);
		if ($prepare){
			$result = $prepare->execute();
			$rows = $result->fetchArray();
			if($rows && count($rows) >0){
				foreach($rows as $row){
					$CONFIG['BODY'] .= var_dump($row);
				}
			}
			else{
				$CONFIG['BODY'] .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
				$CONFIG['BODY'] .= "\n\t\t\t\tNO RESULTS;";
				$CONFIG['BODY'] .= "\n\t</div>";
			}
		}
		else{
			$CONFIG['BODY'] .= "\n\t\t\t<div class=\"col-12 bg-warning\">";
			$CONFIG['BODY'] .= "\n\t\t\t\tBAD QUERY;";
			$CONFIG['BODY'] .= "\n\t</div>";
		}
		$db->close();												// CLOSING DB;

			//TODO: Make table of results;
		$CONFIG['BODY'] .= "\n\t\t</div><!-- END ROW -->";
		$CONFIG['BODY'] .= "\n\t</div><!-- END CONTAINER -->";
	}
	else{
		//Display regurlar query form;
		$CONFIG = display_admin_viewport_form($CONFIG);
	}
}

$CONFIG['BODY'] .= $body;
echo template_b($CONFIG, $PATHS) . "\n";

?>
