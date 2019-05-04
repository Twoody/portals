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
require_once($PATHS['LIBPATH_FA']);
require_once($PATHS['LIBPATH_DB_HELPER']);

$CONFIG	= get_config($ROOT);
$body		= "";
$TABLE_ID = "real_time";

	
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['DISPLAY_HEADER']			= FALSE;
$CONFIG['TITLE']						= "SQL Experience";
$CONFIG['ACTION_ADMIN_VIEWPORT']	= $PATHS["ADMIN_VIEWPORT"];	
$CONFIG['RESPONSE_CONTAINER'] 	= "\n<div class=\"container-fluid pr-3 pl-3 m-0\">";
$CONFIG['RESPONSE_ROW']				= "\n\t<div class=\"row pl-3 pr-3 m-0\">";
$CONFIG['CUSTOM_STYLES'] .= "\n<style>";
$CONFIG['CUSTOM_STYLES'] .= "\n\t.sticky{position: sticky; top: 0;}"; 
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting:after,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting:before,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_asc:after,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_asc:before,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_asc_disabled:after,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_asc_disabled:before,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_desc:after,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_desc:before,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_desc_disabled:after,";
$CONFIG['CUSTOM_STYLES'] .= "\n	table.dataTable thead .sorting_desc_disabled:before { bottom: .5em; }";
$CONFIG['CUSTOM_STYLES'] .= "\n</style>";


$CONFIG['CUSTOM_SCRIPTS'] .= "\n<script>";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n$(document).ready(function(){";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n$('#$TABLE_ID').DataTable({";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n\"order\": [[ 1, \"id\" ]]";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n});";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n	$('.dataTables_length').addClass('bs-select');";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n});";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n</script>";

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
	$prev_query = $_SESSION['PREV_QUERY'];
	if(isset($_GET['is_deleting'])){
		$is_deleting	= TRUE;
		$delete_val		= $_GET['delete_val'];
		$delete_table	= $_GET['delete_table'];
		$delete_key		= $_GET['delete_key'];
		$delete_sql		= "DELETE FROM ".$delete_table." WHERE ".$delete_key."=".$delete_val;
		$delete_where  = $delete_key."=".$delete_val;
		if($delete_table === "users"){
			$_CUR_DB = $CONFIG['CUR_DB'];
			$CONFIG['CUR_DB'] = $CONFIG['DBPATH_USERS'];
			$res = delete_row($delete_table, $delete_where, $CONFIG);
			$CONFIG['CUR_DB'] = $_CUR_DB;
		}
		else
			$res = delete_row($delete_table, $delete_where, $CONFIG);


		//TODO: Make toast of deleted record;

		$CONFIG['BODY'] .= $CONFIG['RESPONSE_CONTAINER'];
		$CONFIG['BODY'] .= $CONFIG['RESPONSE_ROW'];
		$CONFIG['BODY'] .= "\n\t\t\t<div class=\"col-12 bg-info\">";
		$CONFIG['BODY'] .= "\n\t\t\t\tDELETE Query:`" . $delete_sql . "`";
		$CONFIG['BODY'] .= "\n\t\t\t</div>";
		$CONFIG['BODY'] .= "\n\t\t</div><!-- END CONTAINER -->";
	
	}
	if(isset($_POST['form_submit']) || $is_deleting){
		//Parse apart query;
		if (isset($_POST['form_submit']))
			$query	  = $_POST["query"];
		else
			$query	  = $prev_query;
		$_SESSION['PREV_QUERY'] = $query;
		$CUR_TABLE = parse_from($query);
		if(!$CUR_TABLE){
			$CUR_TABLE = "users";
		}
		$CONFIG = display_admin_viewport_form($CONFIG);
		$CONFIG['BODY'] .= "\n<hr>";
		$CONFIG['BODY'] .= $CONFIG['RESPONSE_CONTAINER'];
		$CONFIG['BODY'] .= $CONFIG['RESPONSE_ROW'];
		$CONFIG['BODY'] .= "\n\t\t\t<div class=\"col-12 bg-info\">";
		$CONFIG['BODY'] .= "\n\t\t\t\tPrevious Query:`" . $query . "`";
		$CONFIG['BODY'] .= "\n\t\t\t</div>";
		$CONFIG['BODY'] .= "\n\t\t</div><!-- END CONTAINER -->";
		$CONFIG['BODY'] .= "\n\t\t<hr>";
		$CONFIG['BODY'] .= $CONFIG['RESPONSE_CONTAINER'];

		//Get results of query;
		$dbpath	= $PATHS['DB_USERS'];
		$db		= new SQLite3($dbpath);
		$prepare = $db->prepare($query);
		$table   = "";
		if ($prepare){
			$result	= $prepare->execute();
			$headers	= Array();
			if($result && $result->numColumns()){
				$header  = "";
				$footer	= "";
				$table .= "\n\t<table id=\"".$TABLE_ID."\" class=\"table table-striped table-bordered\" ";
				$table .= "cellspacing=\"\" width=\"100%\" role=\"grid\">";
				$table .= "\n\t\t<thead>";
				while ($row = $result->fetchArray(SQLITE3_ASSOC)){
					$header .= "\n\t\t\t<tr role=\"row\">";
					$footer .= "\n\t\t\t<tr>";
					$row_keys = array_keys($row);
					for($i=0; $i<count($row_keys); $i++){
						 $row_key = $row_keys[$i];;
						array_push($headers, $row_key);
						$header .= "\n\t\t\t\t<th class=\"sorting\">";
						$header .= "\n\t\t\t\t\t".$row_key;
						$header .= "\n\t\t\t\t</th>";
						$footer .= "\n\t\t\t\t<th>";
						$footer .= "\n\t\t\t\t\t".$row_key;
						$footer .= "\n\t\t\t\t</th>";
					}
					$header .= "\n\t\t\t</tr>";
					break;
				}
				$table .= $header;
				$table .= "\n\t\t</thead>";
				$result->reset();
				$table .= "\n\t\t<tbody>";
				$is_odd = TRUE;
				$is_first_row = TRUE;
				while ($row = $result->fetchArray(SQLITE3_ASSOC)){
					$table .= "\n\t\t\t<tr role=\"row\" class=\"";
					if ($is_odd)
						$table .= "odd ";
					else
						$table .= "even ";
					if ($is_first_row)
						$table .= "first ";
					$table .= "\">"; //Closing `class`
					$row_keys = array_keys($row);
					$is_first_col = TRUE;
					foreach($row_keys as $row_key){
						$table .= "\n\t\t\t\t<td>";
						if ($is_first_col){
							$dHref = $PATHS['ADMIN_VIEWPORT']."?delete_val=".$row[$row_key]."&delete_table=".$CUR_TABLE;
							$dHref .= "&delete_key=".$row_key."&is_deleting=TRUE";
							$table .= "\n<a href=\"".$dHref."\" title=\"Delete Entry\" style=\"color:black\">";
							$table .= make_font_awesome_stack(Array(
								'backdrop-google fas fa-square',
								'fas fa-tw fa-trash'), $CONFIG);
							$table .= "\n</a>";
						}
						$table .= "".$row[$row_key];
						$table .= "</td>";
						$is_first_col = FALSE;
					}
					$table .= "\n\t\t\t</tr>";
					$is_first_row = FALSE;
				}
				$table .= "\n\t\t</tbody>";
		 		$table .= "<tfoot>";
				$table .= $header;
		 		$table .= "</tfoot>";
				$table .= "\n\t</table>";
				$CONFIG['BODY'] .= $table;
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
