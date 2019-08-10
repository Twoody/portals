import { Ball } from "./Ball.js";

export class ClickableBall extends Ball{
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
		const fontSize = this.radius - 5;
		const x			= this.xCord - (this.radius/3);
		const y			= this.yCord + (this.radius/3);	//Somehow this work very well;
		if(fontSize <0)
			return false;
		ctx.beginPath();
		ctx.font			= '400 '+fontSize+'px "Font Awesome 5 Brands"';
		ctx.fillStyle	= "white";
		ctx.fillText(this.faUnicode, x, y);	//Coords are left and down;
		ctx.closePath();
		return true;
	}//end label()
}
