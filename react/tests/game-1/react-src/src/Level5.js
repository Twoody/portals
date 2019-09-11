import { Level } from "./Level.js";
import { Rectangle } from "./Rectangle.js";
import { getMiddleOfCanvas } from "./utils.js";

export class Level5 extends Level{
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
		const vPadding		= this.brickHeight + 1
      let rectangle     = null;
		rectangle = new Rectangle({
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
		this.rectangles.push(rectangle)

      //Add one more to cover hole below destructible brick;
		rectangle = new Rectangle({
			rectID:	this.rectangles.length,
			color:	'red',
			xLeft:	xLeft,
			yTop:		yTop + vPadding*2,
			width:	width,
			height:	height,
		});
      this.destructibles         += 1;
		rectangle.isDestructible	= true;
		rectangle.isDraggable		= false;
      rectangle.isPowerUp        = true;
      rectangle.powerUpType      = "rocket";
		this.rectangles.push(rectangle);

		this.makeIndestructibleRects();;
	}
	makeIndestructibleRects(){
		/*
			One rectangle is exact middle;
			We wnat to surround this rectangle with indestructible
			bricks, with access just from POWERUP;
         This level is equivalent to Level4.js besides the powerup and 
         access points;
		*/
		const middleCords	= getMiddleOfCanvas(this.width, this.height);
		const width			= this.brickWidth;
		const height		= this.brickHeight;
		const xLeft			= middleCords.x - width/2;
		const yTop			= middleCords.y - height/2 - 100;
		const hPadding		= this.brickWidth + 1;
		const vPadding		= this.brickHeight + 1
		const hPossibleRects	= Math.floor(this.width / (this.brickWidth + hPadding)) - 1;
      let rectangle     = null;
		for (let i=1; i < hPossibleRects; i++){
        //Same Row
			rectangle	= new Rectangle({
				rectID:	this.rectangles.length,
				color:	'grey',
				xLeft:	xLeft + (hPadding * i),
				yTop:		yTop,
				width:	width,
				height:	height,
			});
			rectangle.isDestructible	= false;
			rectangle.isDraggable		= false;
			this.rectangles.push(rectangle);
			rectangle	= new Rectangle({
				rectID:	this.rectangles.length,
				color:	'grey',
				xLeft:	xLeft - (hPadding * i),
				yTop:		yTop,
				width:	width,
				height:	height,
			});
			rectangle.isDestructible	= false;
			rectangle.isDraggable		= false;
			this.rectangles.push(rectangle);

         //Middle "full" Row;
			rectangle	= new Rectangle({
				rectID:	this.rectangles.length,
				color:	'grey',
				xLeft:	xLeft + (hPadding * i),
				yTop:		yTop + vPadding,
				width:	width,
				height:	height,
			});
			rectangle.isDestructible	= false;
			rectangle.isDraggable		= false;
			this.rectangles.push(rectangle);
			rectangle	= new Rectangle({
				rectID:	this.rectangles.length,
				color:	'grey',
				xLeft:	xLeft - (hPadding * i),
				yTop:		yTop + vPadding,
				width:	width,
				height:	height,
			});
			rectangle.isDestructible	= false;
			rectangle.isDraggable		= false;
			this.rectangles.push(rectangle);

         //Bottom Row w/ gap;
			rectangle	= new Rectangle({
				rectID:	this.rectangles.length,
				color:	'grey',
				xLeft:	xLeft + (hPadding * i),
				yTop:		yTop + vPadding*2,
				width:	width,
				height:	height,
			});
			rectangle.isDestructible	= false;
			rectangle.isDraggable		= false;
			this.rectangles.push(rectangle);
			rectangle	= new Rectangle({
				rectID:	this.rectangles.length,
				color:	'grey',
				xLeft:	xLeft - (hPadding * i),
				yTop:		yTop + vPadding*2,
				width:	width,
				height:	height,
			});
			rectangle.isDestructible	= false;
			rectangle.isDraggable		= false;
			this.rectangles.push(rectangle);
		}//end i-for
		rectangle	= new Rectangle({
			rectID:	this.rectangles.length,
			color:	'grey',
			xLeft:	xLeft,
			yTop:		yTop + vPadding,
			width:	width,
			height:	height,
		});
		rectangle.isDestructible	= false;
		rectangle.isDraggable		= false;
		this.rectangles.push(rectangle);

	}
}//end Level5 Class

