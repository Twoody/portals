(function(){
	//IIFE used for features/ drop down menu and the split buttons;
	//Links:
	//	https://hackernoon.com/replacing-html-content-using-javascript-9a3d36c56cc
	//	https://developer.mozilla.org/en-US/docs/Glossary/IIFE
	function get_parameter_by_name(name, url) {
		//Links:
		//	https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
   	if (!url) url = window.location.href;
		console.log(url);
   	name = name.replace(/[\[\]]/g, '\\$&');
   	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
   	    results = regex.exec(url);
   	if (!results) return null;
   	if (!results[2]) return '';
   	return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}
	function change_dd_title(new_title){
		document.getElementById("TITLE_CHANGER").innerHTML=new_title;
	}
	
	let new_title = get_parameter_by_name('display_title');
	if(!new_title || new_title === "Reset")
		new_title	= "Make UR Own Site"
	change_dd_title(new_title);
})();
