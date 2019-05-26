$(document).ready(function(){
	function get_screen_height(){
		return window.innerHeight*0.7;
	}
	function get_screen_width(){
		return window.innerWidth;
	}
	function get_div_constraint(){
		/*
		Author:
			Tanner.L.Woody@gmail.com
			2019-05-22
		Purpose:
			Determine wether screen heigh or screen width should be used to set the div
			container restraint;
		Logic:
			If height is bigger than the width, than have the restraint be the width;
			If the width is bigger than the heigh, than have the restraint be the height;
		*/
		let max_width	= 575;	//This is the point that B.S. goes from xs to s;
		let cur_height	= get_screen_height();
		let cur_width	= get_screen_width();
		console.log(cur_height);
		if(cur_height >= max_width)
			return cur_width*0.75;
			//return 100;
		if(cur_height > cur_width)
			return cur_width;
		return cur_height;
	}
	function get_div_constraint2(){
		/*
		Author:
			Tanner.L.Woody@gmail.com
			2019-05-22
		Purpose:
			Determine wether screen heigh or screen width should be used to set the div
			container restraint;
		Logic:
			If height is bigger than the width, than have the restraint be the width;
			If the width is bigger than the heigh, than have the restraint be the height;
		*/
		let max_width	= 575;	//This is the point that B.S. goes from xs to s;
		let cur_height	= get_screen_height();
		let cur_width	= get_screen_width();
		console.log(cur_height);
		if(cur_height >= max_width)
			return cur_width*0.75;
			//return 100;
		if(cur_height > cur_width)
			return cur_width*(1);
		return cur_height*(4/3);
	}
	//$('#foo').height(100);
	//$('#foo').height(get_div_constraint());
	//$('.fit-screen').height(get_div_constraint());	//TODO: Function for heigh and function for width;
	//$('.fit-screen').width(get_div_constraint2());	//TODO: Function for heigh and function for width;
	//TODO: Change the images, not the container;
	//TODO: (cont.) The issue is not editing the container, it is the fact we are making the container smaller than the images in the first place;
});

