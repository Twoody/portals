/*

Links:
	https://getbootstrap.com/docs/4.0/components/collapse/
	https://fontawesome.com/icons/arrow-right?style=solid
*/


(function(){
	//Nothing to do yet...
})()//end iife

$(document).ready(function(){
	//TODO: Tie id's together with php src;
	let blog_id					= "#blog";
	let blog_collapser_id	= 'blog-collapser';
	let collapsed_icon		= "<i class=\"fas fa-angle-double-right\">";
	let showing_icon			= "<i class=\"fas fa-angle-double-down\">";
	let is_collapsed_text	= "Show Blog&nbsp;" + collapsed_icon;
	let is_showing_text		= "Hide Blog&nbsp;" + showing_icon;
	$(blog_id).on('hide.bs.collapse', function(){
		document.getElementById(blog_collapser_id).innerHTML = is_collapsed_text;
	});
	$(blog_id).on('show.bs.collapse', function(){
		document.getElementById(blog_collapser_id).innerHTML = is_showing_text;
	});
});
