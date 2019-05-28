<?php
/*
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
*/
function get_dropdown_items($CONFIG){
	//These are the items in specifics to making this website;
	$dropdown_items_arr	= Array(
		'Reset',
		'Cloud Computing',
		'Cookies',
		'Database Management',
		'Demos and Pilots',
		'Dev Tools',
		'Image and File Uploading',
		'Image Manipulation and Processing (Aspect Ratio & Mores)',
		'ISO Formatting',
		'jQuery',
		'Java',
		'Javascript',
		'Many-to-Many Relationships',
		'Minimum Viable Product',
		'Multi-Lingual Support',
		'OWASP Security Standards',
		'PHP',
		'Post, Redirect, Get + JS Form Nullifier',
		'Templates',
		'Test Driven Development',
		'User Experience (UX)',
		'User Management',
		'User Workflow',
		'Version Control (GIT)',
		'VIM',
		'Wordpress',
	);
	return $dropdown_items_arr;
}
function get_dropdown_texts($CONFIG){
	return Array(
		'reset'=>make_lorem_ipsum(1),
		'cloud_computing'=>get_f_text($CONFIG),
		'cookies'=>get_f_text($CONFIG),
		'database_management'=>get_f_text($CONFIG),
		'demos_and_pilots'=>get_f_text($CONFIG),
		'dev_tools'=>get_f_text($CONFIG),
		'image_and_file_uploading'=>get_f_text($CONFIG),
		'image_manipulation_and_processing'=>get_f_text($CONFIG),
		'iso_formatting'=>get_f_text($CONFIG),
		'jquery'=>get_f_text($CONFIG),
		'javascript'=>get_f_text($CONFIG),
		'many_to_many_relationships'=>get_f_text($CONFIG),
		'minimum_viable_product'=>get_f_text($CONFIG),
		'multi_lingual_support'=>get_f_text($CONFIG),
		'owasp_security_standards'=>get_f_text($CONFIG),
		'php'=>get_f_text($CONFIG),
		'post_redirect_get'=>get_f_text($CONFIG),
		'templates'=>get_f_text($CONFIG),
		'test_driven_development'=>get_f_text($CONFIG),
		'user_experience'=>get_f_text($CONFIG),
		'user_management'=>get_f_text($CONFIG),
		'user_workflow'=>get_f_text($CONFIG),
		'git'=>get_f_text($CONFIG),
		'vim'=>get_f_text($CONFIG),
		'wordpress'=>get_f_text($CONFIG),
	);
}
function get_f_text($CONFIG){
	$ret = 'Not registerd yet...';
	$ret .= "Pleaes understand that there are 10+ items above that we need to process and make into their own select text and mini-blog post. " ;
	$ret .= "We will soon have all of the mappings put here with specifics, until then, enjoy the fun \$_GET see here!";
	return $ret;
}
?>
