import { Ball } from "./Ball.js";
import { getRandomColor, getRandomFloat, getRandomInt } from "./utils.js";

export class ClickableBall extends Ball{
	constructor(props){
		super(props);
		this.href       = props.href;
		this.faUnicode  = props.faUnicode;
	}//end constructor()
  getFont(){
    const fontSize   = this.fontSize   || ( this.radius - 5 );
    const fontWeight = this.fontWeight || "400";
    const fontFamily = this.fontFamily || "\"Font Awesome 5 Brands\"";
    let font         = "";
    if(fontSize < 0)
      return font;
    font += fontWeight + " " + fontSize + "px " + fontFamily;
    console.log(font);
    return font;
  }//end getFont()

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
	}//end handleClick()
  label(ctx){
		/*	WARNING: Rewrite of Balls.js method;
		*/
		const x			= this.xCord - (this.radius/3);
		const y			= this.yCord + (this.radius/3);	//Somehow this work very well;

		ctx.beginPath();
		//WARNING: Just pulling in css via ./public/index.html css link
		//TODO: Fix this up and import just the icons we neeed;
    ctx.font      = this.getFont();
		ctx.fillStyle	= "white";
		ctx.fillText(this.faUnicode, x, y);	//Coords are left and down;

		ctx.closePath();
		return true;
	}//end label()
}
export function makeRandomClickableBall(
	sWidth, 
	sHeight, 
	ballID, 
	minRadius=3, 
	maxRadius=30, 
	faUnicode,
	href, 
	maxSpeed=null
){
	/*	Return false if random ball fails;
		Else return random ball;
		Input:
			screen width,
			screen height,
			ballID
			mininum radius possible,
			maximum radius possible,
			maxSpeed possible -- no more than 2 times given radius;
		Output:
			Ball object;
		@ ./src/Balls.js
	*/
	let randomRadius	= getRandomInt(minRadius, maxRadius);
	randomRadius += getRandomInt(1,99) * 0.01;
	const randomX	= getRandomInt(randomRadius, sWidth - randomRadius);
	const randomY	= getRandomInt(randomRadius, sHeight - randomRadius);
	let randomDX	= getRandomFloat(0, 0.151);	//Slow start
	let randomDY	= getRandomFloat(0, 0.151);	//Slow start
	if(maxSpeed !== null){
		if(randomDX > maxSpeed)
			randomDX = maxSpeed;
		if(randomDY > maxSpeed)
			randomDY = maxSpeed;
	}
	const newBall	= new ClickableBall({
		ballID:	ballID,
		color:	getRandomColor(),
		xCord:	randomX,
		yCord:	randomY,
		radius:	randomRadius,
		dx: 		randomDX,
		dy:		  randomDY,
	});
	if(maxSpeed !== null){
		if(maxSpeed < randomRadius)
			newBall.maxSpeed = maxSpeed;
		else
			newBall.maxSpeed = Math.ceil(randomRadius);	//set max speed to a legal int of radius;
	}
	else
		newBall.maxSpeed = randomRadius;
	newBall.href		   = href;
	newBall.faUnicode  = faUnicode;
	return newBall;
}//end makeRandomClickableBall
