import { Level } from "./Level.js";
import { Rectangle } from "./Rectangle.js";
import { getMiddleOfCanvas } from "./utils.js";

export class Level3 extends Level{
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
		const hPadding			= 50;
		const vPadding			= 2;
		const hPossibleRects	= Math.floor(this.width / (this.brickWidth + hPadding));
		const vPossibleRects	= Math.floor(this.height / (this.brickHeight + vPadding + 20))
		for (let i=0; i< hPossibleRects; i++){
			const bx = (this.brickWidth * i) + (hPadding * (i+1))
			for (let j=0; j<vPossibleRects; j++){
				const by = yTop + (this.brickHeight * j) + (vPadding * j+1)
				const rectangle	= new Rectangle({
					rectID:	this.rectangles.length,
					color:	'white',
					xLeft:	bx,
					yTop:		by,
					width:	this.brickWidth,
					height:	this.brickHeight,
				});
            this.destructibles         += 1;
				rectangle.isDestructible	= true;
				rectangle.isDraggable		= false;
				this.rectangles.push(rectangle);
			}//end j-for
		}//end i-for
		const paddleBottomY = this.height + this.rectangles[0].height - 0.01;
		this.rectangles[0].processDrag(
			this.rectangles[0].xLeft, 
			paddleBottomY, 
			[]
		);
		this.rectangles[0].handleMove(
			this.width, 
			this.height,
			[]
		);
		return this.rectangles.length-1;
	}
}//end Level3 Class
