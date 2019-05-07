<?php 
function get_inventory($CONFIG){
	//TODO: Add `where storeid = ?` to query upon adding storeid to the members;
	//TODO:	IF the user is logged in as an owner, then have all their storeid's populated...
	if($PATHS === Null)
		$PATHS = get_paths($CONFIG['ROOT']);
	require_once($PATHS['LIBPATH_DB_HELPER']);

	$MCONFIG = ARRAY(
		'ID' => 'inv_modal',
		'STYLE' => 'color:black;background:transparent;',
		'TITLE' => 'Purchase Item',
		'ITEM'  => $row['name'],
	);
	$table	= '';
	$CONFIG['INV_HAS_COUNTER']	= TRUE;
	$CONFIG['MCONFIG']			= $MCONFIG;
	if(isset($_POST['form_submit']) && ($_SESSION['processed_form'] === FALSE || $_SESSION['processed_form'] === NULL) ){
		//if modal form submitted, update db and refresh this page again...
		$userid		= $_SESSION["userid"];
		$_SESSION["processed_form"] = TRUE;
		$productid	= $_POST["product"];
		$quantity	= $_POST["quantity"];
		$suc = update_cart($userid, $productid, $quantity, $CONFIG);
		if (!$suc)
			$table .= clog("\"ERROR 82393: BAD CART UPDATE\"");
	}
	$table .= $CONFIG['INVENTORY_CONTAINER'];
	$table .= $CONFIG['INVENTORY_ROW'];
	$table .= "\n\t\t\t<div class=\"col-12 bg-info\">";
	$table .= "The start to the table.";
	$table .= "\n\t\t\t</div><!-- END COL -->";
	$table .= "\n\t\t</div><!-- END ROW -->";
	$table .= "\n\t</div><!-- END CONTAINER -->";

	$table .= $CONFIG['INVENTORY_CONTAINER'];
	$table .= $CONFIG['INVENTORY_ROW'];
	$table .=  get_table_from_inventory($CONFIG);
	$table .= "\n\t\t</div><!-- END ROW -->";
	$table .= "\n\t</div><!-- END CONTAINER -->";

	return $table;
}
?>
