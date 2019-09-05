<?php
function camel_case(string $s): string {
	// Your code here
	$items = explode(" ", $s);
	$r = "";
	for ($i=0; $i<count($items); $i++){
		$r .= ucfirst(strtolower($items[$i]));
	}//end i-for
	return $r;
}

$out1 = camel_case("test case");

echo $out1 . " === \"TestCase\"\n";
?>
