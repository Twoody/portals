class Rectangle{
	'use strict';
	constructor(properties){
		this.type			= 'rectangle';
		this.rectID			= properties.rectID;
		this.color			= properties.color;
		this.width			= properties.width;
		this.height			= properties.height;
		this.xLeft			= properties.xLeft;
		this.yTop			= properties.yTop;
		this.xRight			= this.xLeft + this.width;
		this.yBottom		= this.yTop + this.height;
		this.xCenter		= Math.abs(this.xRight	- this.width/2);
		this.yCenter		= Math.abs(this.yBottom - this.height/2);
		this.nextX			= this.xLeft;
		this.nextY			= this.yTop;
		this.gravity		= 0;
		this.friction		= 0.05;
	}
	draw(ctx){
		ctx.beginPath();
		ctx.rect(
			this.xLeft,
			this.yTop, 
			this.width,
			this.height, 
		);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}//end draw()
	handleRectangleMove(sWidth, sHeight, entities=[]){
		//Handle rectangle movement:

		this.handleRectangleWallInteractions(sWidth, sHeight);
		this.handleRectangleEntityInteractions(sWidth, sHeight, entities);
		this.updateCoordinates();
	}//end handleRectangleMove
	handleRectangleBallInteractions(sWidth, sHeight, entity){
		/*	Find out what way rectangle is moving;
			If we encounter a ball, move that ball IFF that ball can move in the other direction;
		*/
		console.log('rectangle interacting with ball');
	}
	handleRectangleEntityInteractions(sWidth, sHeight, entities=[]){
		for( let i=0; i<entities.length; i++){
			const entity	= entities[i];
			if(entity.type === 'rectangle')
				this.handleRectangleRectangleInteractions(sWidth, sHeight, entity);
			else if(entity.type === 'ball')
				this.handleRectangleBallInteractions(sWidth, sHeight, entity);
			else{
				//type not found
			}
		}//end i-for
	}
	handleRectangleRectangleInteractions(sWidth, sHeight, entity){
		//Encountered other rectangle; Can we move that rectangle, too?
	}
	handleRectangleWallInteractions(sWidth, sHeight){
		//Find out what item is out of bounds and fix accordingly;
		if(this.nextX < 0)
			this.nextX = 0;
		if(this.nextX + this.width > sWidth)
			this.nextX = sWidth - this.width;
		if(this.nextY < 0)
			this.nextY = 0;
		if(this.nextY + this.height > sHeight)
			this.nextY = sHeight - this.height;
		return true;
	}
	isOverLappingBall(ball){
		/* Is rectangle intersecting/overlapping ball;
			Input:
				Ball() object
			Output:
				Boolean
		*/	
		const ballDistanceX = Math.abs(ball.xCord - this.xCenter);
		const ballDistanceY = Math.abs(ball.yCord - this.yCenter);
		if( ballDistanceX > (this.width/2 + ball.radius) )
			return false;
		if( ballDistanceY > (this.height/2 + ball.radius) )
			return false;
		if( ballDistanceX <= (this.width/2) )
			return true;
		if( ballDistanceY <= (this.height/2) )
			return true;

		//Corners
		const areCornersTouching = isOverLapping(
			ballDistanceX,
			ballDistanceY,
			this.width/2,
			this.height/2,
			ball.radius
		);
		if(areCornersTouching)
			return true;
		return false;
	}
	isInBounds(width, height){
		//Determine if rectangle fits the screen width and screen height;
		if(this.xLeft < 0)
			return false;
		if(this.xRight > width)
			return false;
		if(this.yTop < 0)
			return false;
		if(this.yBottom > height)
			return false;
		return true;
	}//end isInBounds();
	updateCoordinates(){
		this.xLeft		= this.nextX;
		this.yTop		= this.nextY;
		this.xRight		= this.xLeft + this.width;
		this.yBottom	= this.yTop + this.height;
		this.xCenter	= Math.abs(this.xRight	- this.width/2);
		this.yCenter	= Math.abs(this.yBottom - this.height/2);
		this.nextX		= this.xLeft;
		this.nextY		= this.yTop;
	}//end updateCoordinates()
}//End Rectangle Class
