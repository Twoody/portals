<?php
/*******************************************************************************
Author:
	Tanner.L.Woody@gmail.com
	2019-05-27
	Memorial Day
TODO:
	Pull over general dropdown items in dd menu, too;
Usage:
	require($PATHS['FEATURES_DD_TEXT']);
	$dd_text	= get_dropdown_texts($CONFIG);

Purpose:	
	Key value pair to load content;
*******************************************************************************/
function get_f_text($CONFIG){
	$ret = 'Not registerd yet...';
	$ret .= "Pleaes understand that there are 10+ items above that we need to process and make into their own select text and mini-blog post. " ;
	$ret .= "We will soon have all of the mappings put here with specifics, until then, enjoy the fun \$_GET seen here!";
	return $ret;
}
function get_dropdown_text($key){
	//Return the text associated with key
	$items	= get_dropdown_items($CONFIG);
	$text		= "";
	for ($i=0; $i<count($items); $i++){
		$item = $items[$i];
		if ($item['code'] === $key){
			$text	= $item['funct'];
			break;
		}
	}//end i-for
	return $text;
}
function is_key_in_items($key){
	$items	= get_dropdown_items($CONFIG);
	for ($i=0; $i<count($items); $i++){
		$item = $items[$i];
		if ($item['code'] === $key)
			return True;
	}//end i-for
	return False;
}
function get_dropdown_items($CONFIG){
	$foo	= Array(
		1=>Array(
				'title'=>'Reset',  			
				'code'=>'reset',                              			
	 			'funct'=>make_lorem_ipsum(1, $CONFIG),
		),
	 	2=>Array(
	     		'title'=>'Cloud Computing', 			
				'code'=>'cloud_computing',
				'funct'=>get_f_text($CONFIG),
		),
	 	3=>Array(
	     		'title'=>'Cookies', 			
				'code'=>'cookies',                            		
	 			'funct'=>get_f_text($CONFIG),
		),
	 	4=>Array(
	     		'title'=>'Database Management',  			
				'code'=>'database_management',                		
	 			'funct'=>get_f_text($CONFIG),
		),
	 	5=>Array(
	     		'title'=>'Demos and Pilots',  			
				'code'=>'demos_and_pilots',                   		
	 			'funct'=>get_f_text($CONFIG),
		),
	 	6=>Array(
	     		'title'=>'Dev Tools', 			
				'code'=>'dev_tools',                          		
	 			'funct'=>get_f_text($CONFIG),
		),
	 	7=>Array(
	     		'title'=>'Image and File Uploading', 			
				'code'=>'image_and_file_uploading',           		
	 			'funct'=>get_f_text($CONFIG),
		),
	 	8=>Array(
	     		'title'=>'Image Manipulation and Processing (Aspect Ratio & Mores)',			
				'code'=>'image_manipulation_and_processing',  		
	 			'funct'=>get_f_text($CONFIG),
		),
	 	9=>Array(
	     		'title'=>'ISO Formatting',  			
				'code'=>'iso_formatting',                     		
	 			'funct'=>get_f_text($CONFIG),
		),
	 	10=>Array(
	     		'title'=>'jQuery', 			
				'code'=>'jquery',                             		 
	 			'funct'=>get_f_text($CONFIG),
		),
	 	12=>Array(
	     		'title'=>'Javascript',  			
				'code'=>'javascript',                         		 
	 			'funct'=>get_f_text($CONFIG),
		),
	 	13=>Array(
	     		'title'=>'Many-to-Many Relationships', 			
				'code'=>'many_to_many_relationships',         		 
	 			'funct'=>get_f_text($CONFIG),
		),
	 	14=>Array(
	     		'title'=>'Minimum Viable Product', 			
				'code'=>'minimum_viable_product',             		 
	 			'funct'=>get_f_text($CONFIG),
		),
	 	15=>Array(
	     		'title'=>'Multi-Lingual Support',  			
				'code'=>'multi_lingual_support',              		 
	 			'funct'=>get_f_text($CONFIG),
		),
	 	16=>Array(
	     		'title'=>'Not Wordpress', 			
				'code'=>'not_wordpress',                      		 
	 			'funct'=>get_f_text($CONFIG),
		),
	 	17=>Array(
	     		'title'=>'OWASP Security Standards', 			
				'code'=>'owasp_security_standards',           		 
	 			'funct'=>get_f_text($CONFIG),
		),
	 	18=>Array(
	     		'title'=>'PHP',  			
				'code'=>'php',                                		 
	 			'funct'=>get_f_text($CONFIG),
		),
	 	19=>Array(
	     		'title'=>'Regular Expression Mastery', 			
	     		'title'=>'regex',
	 			'funct'=>get_f_text($CONFIG),
		),
	 	20=>Array(
	     		'title'=>'Post, Redirect, Gets JS Form Nullifier', 
				'code'=>'post_redirect_get',                  		 
	 			'funct'=>get_f_text($CONFIG),
		),
	 	21=>Array(
	     		'title'=>'Templates', 			
				'code'=>'templates',                          		 
	 			'funct'=>get_f_text($CONFIG),
		),
	 	22=>Array(
	     		'title'=>'Test Driven Development',  			
				'code'=>'test_driven_development',            		 
	 			'funct'=>get_f_text($CONFIG),
		),
	 	23=>Array(
	     		'title'=>'User Experience (UX)', 			
				'code'=>'user_experience',                    		 
	 			'funct'=>get_f_text($CONFIG),
		),
	 	24=>Array(
	     		'title'=>'User Management', 			
				'code'=>'user_management',                    		 
	 			'funct'=>get_f_text($CONFIG),
		),
	 	25=>Array(
	     		'title'=>'User Workflow', 			
				'code'=>'user_workflow',                      		 
	 			'funct'=>get_f_text($CONFIG),
		),
	 	26=>Array(
	     		'title'=>'Version Control (GIT)',  			
				'code'=>'git',                                		 
	 			'funct'=>get_f_text($CONFIG),
		),
	  	27=>Array(
				'title'=>'VIM',  			
				'code'=>'vim',                                		 
	  			'funct'=>get_f_text($CONFIG),
		),
	);
	return $foo;
}

?>
