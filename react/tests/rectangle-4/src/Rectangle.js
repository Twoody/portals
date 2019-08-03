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
	handleMove(sWidth, sHeight, entities=[]){
		//Handle rectangle movement:

		this.handleWallInteractions(sWidth, sHeight);
		this.handleEntityInteractions(sWidth, sHeight, entities);
		this.updateCoordinates();
	}//end handleMove
	handleBallInteractions(sWidth, sHeight, ball){
		/*	Find out what way rectangle is moving;
			If we encounter a ball, move that ball IFF that ball can move in the other direction;
		*/
		if(this.isOverLappingBall(ball) === false){
			return true;
		}
		//Process directions and speeds
		const dxBoost = (Math.abs(this.xLeft - this.nextX))/50;
		const dyBoost = (Math.abs(this.yTop - this.nextY))/50;
		if(this.isGoingRight && ball.nextX > this.xCenter){
			//Rectangle is going right and ball is in path;
			this.nextX = this.xLeft;		//Do not allow this movement
			this.isGoingRight = false;
			ball.accelerate(dxBoost, dyBoost);
		}
		if(this.isGoingLeft && ball.nextX < this.xCenter){
			this.nextX = this.xLeft;		//Do not allow this movement
			this.isGoingLeft	= false;
			ball.accelerate(dxBoost, dyBoost);
		}
		if(this.isGoingDown && ball.nextY > this.yCenter){
			this.nextY = this.yTop;		//Do not allow this movement
			this.isGoingDown = false;
			ball.accelerate(dxBoost, dyBoost);
		}
		if(this.isGoingUp && ball.nextY < this.yCenter){
			this.nextY = this.yTop;		//Do not allow this movement
			this.isGoingUp = false;
			ball.accelerate(dxBoost, dyBoost);
		}
		if(this.isOverLappingBall(ball)){
			//We should have fixed the result, but we may have moved the rectangle to fast to catch it;
			console.log("still overlapping");
		}
	}
	handleEntityInteractions(sWidth, sHeight, entities=[]){
		for( let i=0; i<entities.length; i++){
			const entity	= entities[i];
			if(entity.type === 'rectangle')
				this.handleRectangleInteractions(sWidth, sHeight, entity);
			else if(entity.type === 'ball')
				this.handleBallInteractions(sWidth, sHeight, entity);
			else{
				//type not found
			}
		}//end i-for
	}
	handleRectangleInteractions(sWidth, sHeight, entity){
		//Encountered other rectangle; Can we move that rectangle, too?
	}
	handleWallInteractions(sWidth, sHeight){
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
		const ballDistanceX = Math.abs(ball.nextX - this.xCenter);
		const ballDistanceY = Math.abs(ball.nextY - this.yCenter);
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
	willOverLapBall(ball){
		const currX	= this.xLeft;
		const currY = this.yTop;
		this.updateCoordinates(this.nextX, this.nextY);
		const ret = this.isOverLappingBall(ball);
		this.updateCoordinates(currX, currY);
		return ret;
	}
}//End Rectangle Class
