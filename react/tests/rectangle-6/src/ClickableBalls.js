class ClickableBall extends Ball{
	constructor(properties){
		super(properties);
		this.href	= properties.href;
		this.faUnicode = properties.faUnicode;

	}//end constructor()
	consoleHREF(){
		console.log(this.href);
	}
	handleClick(){
		/*WARNING: ReWrite of ./Balls.js and handleClick
			Open current balls link in new tab, and TRY TO 
			keep focus on the current window (not always a guarantee);
			See: pop-under
			Input:
				None
			Output:
				Boolean if success;
		*/
		const tab = window.open(this.href, '_blank');
		tab.blur();
		window.focus();
		return true;
	}
	label(ctx){
		/*	WARNING: Rewrite of Balls.js method;
		*/
		if(this.radius < 30)
			return;
		//console.log(this.faUnicode);
		//ctx.font      = '400 12px "Font Awesome 5 Brands"';
		//ctx.font      = '17px Arial';
		ctx.beginPath();
		ctx.font			= '400 25px "Font Awesome 5 Brands"';
		ctx.fillStyle	= "white";
		ctx.fillText(this.faUnicode, this.xCord-10, this.yCord+9);	//Coords are left and down;
		ctx.closePath();
	}//end label()

}
