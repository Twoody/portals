<?php 
function html_get_inventory($CONFIG){
	//TODO: Add `where storeid = ?` to query upon adding storeid to the members;
	//TODO:	IF the user is logged in as an owner, then have all their storeid's populated...
	if($PATHS === Null)
		$PATHS = get_paths($CONFIG['ROOT']);
	require_once($PATHS['LIBPATH_DB_HELPER']);

	$MCONFIG = ARRAY(
		'ID'		=> 'inv_modal',
		'STYLE'	=> 'color:black;background:transparent;',
		'TITLE'	=> 'Purchase Item',
		'ITEM'	=> $row['name'],
	);
	$table					= '';
	if(isset($_POST['form_submit'])){
		//if modal form submitted, update db and refresh this page again...
		$userid			= get_user_id($CONFIG);
		$productid		= sanitize_input( $_POST["productid"] );
		$product_name	= sanitize_input( $_POST["product_name"] );
		$quantity		= sanitize_input( $_POST["quantity"] );
		$suc 				= update_cart($userid, $productid, $quantity, $CONFIG);
		if (!$suc)
			$table .= clog("\"ERROR 82393: BAD CART UPDATE\"");
	}
	$col_0			= make_gen_info("The start to the table.", $CONFIG);
	$row_0			= make_gen_row($col_0, $CONFIG);
	$container_0	= make_gen_container($row_0, $CONFIG);

	$col_1			= make_gen_col(
								get_table_from_inventory($MCONFIG, $CONFIG), 
								$CONFIG
							);
	$row_1			= make_gen_row($col_1, $CONFIG);
	$container_1	= make_gen_container($row_1, $CONFIG);

	$table .= $container_0;
	$table .= $container_1;
	return $table;
}
?>
