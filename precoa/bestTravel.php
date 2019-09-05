<?php
function getAllCombinations($in, $minLength = 1, $max = 2000) {
	$count	= count($in);
	$members	= pow(2, $count);
	$ret		= array();
	for($i=0; $i<$members; $i++){
		$b		= sprintf("%0".$count."b", $i);	//Build out binary representation
		$out	= [];
		for($j=0; $j<$count; $j++){
			if($b{$j} === '1'){
				array_push($out, $in[$j]);
				//$out[] = $in[$j];
			}
		}//end j-for
		if(count($out) >= $minLength && count($out) <= $max){
			array_push($ret, $out);
			//$ret[] = $out;
		}
	}//end i-for
	return $ret;
}//end getAllCombinations()
function chooseBestSum($t, $k, $ls) {
	/*
	Input:
		$t is johns mile limit
		$k is johns town limit
		$ls is arr of just distances
	Output:
		return larget int of miles obtainable
		If no distance match, return null
	*/
	$lsum	= null;
	$ns	  = getAllCombinations($ls, $k, $k);
	for ($i=0; $i<count($ns); $i++){
		$combination = $ns[$i];
		$sum = array_sum($combination);
		if($sum > $lsum && $sum <= $t){
			$lsum = $sum;
			if($lsum === $t)
				return $lsum;
		}
	}//end i-for
	return $lsum;
}//end chooseBestSum()

/*****************************************************
Notice below and in the tests that we are able to use
	the $max and $minLength in getAllCombinations() to 
	distinguish between the tests' accepting larger or 
	smaller sets of destinations;
*****************************************************/
$passes	= 0;
$total	= 3;
$dist1 	= array(74, 40, 20, 30, 22, 44, 50);
$out1		= chooseBestSum(75, 2, $dist1);
$out2		= chooseBestSum(73, 3, $dist1);
$out3		= chooseBestSum(51, 1, $dist1);
if (74 === $out1)
	$passes++;
if (72 === $out2)
	$passes++;
if (50 === $out3)
	$passes++;

echo $passes . " OUT OF " . $total . " CASES PASSED\n";
?>
