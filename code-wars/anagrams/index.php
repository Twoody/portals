<?php
function anagrams(string $word, array $words, bool $isVerbose=FALSE): array {
  // Your code here
  $l1  = strlen($word);
  $ret = [];
  if( $isVerbose === TRUE )
    echo "WORD COUNT: " . $l1 . "\n";
  for ($i=0; $i<count($words); $i++){
    $cur = $words[$i];
    $isAppending = TRUE;
    if ( strlen($cur) !== $l1 ){
      if( $isVerbose === TRUE )
        echo "SKIPPING: " . $cur + "\n";
      continue;
    }
    $lcur = str_split($cur);
    for($j=0; $j<$l1; $j++){
      $toFind = $word[$j];
      $key    = array_search($toFind, $lcur);
      if ($key !== FALSE) {
          unset($lcur[$key]);
          if ($isVerbose === TRUE){
            echo "\tNEST".$j.": \n";
            var_dump($lcur);
          }
      }
      else{
        $isAppending = FALSE;
        if ($isVerbose === TRUE)
          echo "BREAKING\n";
        break;
      }
    }//end j-for
    if($isAppending === TRUE && count($lcur) === 0){
      array_push($ret, $cur);
    }
    else if($isVerbose === TRUE ){
      echo "isAppending: " . $isAppending . "\n";
      var_dump($lcur);
      echo "\n";
    }
  }//end i-for
  return $ret;
}//end anagrams

/**********************************************************************
Test cases below:
To Run:
	cd ~/.../code-wars/anagarms/
	php index.php
**********************************************************************/

$passes = 0;
$total  = 1;
if (['a'] === anagrams('a', ['a', 'b', 'c', 'd'])){
	$passes += 1;
}
else
	echo "FAILED TEST 1\n";

$total  += 1;
if( ['carer', 'arcre', 'carre'] === anagrams('racer', ['carer', 'arcre', 'carre', 'racrs', 'racers', 'arceer', 'raccer', 'carrer', 'cerarr']) ){
	$passes += 1;
}
else{
	echo "FAILED TEST 2\n";
	var_dump(anagrams('racer', ['carer', 'arcre', 'carre', 'racrs', 'racers', 'arceer', 'raccer', 'carrer', 'cerarr'], TRUE));
}

$total  += 1;
if (['aabb', 'bbaa'] === anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada'])){
	$passes += 1;
}
else
	echo "FAILED TEST 3\n";

$total  += 1;
if (['carer', 'racer'] === anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer'])){
	$passes += 1;
}
else
	echo "FAILED TEST 4\n";

$total  += 1;
if ([] === anagrams('laser', ['lazing', 'lazy',  'lacer'])){
	$passes += 1;
}
else
	echo "FAILED TEST 5\n";

echo $passes . " OUT OF " . $total . " TESTS PASSED\n";
?>
