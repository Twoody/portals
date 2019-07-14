'use strict';
class Ball{
	constructor(props){
		this.canvas			= props.canvas;
		this.ballID			= props.ballID;
		this.index			= props.index;
		this.color			= "blue";
		this.xCord			= props.xInit;
		this.yCord			= props.yInit;
		this.xPrev			= null;
		this.yPrev			= null;
		this.radius			= props.radius;;
		this.mass			= Math.pow(this.radius, 3);
		this.dy				= 2;
		this.dx				= 1.05;
		this.dxAllowed		= this.dx;	//Not always allowed to do full movement;
		this.dyAllowed		= this.dy;
		this.gravity		= 0.05;
		this.friction		= 0.1;
		this.drag			= 0.01;
		this.isGoingRight	= true;
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
	updateCoordinates(){
		this.xPrev	= this.xCord;
		this.yPrev	= this.yCord;
		if(this.isGoingRight)
			this.xCord += this.dxAllowed;
		else
			this.xCord -= this.dxAllowed;
		this.yCord += this.dyAllowed;
		//console.log('y:' + this.yCord);
		//console.log('x:' + this.xCord);
	}
	handleCollisions(width, height, otherBalls){
		/*
		This physics engine is designed to prohibit objects penetrating each other, 
		it works only on non-penetrating rigid bodies. Detecting a penetration 
		(overlap) between objects means that a collision has occurred. We then back 
		up in time to just before the collision – so the objects are not 
		overlapping – and apply an impulse to reverse the collision.
			- https://www.myphysicslab.com/develop/docs/Engine2D.html#themathbehindthephysicsengine
		*/
		this.handleWallCollisions(width, height);
		this.handleBallCollisions(otherBalls);
		this.handleScreenResize(width, height);
	}//end handleCollisions()

	handleWallCollisions(width, height){
		let leftBound		= this.xCord - this.radius + this.dxAllowed;
		let rightBound		= this.xCord + this.radius + this.dxAllowed;
		let topBound		= this.yCord - this.radius + this.dyAllowed;
		let bottomBound	= this.yCord + this.radius + this.dyAllowed;
		if(leftBound < 0){
			//Overlapping containers left side;
			this.updateAllowedMovement(0, this.yCord + this.dyAllowed, this.radius);
			this.dx -= this.friction;
			this.isGoingRight = !this.isGoingRight;
			console.log('Hit Left');
		}
		if(rightBound > width){
			//Overlapping containers left side;
			this.updateAllowedMovement(width, this.yCord + this.dyAllowed, this.radius);
			this.dx -= this.friction;
			this.isGoingRight = !this.isGoingRight;
		}
		if(topBound < 0){
			//Overlapping containers left side;
			this.updateAllowedMovement(this.xCord + this.dxAllowed, 0, this.radius);
			this.dy += this.friction;
			this.dy	*= -1;
			console.log('Hit top');
		}
		if(bottomBound > height){
			//Overlapping containers left side;
			this.updateAllowedMovement(this.xCord + this.dxAllowed, height, this.radius);
			this.dy -= this.friction;
			if(this.dy < 0){
				//No more momemntum to go back up
				this.dy = 0;
				this.dx -= this.friction;
				if(this.dx < 0)
					this.dx = 0;
			}
			else{
				this.dy	*= -1;
			}
		}

	}//end handleWallCollisions()
	updateAllowedMovement(xBound, yBound, minDistance){
		//Draw a line from current position to parameter positions;
		//While line is greatere than minDistance, subtract from what is allowed;
		const frames		= 100;
		const dxRatio		= this.dxAllowed / frames;
		const dyRatio		= this.dyAllowed / frames;
		let frameCount		= 1;
		let nextDistance	= this.getNextDistance(xBound, yBound);
		while(nextDistance < minDistance){
			if(this.isGoingRight){
				//Move back left
				this.dxAllowed	+= dxRatio;
			}
			else{
				//Move backright 
				this.dxAllowed	-= dxRatio;
			}
			this.dyAllowed	-= dyRatio;
			nextDistance	= this.getNextDistance(xBound, yBound);
		}
	}
	handleBallCollisions(otherBalls){
		for (let i=0; i<otherBalls.length; i++){
			let otherBall	= otherBalls[i];
			if(otherBall.ballID === this.ballID)
				continue;
			const combinedR	= this.radius + otherBall.radius;
			const distance		= this.getNextDistance(otherBall.xCord, otherBall.yCord);
			if(combinedR >= distance)
				continue;
			//Else, we have a collision;
		}
	}//end handleBallCollisions()
	handleScreenResize(width, height){
		let leftBound		= this.xCord - this.radius;
		let rightBound		= this.xCord + this.radius;
		let topBound		= this.yCord - this.radius;
		let bottomBound	= this.yCord + this.radius;
		if(leftBound < 0){
			//Overlapping containers left side;
			this.dxAllowed = 0;
			this.xCord		= 0 + this.radius;
			this.dx -= this.friction;
			this.isGoingRight = !this.isGoingRight;
		}
		if(rightBound > width){
			//Overlapping containers left side;
			this.dxAllowed = 0;
			this.xCord		= width - this.radius;
			this.dx -= this.friction;
			this.isGoingRight = !this.isGoingRight;
		}
		if(topBound < 0){
			//Overlapping containers left side;
			this.dyAllowed = 0;
			this.yCord		= 0+this.radius;
			this.dy += this.friction;
			this.dy	*= -1;
		}
		if(bottomBound > height){
			//Overlapping containers left side;
			this.dyAllowed = 0;
			this.yCord		= height - this.radius;
			this.dy -= this.friction;
			this.dy	*= -1;
		}
	}
	getNextDistance(otherX, otherY){
		const xDiff		= this.xCord + this.dxAllowed - otherX;
		const yDiff		= this.yCord + this.dyAllowed - otherY;
		const distance	= Math.sqrt( xDiff**2 + yDiff**2  );
		return distance;
	}
	getDistanceBetween(otherX, otherY){
		const xDiff		= this.xCord - otherX;
		const yDiff		= this.yCord - otherY;
		const distance	= Math.sqrt( xDiff**2 + yDiff**2  );
		return distance;
	}

	isStatic(width, height){
		//Ball is static if the friction from the container stops the movement
		//	at the point we change directions.
		// I.e. there is no more momentum after the friction interaction;
		if(this.yCord-this.radius < height){
			return false;
		}
		if( this.dx > 0 )
			return false;
		console.log(this.ballID + ' IS STATIC');
		return true;
	}
	applyGravity(){
		this.dy += this.gravity;
	}
	isInBounds(width, height){
		
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
		return;
	}
	updateCanvas(){
		//TODO: Check if bottom layer is maxed out on objects;
		//			If bottom layer is maxed out on objects, and all items are static,
		//			Add an additional layer to the top of the canvas for any extra balls;
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
						index:		0, 
						xInit:		61, 
						yInit:		41,
						radius:		30,
					})
				);
				this.balls[0].draw();
				this.isStarted = true;
			}
			else{
				//animate balls
				for(let i=0; i<this.balls.length; i++){
					const ball	= this.balls[i];
					if(ball.isStatic(this.state.width, this.state.height)){
						ball.draw();
						continue;
					}
					ball.applyGravity();
					ball.dxAllowed = ball.dx;
					ball.dyAllowed = ball.dy;
					ball.handleCollisions(this.state.width, this.state.height, this.balls);
					ball.updateCoordinates();
					ball.draw();
				}
			}
		}
	}//end updateCanvas()

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
								if (isLegalBall){
									isLegalBall			= ballMouseDistance >= (radius*2);
								}
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
										index:		this.balls.length, 
										xInit:		xCanvasPos, 
										yInit:		yCanvasPos,
										radius:		30,
									});
									this.balls.push(newBall);
								}
								else{
									console.log('Not legal ball');
								}
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
	document.getElementById('ball-pen-99')
);

