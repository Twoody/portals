import { Level } from "./Level.js";
import { Rectangle } from "./Rectangle.js";
import { getMiddleOfCanvas } from "./utils.js";

export class Level2 extends Level{
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
		const middleCords		= getMiddleOfCanvas(this.width, this.height);
		const yTop				= middleCords.y - Math.floor(this.height/4);
		const padding			= 5;
		const possibleRects	= Math.floor(this.width / (this.brickWidth + padding*2));
		for (let i=0; i< possibleRects; i++){
			const bx = (this.brickWidth * i) + (padding * i+1)
			const rectangle	= new Rectangle({
				rectID:	this.rectangles.length,
				color:	'white',
				xLeft:	bx,
				yTop:		yTop,
				width:	this.brickWidth,
				height:	this.brickHeight,
			});
         this.destructibles         += 1;
			rectangle.isDestructible	= true;
			rectangle.isDraggable		= false;
			this.rectangles.push(rectangle);
		}//end i-for
		return this.rectangles.length-1;
	}
}//end Level2 Class
