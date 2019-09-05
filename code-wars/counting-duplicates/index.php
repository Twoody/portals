<?php
function duplicateCount($text) {
	$ret	= 0;
	$a		= [];
	$t		= str_split( strtolower( $text ) );
	$l		= count($t);
	for($i=0; $i<$l; $i++){
		$c = $t[$i];
		if ( array_key_exists($c, $t) ){
			if( $t[$c] === 1 )
				$ret += 1;
			$t[$c] += 1;
		}
		else{
			$t[$c] = 1;
		}
	}//end i-for
	return $ret;
}

// PHPUnit Test Examples:
assert(0 == duplicateCount("") );
assert(0 == duplicateCount("abcde") );
assert(2 == duplicateCount("aabbcde") );
assert(2 == duplicateCount("aabBcde") );	//should ignore case
assert(1 == duplicateCount("Indivisibility") );
//Characters may not be adjacent
assert(2 == duplicateCount("Indivisibilities"));

?>
