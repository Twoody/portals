<?php
function likes( $names ) {
  $l = count($names);
  if ($l === 0)
    return "no one likes this";
  else if ($l === 1)
    return $names[0] . " likes this";
  else if ($l === 2){
    $r = $names[0] . " and " .$names[1]. " like this";
    return $r;
  }
  else if ( $l === 3 ){
    $r = $names[0] . ", " . $names[1] . " and " . $names[2];
    $r .= " like this";
    return $r;
  }
  else{
    $diff = $l - 2;
    $r = $names[0] . ", " . $names[1] . " and " . $diff . " other";
    if( $diff !== 1 )
      $r .= "s";
    $r .= " like this";
    return $r;
  }
}
?>
