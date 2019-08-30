<?php
function getAllCombinations($in, $minLength = 1, $max = 2000) {
    $count = count($in);
    $members = pow(2, $count);
    $return = array();
    for($i = 0; $i < $members; $i ++) {
        $b = sprintf("%0" . $count . "b", $i);
        $out = array();
        for($j = 0; $j < $count; $j ++) {
            $b{$j} == '1' and $out[] = $in[$j];
        }
        count($out) >= $minLength && count($out) <= $max and $return[] = $out;
        }
    return $return;
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
  $lsum    = null;
  $ns      = getAllCombinations($ls, $k, $k);
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
/**************************************************/
/*
Notice below and in the tests that we are able to use
the $max and $minLength in getAllCombinations() to distinguish
between the tests' accepting larger or smaller sets
of destinations;
*/
/**************************************************/
$distances = array(74, 40, 20);
$output = getAllCombinations($distances, 2);
//var_dump($output);
$output = chooseBestSum(75, 2, $distances);
var_dump($output);
?>
