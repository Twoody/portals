import { Level } from "./Level.js";
import { Rectangle } from "./Rectangle.js";
import { getMiddleOfCanvas } from "./utils.js";

export class Level1 extends Level{
	/*
		Try to build a world with a single ball;
		Build the world with on movable rectangle;
		Build the world with one destructable rectangle;
		Add keycode `space` to accelerate the ball from
			our movable rectangle;
		IFF ball hits bottom and no more balls, reset game;
	*/
	constructor(props={}){
		super(props);
	}
	makeDestructibleRects(){
		const middleCords	= getMiddleOfCanvas(this.width, this.height);
		const width			= this.brickWidth;
		const height		= this.brickHeight;
		const xLeft			= middleCords.x - width/2;
		const yTop			= middleCords.y - height/2 - 100;
		const rectangle	= new Rectangle({
			rectID:	this.rectangles.length,
			color:	'white',
			xLeft:	xLeft,
			yTop:		yTop,
			width:	width,
			height:	height,
		});
      this.destructibles         += 1;
		rectangle.isDestructible	= true;
		rectangle.isDraggable		= false;
		this.rectangles.push(rectangle);
	}
}//end Level1 Class

