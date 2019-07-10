'use strict';
class Ball{
	constructor(props){
		this.isGoingRight	= true;
		this.isGoingDown	= true;
		this.xCord			= props.xInit;
		this.yCord			= props.yInit;
		this.radius			= 30;
		this.xSpeed			= 2;
		this.ySpeed			= 1.05;
		this.gravity		= 0.5;
		this.friction		= 0.15;
		this.kineticGain	= (1/3);
		this.kineticLoss	= (2/3);
		this.color			= "blue";
		this.ballID			= props.ballID;
		this.canvas			= props.canvas;
		this.maxWidth		= props.maxWidth;
		this.maxHeight		= props.maxHeight;
	}
	draw(){
		const ctx		= this.canvas.getContext('2d');
		ctx.beginPath();
		ctx.arc(
			this.xCord,
			this.yCord, 
			this.radius,
			2*Math.PI,
			false
		);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	accelerate(){
		console.log('accelerating ball: ' + this.ballID);
		this.ySpeed += 5;
		this.xSpeed += 2;
	}
	updateSpeed(){
		if(this.isGoingDown)
			this.ySpeed += this.gravity;
		else
			this.ySpeed -= this.gravity;
	}
	updateCoordinates(otherBalls){
		if(this.isGoingDown === true)
			this.yCord += this.ySpeed;
		else //We are going up;
			this.yCord -= this.ySpeed;
		if (this.isGoingRight === true)
			this.xCord += this.xSpeed;
		else
			this.xCord -= this.xSpeed;
	}//End updateCoordinates()

	updateTrajectory(otherBalls){
		//Will need to update to allow for multiple heights and widths
		//	and then find the best/only solution;
		const rightBound	= this.xCord + this.radius;
		const leftBound	= this.xCord - this.radius;
		const hitTop		= this.hitTop();
		const hitBottom	= this.hitBottom();
		let isBouncing		= true;
		//Container Check - Top/Bottom
		if(hitBottom === true && this.ySpeed <= 0){
			//Hit bottom but no more bounce;
			this.yCord	= this.maxHeight - this.radius;
			if(this.xSpeed > 0)
				this.xSpeed -= this.friction;
			if(this.xSpeed < 0)
				this.xSpeed = 0;
			this.ySpeed = 0;
			isBouncing	= false;
		}
		else if(hitTop === false && this.ySpeed <= 0){
			//Lost momentum; Coming back down;
			this.isGoingDown = true;
			this.ySpeed -= this.friction;
		}
		else if (hitTop === true){
			this.isGoingDown = true;
			this.yCord	= 0 + this.radius;
			this.ySpeed -= this.friction;
		}
		else if (hitBottom === true){
			//Hit Bottom but still bouncing up;
			this.isGoingDown = false;
			this.yCord	= this.maxHeight - this.radius;
			this.ySpeed -= this.friction;
		}

		//Container Check - Sides
		if (leftBound <= 0 || rightBound >= this.maxWidth){
			if (leftBound <= 0){
				this.isGoingRight	= true;
				this.xCord	= 0 + this.radius;
			}
			else if (rightBound >= this.maxWidth){
				this.isGoingRight	= false;
				this.xCord	= this.maxWidth - this.radius;
			}
			if (isBouncing)
				this.ySpeed -= this.friction;
			if (this.xSpeed > 0)
				this.xSpeed -= this.friction;
			if(this.xSpeed <=0)
				this.xSpeed = 0;
		}

		//Check Other Balls
		for( let i=0; i<otherBalls.length; i++){
			const otherBall	= otherBalls[i];
			if(otherBall.ballID	=== this.ballID)
				continue;
			const distanceBetween			= this.getDistanceBetween(otherBall);
			const minimumDistancePossible	= this.radius + otherBall.radius;
			const isOverlapping				= distanceBetween < minimumDistancePossible;
			if(isOverlapping){
				console.log('overlapping');
				this.diagnoseCollision(otherBall, distanceBetween);
				//this.updateTrajectory(otherBalls);
			}
		}//end i-for
	}//End updateTrajectory()

	hitBottom(){
		const bottomBound	= this.yCord + this.radius;
		if (bottomBound >= this.maxHeight)
			return true;
		return false;
	}
	hitTop(){
		const topBound		= this.yCord - this.radius;
		if (topBound <= 0)
			return true;
		return false;
	}
	getDistanceBetween(otherBall){
		//Get the distance between `this` and a different object;
		const xDiff		= this.xCord - otherBall.xCord;
		const yDiff		= this.yCord - otherBall.yCord;
		const distance	= Math.sqrt(xDiff*xDiff + yDiff*yDiff);
		return distance;
	}
	getSlope(otherBall){
		const xDiff		= this.xCord - otherBall.xCord;
		const yDiff		= this.yCord - otherBall.yCord;
		let slope		= yDiff/xDiff;
		if (slope === -0 || slope === +0)
			slope = 0;
		return slope;
	}
	diagnoseCollision(otherBall, distanceBetween){
		const requiredDistance	= this.radius + this.radius;
		const missingDistance	= requiredDistance - distanceBetween;
		const slope					= this.getSlope(otherBall);
		//const missingDistance	= requiredDistance;

		if(this.ySpeed <=0){
			//Current Ball has no bounce;
			if(otherBall.ySpeed <= 0)
				this.isGoingDown = true;
			else{
				//Transfter bounce from other ball to current ball;
				this.ySpeed					= otherBall.ySpeed * this.kineticGain;
				otherBall.ySpeed			= otherBall.ySpeed * this.kineticLoss;
				this.isGoingDown			= false;
				otherBall.isGoingDown	= false;
			}
		}
		else if(otherBall.ySpeed <=0){
			//Transfter bounce from current ball to other ball;
			otherBall.ySpeed			= this.ySpeed * this.kineticGain;
			this.ySpeed					= this.ySpeed * this.kineticLoss;
			otherBall.isGoingDown	= false;
			this.isGoingDown			= false;
		}
		else if(this.isGoingDown === otherBall.isGoingDown){
			//Both balls are in the same direction;
			if(this.isGoingDown){
				if(this.yCord > otherBall.yCord){
					//Current ball is below other ball;
					this.ySpeed			+= otherBall.ySpeed * this.kineticGain;
					otherBall.ySpeed	=  otherBall.ySpeed * this.kineticLoss;
					if(this.willChangeOnCollision_y(slope))
						otherBall.isGoingDown = false;
				}
				else{
					//Current ball is ontop of other ball;
					otherBall.ySpeed	+= this.ySpeed * this.kineticGain;
					this.ySpeed			=  this.ySpeed * this.kineticLoss;
					if(this.willChangeOnCollision_y(slope))
						this.isGoingDown = false;
				}
			}
			else{
				//Both balls are going up
				if(this.yCord > otherBall.yCord){
					//Current ball is below other ball
					otherBall.ySpeed += this.ySpeed * this.kineticGain;
					this.ySpeed			= this.ySpeed * this.kineticLoss;
					if(this.willChangeOnCollision_y(slope))
						this.isGoingDown = false;
				}
				else{
					//Current ball is on top other ball
					this.ySpeed			+= otherBall.ySpeed * this.kineticGain;
					otherBall.ySpeed	=  otherBall.ySpeed * this.kineticLoss;
					if(this.willChangeOnCollision_y(slope))
						otherBall.isGoingDown = false;
				}
			}
		}
		else{
			//Both balls are MOVING and headed in opposite direction;
			//Just add friction and change direction;
			this.ySpeed					-= this.friction;
			otherBall.ySpeed			-= this.friction;
			if( this.willChangeOnCollision_y(slope) ){
				this.isGoingDown			= !this.isGoingDown;
				otherBall.isGoingDown	= !otherBall.isGoingDown;
			}
			//Need to figure out what ball is on top and on bottom
			//	so that we do not push it out of bounds;
			if(this.yCord < otherBall.yCord){
				//Current ball is ontop of otherball
				const currOnBottom	= this.hitBottom();
				if(currOnBottom){
					//Update other ball, as we do not want to push this out of bounds;
					otherBall.yCord	= this.yCord + (this.yCord - otherBall.yCord) / distanceBetween * missingDistance;
				}
				else{
					//We can update the current ball instead
					this.yCord	= otherBall.yCord + (otherBall.yCord - this.yCord) / distanceBetween * missingDistance;
				}
			}
			else{
				//Current ball is below otherball;
				const currOnTop	= this.hitTop();
				if(currOnTop){
					//update other ball so we do not push this out of bounds;
					otherBall.yCord	= this.yCord + (this.yCord - otherBall.yCord) / distanceBetween * missingDistance;
				}
				else{
					//We can update the current ball instead
					this.yCord	= otherBall.yCord + (otherBall.yCord - this.yCord) / distanceBetween * missingDistance;
				}
			}
		}

		if(this.xSpeed <= 0){
			this.xSpeed			= otherBall.xSpeed * (2/3);
			otherBall.xSpeed	= otherBall.xSpeed * (1/3);
			this.isGoingRight 		= otherBall.isGoingRight;
			otherBall.isGoingRight	= !otherBall.isGoingRight;
			otherBall.xCord			= otherBall.xCord + (otherBall.xCord - this.xCord) / distanceBetween * missingDistance;
		}
		else if(otherBall.xSpeed <=0){
			otherBall.xSpeed	= this.xSpeed * (2/3);
			this.xSpeed			= this.xSpeed * (1/3);
			otherBall.isGoingRight	= this.isGoingRight;
			this.isGoingRight			= !this.isGoingRight;
			this.xCord	= this.xCord + (this.xCord - otherBall.xCord) / distanceBetween * missingDistance;
		}
		else if(this.isGoingRight === otherBall.isGoingRight){
			//	Both balls are MOVING in the same direction
			//	If balls are going in same direction, then the inner ball
			//	will receive speed while the other ball will lose speed;
			if(this.isGoingRight){
				//Both balls are going right
				if(this.xCord > otherBall.xCord){
					//Current ball is MOVING right of other ball;
					//TODO: Check bounds;
					this.xSpeed += otherBall.xSpeed*(2/3);
					otherBall.xSpeed = otherBall.xSpeed*(1/3);
					this.xCord	= this.xCord + (this.xCord - otherBall.xCord) / distanceBetween * missingDistance;
					otherBall.isGoingRight	= !otherBall.isGoingRight;
				}
				else{
					//Other ball is MOVING right of current ball;
					//TODO: Check bounds;
					otherBall.xSpeed += this.xSpeed*(2/3);
					this.xSpeed			= this.xSpeed*(1/3);
					otherBall.xCord	= otherBall.xCord + (otherBall.xCord - this.xCord) / distanceBetween * missingDistance;
					this.isGoingRight	= !this.isGoingRight;
				}
		 }
			else{
				//Both balls are going left;
				if(this.xCord > otherBall.xCord){
					//Other ball is MOVING left of current ball;
					//TODO: Check bounds;
					otherBall.xSpeed	+= this.xSpeed*(2/3);
					this.xSpeed			= this.xSpeed*(1/3);
					otherBall.xCord	= otherBall.xCord + (otherBall.xCord - this.xCord) / distanceBetween * missingDistance;
					this.isGoingRight	= !this.isGoingRight;
				}
				else{
					//Current ball is MOVING right of other ball;
					//TODO: Check bounds;
					this.xSpeed			+= otherBall.xSpeed*(2/3);
					otherBall.xSpeed	= otherBall.xSpeed*(1/3);
					this.xCord			= this.xCord + (this.xCord - otherBall.xCord) / distanceBetween * missingDistance;
					otherBall.isGoingRight	= !otherBall.isGoingRight;
				}
			}
		}
		else{
			//	Balls are going in opposite directions;
			//	If balls are goign in opposite directions, then both
			//	balls switch direction while losing speed to friction;
			if(this.xCord - this.radius <= 0)
				otherBall.xCord = otherBall.xCord + (otherBall.xCord - this.xCord) / distanceBetween * missingDistance;
			else if(this.xCord + this.radius >= this.maxWidth)
				otherBall.xCord = otherBall.xCord + (otherBall.xCord - this.xCord) / distanceBetween * missingDistance;
			else
				this.xCord = this.xCord + (this.xCord - otherBall.xCord) / distanceBetween * missingDistance;
			this.isGoingRight 		= !this.isGoingRight;
			otherBall.isGoingRight	= !otherBall.isGoingRight;
			this.xSpeed					-= this.friction;
			otherBall.xSpeed			-= this.friction;
		}
	}//end diagnoseCollision()
	willChangeOnCollision_y(slope){
		if( (slope <= 1 && slope >= 0.65) || (slope >= -1 && slope > -0.65) )
			return true;
		return false;
	}
}//end Ball Class

class BallPen extends React.Component{
	constructor(props){
		super(props);
		this.state		= {
			height: 0,
			width: 0,
		};
		this.balls		= [];
		this.isStarted	= false;
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}
	
	componentDidMount() {
		this.updateWindowDimensions();
		this.updateCanvas();
		this.timerID	= setInterval(
			()=>this.updateCanvas(),
			25
		);
		window.addEventListener('resize', this.updateWindowDimensions);
	}
	componentWillUnmount(){
		clearInterval(this.timerID);
		window.removeEventListener('resize', this.updateWindowDimensions);
	}
	componentDidUpdate() {
		this.updateCanvas();
	}

	updateWindowDimensions() {
		let width	= window.innerWidth;
		if (width && width >575)
			width -= 320;	//Buffer for not x-small
		else
			width -= 120;	//Buffer for x-small
		let height	= window.innerHeight;
		height	-= 280;	//Buffer...
		if (height < 0)
			height = 0;
		this.setState({
			width: width, 
			height: height
		});
		for(let i=0; i<this.balls.length; i++){
			this.balls[i].maxHeight	= height;
			this.balls[i].maxWidth	= width;
		}
		return;
	}
	updateCanvas(){
		const canvas	= this.canvasRef;
		const ctx		= canvas.getContext('2d');
		ctx.beginPath();
		ctx.rect(0,0, this.state.width, this.state.height);
		ctx.fillStyle = "#FF0000";
		ctx.fill();
		if(this.state.width){
			if (this.isStarted === false){
				//init balls
				this.balls.push(
					new Ball({
						canvas:		canvas, 
						ballID:		"ball0", 
						xInit:		41, 
						yInit:		41,
						maxHeight:	this.state.height,
						maxWidth:	this.state.width
					})
				);
				this.balls[0].draw();
				this.isStarted = true;
			}
			else{
				//animate balls
				for(let i=0; i<this.balls.length; i++){
					const ball	= this.balls[i];
					ball.updateSpeed();
					ball.updateCoordinates(this.state.height, this.balls);
					ball.updateTrajectory(this.balls);
					ball.draw();
				}
			}
		}
	}

	render(){
		const penStyle	= {
			border:	"1px solid #000000"
		};
		return (
			<div>
				<canvas
					ref={canvas => this.canvasRef = canvas}
					width={this.state.width}
					height={this.state.height}
					style={penStyle}
					onClick={e =>{
							const rect = this.canvasRef.getBoundingClientRect();
							const xMousePos	= e.clientX;
							const yMousePos	= e.clientY;
							const xCanvasPos	= xMousePos - rect.left;
							const yCanvasPos	= yMousePos - rect.top;
							const radius		= this.balls[0].radius;
							let isLegalBall	= true;
							let didClickBall	= false;
							for(let i=0; i<this.balls.length; i++){
								const ball			= this.balls[i];
								const xBall			= ball.xCord;
								const yBall			= ball.yCord;
								const xDiff			= xCanvasPos - xBall;
								const yDiff			= yCanvasPos - yBall;
								const ballMouseDistance	= Math.sqrt(xDiff*xDiff + yDiff*yDiff);
								const clickedBall = ballMouseDistance <= radius;
								if (isLegalBall)
									isLegalBall			= ballMouseDistance >= (radius*2);
								if(clickedBall){
									ball.accelerate();
									didClickBall	= true;
									break;
								}
							}//end i-for
							if(isLegalBall){
								//Check with top, bottom, and sides;
								if (xCanvasPos - radius < 0)
									isLegalBall = false;
								else if (xCanvasPos + radius > this.state.width)
									isLegalBall = false;
								else if (yCanvasPos - radius < 0)
									isLegalBall = false;
								else if (yCanvasPos + radius > this.state.height)
									isLegalBall = false;
							}
							if(!didClickBall){
								//Make new ball;
								if(isLegalBall){
									console.log('Making new ball' + this.balls.length)
									const canvas	= this.canvasRef;
									const newBall	= new Ball({
										canvas:		canvas, 
										ballID:		"ball" + this.balls.length, 
										xInit:		xCanvasPos, 
										yInit:		yCanvasPos,
										maxHeight:	this.state.height,
										maxWidth:	this.state.width
									});
									this.balls.push(newBall);
								}
								else
									console.log('Not legal ball');
							}
						}
					}
				/>
			</div>
		);
	}
}

ReactDOM.render(
	<BallPen />,
	document.getElementById('ball-pen')
);

