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

$ROOT = "../..";
require_once($ROOT.'/config/imports.php');
make_imports($ROOT);
$PATHS	= get_paths($ROOT);
$home		= $PATHS['NAV_HOME'];
require_once($PATHS['TEMPLATES_B']);
require_once($PATHS['FORMS_ADMIN_VIEWPORT']);
require_once($PATHS['LIBPATH_FA']);
require_once($PATHS['LIBPATH_DB_HELPER']);

$CONFIG	= get_config($ROOT);
$CONFIG['TABLE_ID'] = "real_time";

	
/* ----- ----- GENERAL CHANGES BEFORE SECOND IMPORT ----- ----- */
$CONFIG['DISPLAY_HEADER']			= FALSE;
$CONFIG['TITLE']						= "SQL Experience";
$CONFIG['ACTION_ADMIN_VIEWPORT']	= $PATHS["ADMIN_VIEWPORT"];	

$CONFIG['CUSTOM_SCRIPTS'] .= "\n<script>";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n$(document).ready(function(){";
$CONFIG['CUSTOM_SCRIPTS'] .= "\n$('#".$CONFIG['TABLE_ID']."').DataTable({";
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
	$CONFIG['BODY'] .= $CONFIG['GEN_CONTAINER'];
	$CONFIG['BODY'] .= $CONFIG['GEN_ROW'];
	$CONFIG['BODY'] .= $CONFIG['GEN_INFO'];
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
		$delete_where  = $delete_key."=\"".$delete_val."\"";
		$delete_sql		= "DELETE FROM " . $delete_table . " WHERE 1=1 AND " . $delete_where;
		if($delete_table === "users"){
			$CONFIG['CUR_DB'] = $CONFIG['DBPATH_USERS'];
			$res = delete_row($delete_table, $delete_where, $CONFIG);
		}
		else
			$res = delete_row($delete_table, $delete_where, $CONFIG);


		//TODO: Make toast of deleted record;

		$CONFIG['BODY'] .= $CONFIG['GEN_CONTAINER'];
		$CONFIG['BODY'] .= $CONFIG['GEN_ROW'];
		$CONFIG['BODY'] .= $CONFIG['GEN_INFO'];
		$CONFIG['BODY'] .= "\n\t\t\t\tDELETE Query:`" . $delete_sql . "`";
		$CONFIG['BODY'] .= "\n\t\t\t</div>";
		$CONFIG['BODY'] .= "\n\t\t</div><!-- END CONTAINER -->";
		$CONFIG['BODY'] .= "\n\t\t</div><!-- END CONTAINER -->";
	
	}
	if(isset($_POST['form_submit']) || $is_deleting){
		//Parse apart query;
		if (isset($_POST['form_submit']))
			$query	  = $_POST["query"];
		else
			$query	  = $prev_query;
		$query = sanitize_input($query);
		$_SESSION['PREV_QUERY'] = $query;
		$CONFIG = display_admin_viewport_form($CONFIG);
		$CONFIG['BODY'] .= "\n<hr>";
		$CONFIG['BODY'] .= $CONFIG['GEN_CONTAINER'];
		$CONFIG['BODY'] .= $CONFIG['GEN_ROW'];
		$CONFIG['BODY'] .= $CONFIG['GEN_INFO'];
		$CONFIG['BODY'] .= "\n\t\t\t\tPrevious Query:`" . $query . "`";
		$CONFIG['BODY'] .= "\n\t\t\t</div>";
		$CONFIG['BODY'] .= "\n\t\t</div><!-- END ROW -->";
		$CONFIG['BODY'] .= "\n\t</div><!-- END CONTAINER -->";
		$CONFIG['BODY'] .= "\n\t<hr>";

		//Get results of query;
		$dbpath						= $PATHS['DB_USERS'];
		$CONFIG['QUERY_PAGE']	= $PATHS['ADMIN_VIEWPORT'];
		$CONFIG['BODY'] .= $CONFIG['GEN_CONTAINER'];
		$CONFIG['BODY'] .= get_table_from_owner_query($dbpath, $query, $CONFIG);
		$CONFIG['BODY'] .= "\n\t</div><!-- END CONTAINER -->";
	}
	else{
		//Display regurlar query form;
		$CONFIG = display_admin_viewport_form($CONFIG);
	}
}

echo template_b($CONFIG, $PATHS) . "\n";
?>
