<?php
function count_smileys($arr): int {
  $r            = 0;
  $l            = count($arr);
  $validEyes    = [":", ";"];
  $validNoses   = ["-", "~"];
  $validMouths  = [")", "D"];
  for($i=0; $i<$l; $i++){
    $t = str_split( $arr[$i] );
    $onMouth     = FALSE;
    $didNose     = FALSE;
    $onEyes      = TRUE;
    for ($j=0; $j<count($t); $j++ ){
      $c = $t[$j];
      if( $onEyes ){
        if( in_array($c, $validEyes) === TRUE ){
          $onEyes  = FALSE;
          $didNose = FALSE;
          $onMouth = TRUE;
        }
        else{
          break;
        }
      }
      elseif( $onMouth ){
        if( $didNose === FALSE && in_array($c, $validNoses) ){
          $didNose = TRUE;
          continue;
        }
        else{
          if( in_array($c, $validMouths) )
            $r += 1;
          $onMouth = FALSE;
          $onEyes  = TRUE;
          $didNose = FALSE;
        }
        break;
      }
      else
        echo "ERROR: broke out\n";
    }//end j-for
  }//end i-for
  return $r;
}
$out1 = count_smileys( [] );
$out2 = count_smileys( [':)'] );
$out3 = count_smileys( [': )'] );
echo $out1 . " == 0\n";
echo $out2 . " == 1\n";
echo $out3 . " == 0\n";
?>
