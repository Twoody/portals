<?php
$MAP = [1,10,9,12,3,4];
function thirt($n) {
  global $MAP;
  $narr    = null;
  $pre     = null;
  $sum     = null;
  $visited = [];
  $net     = 0;
  while( $pre === null || ($net < 500) ){
    if($pre === null)
      $narr = array_map('intval', str_split($n));
    else
      $narr = array_map('intval', str_split($sum));
    $i   = 0;
    $sum = 0;
    for($j=count($narr)-1; $j>-1; $j--){
      $sum += ($narr[$j] * $MAP[$i]);
      $i += 1;
      if( $i > 5 )
        $i = 0;
    }//end j-for
    if( $pre === $sum )
      break;
    $net +=1;
    $pre  = $sum;
  }//end while
  if($net === 500 )
    echo "WARNING: REACHED NET LIMIT\n";
  return $sum;
}
if(87 === thirt(1234567))
   $out1 = "PASSED 0";
else
   $out1 = "FAILED 0";
echo $out1 . "\n";

if(79 === thirt(8529))
   $out1 = "PASSED 1";
else
   $out1 = "FAILED 1";
echo $out1 . "\n";
if (31 === thirt(85299258))
   $out2 = "PASSED 2";
else
   $out2 = "FAILED 2";
echo $out2 . "\n";

?>
