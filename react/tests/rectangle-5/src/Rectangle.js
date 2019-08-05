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
		//Move rectangle away from ball until no overlap continue;
		const timeRatio	= 50;
		const dx				= Math.abs(this.xLeft - this.nextX);
		const dy				= Math.abs(this.yTop - this.nextY);
		const dxRatio		= dx/timeRatio;
		const dyRatio 		= dy/timeRatio;
		let timeCnt			= 0;
		while(this.isOverLappingBall(ball)){
			if(this.isGoingRight)
				this.nextX -= dxRatio;	//Move back left
			else if(this.isGoingLeft)
				this.nextX += dxRatio;	//Move back right
			if(this.isGoingUp)
				this.nextY += dyRatio;	//Move back down;
			else if(this.isGoingDown)
				this.nextY -= dyRatio;	//Move back up;
			timeCnt += 1;
			if(timeCnt === timeRatio){
				this.nextX = this.xLeft;
				this.nextY = this.yTop;
				break;
			}
		}
		if(this.isOverLappingBall(ball)){
			//Ball and rectangle are super stuck for whatever reason;
			//Manually try to move rectangle out of the way;
			console.log('ERROR: Rectangle.handleBallInteractions: Super stuck;');
			if(this.isGoingRight && ball.nextX < this.xCenter){
				//Rectangle is moving right and ball is stuck left of rectangle;
				this.nextX += ball.radius;
			}
			else if(this.isGoingRight && ball.nextX > this.xCenter){
				//Rectangle is moving right and ball is right of rectangle;
				//Since this is overlapping, move the rectangle back left to avoid overlap;
				this.nextX -= ball.radius;
			}
			if(this.isGoingLeft && ball.nextX > this.xCenter){
				this.nextX -= ball.radius;
			}
			else if(this.isGoingLeft && ball.nextX < this.xCenter){
				//Moving left and ball is left; Since overlap, move back right;
				this.nextX += ball.radius;
			}

			if(this.isGoingDown && ball.nextY > this.yCenter){
				//Move rectangle back up;
				this.nextY -= ball.radius
			}
			else if(this.isGoingDown && ball.nextY < this.yCenter){
				//Rectangle is going down and ball is above above rectangle;
				//Move rectangle down;
				this.nextY += ball.radius
			}
			if(this.isGoingUp && ball.nextY > this.yCenter){
				//Rectangle is going up and ball is below rectangle;
				//Move rectangle up;
				this.nextY -= ball.radius
			}
			else if(this.isGoingup && ball.nextY < this.yCenter){
				//Move rectangle down;
				this.nextY += ball.radius;
			}

		}

		//Process directions and speeds
		if(this.isGoingRight && ball.nextX > this.xCenter){
			//Rectangle is going right and ball is in path;
			this.isGoingRight = false;
		}
		if(this.isGoingLeft && ball.nextX < this.xCenter){
			this.isGoingLeft	= false;
		}
		if(this.isGoingDown && ball.nextY > this.yCenter){
			this.isGoingDown = false;
		}
		if(this.isGoingUp && ball.nextY < this.yCenter){
			this.isGoingUp = false;
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
	isLegalMovement(nextX, nextY, entities){
		/*	Go over entities and see if this next movement is going to cause
			a conflict with the existing rectangle;

			TODO: accelerating the ball here is not intuitive;
		*/
		this.nextX = nextX;
		this.nextY = nextY;
		const dx			= Math.abs(this.xLeft - nextX);
		const dy			= Math.abs(this.yTop - nextY);
		const dxBoost	= dx/100;
		const dyBoost	= dy/100;
		for( let i=0; i<entities.length; i++){
			const entity = entities[i];
			if(entity.type === 'ball'){
				if( this.willOverLapBall(entity) ){
					console.log('illegal movement: reseting coordinates back;');
					//Accelerate ball;
					entity.accelerate(dxBoost, dyBoost);
					this.nextX = this.xLeft;
					this.nextY = this.yYop;
					this.resetMovement();
					return false;
				}
			}//end ball check
		}//end i-for
		return true;
	}
	processDrag(clientX, clientY, entities){
		const xMid			= this.xCenter;
		const yMid			= this.yCenter;
		let nextX 			= this.xLeft;
		let nextY 			= this.yTop;
		this.resetMovement();

		if(clientX < xMid){
			//Move left
			nextX = clientX - (this.width/2);
			this.isGoingLeft = true;
		}
		else if(clientX > xMid){
			//Move right
			nextX = clientX - (this.width/2);
			this.isGoingRight = true;
		}
		else{
			//Same position
		}
		if(clientY < yMid){
			//Move Up
			nextY = clientY - (this.height/2);
			this.isGoingUp = true;
		}
		else if(clientY > yMid){
			//Move Down
			nextY = clientY - (this.height/2);
			this.isGoingDown = true;
		}
		else{
			//Same position
		}

		const isLegalDrag = this.isLegalMovement(nextX, nextY, entities);
		if(isLegalDrag === false){
			this.nextX = this.xLeft;
			this.nextY = this.yTop;
			this.resetMovement();
			return false;
		}
		else{
			this.nextX = nextX;
			this.nextY = nextY;
			return true;
		}
	}//end processDrag()
	processMovement(){
		
	}
	resetMovement(){
		this.isGoingLeft	= false;
		this.isGoingRight	= false;
		this.isGoingUp		= false;
		this.isGoingDown	= false;
	}
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
		//Do some coordinate trickery to see if updated results will 
		//	cause a conflict as if it did happen;
		const currX	= this.xLeft;
		const currY = this.yTop;
		const nextX = this.nextX;
		const nextY = this.nextY;
		this.updateCoordinates();
		const ret = this.isOverLappingBall(ball);
		this.nextX = currX;
		this.nextY = currY;
		this.updateCoordinates();
		this.nextX = nextX;
		this.nextY = nextY;
		return ret;
	}
}//End Rectangle Class
