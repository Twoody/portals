'use strict';
class Ball{
	constructor(props){
		this.isGoingRight	= true;
		this.isGoingDown	= true;
		this.yHasMomentum	= true;
		this.xHasMomentum	= true;
		this.xCord			= props.xInit;
		this.yCord			= props.yInit;
		this.radius			= 30;
		this.xSpeed			= 2;
		this.ySpeed			= 1.05;
		this.gravity		= 0.5;
		this.friction		= 0.15;
		this.color			= "white";
		this.ballID			= props.ballID;
		this.canvas			= props.canvas;
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
		ctx.fillStyle = "blue";
		ctx.fill();
	}
	accelerate(){
		console.log('accelerating ball: ' + this.ballID);
		this.ySpeed += 5;
		this.xSpeed += 2;
		this.xHasMomentum = true;
		this.yHasMomentum = true;
	}
	updateCoordinates(maxHeight, otherBalls){
		if(this.yHasMomentum){
			//Still bouncing;
			if(this.isGoingDown === true){
				this.ySpeed += this.gravity;
				this.yCord += this.ySpeed;
			}
			else{
				//We are going up;
				this.ySpeed -= this.gravity;
				this.yCord -= this.ySpeed;
			}
		}
		else if(this.xSpeed <= 0)
			this.xHasMomentum = false;
		if(this.xHasMomentum){
			if(!this.yHasMomentum)	//Ball is stuck to the ground;
				this.xSpeed -= this.friction
			if(this.xSpeed <=0)
				this.xHasMomentum = false;
			else{
				if (this.isGoingRight === true)
					this.xCord += this.xSpeed;
				else
					this.xCord -= this.xSpeed;
			}
		}
	}//End updateCoordinates()

	updateTrajectory(penHeight, penWidth, otherBalls){
		//Will need to update to allow for multiple heights and widths
		//	and then find the best/only solution;
		const rightBound	= this.xCord + this.radius;
		const leftBound	= this.xCord - this.radius;
		const hitTop		= this.hitTop();
		const hitBottom	= this.hitBottom(penHeight);
		this.yHasMomentum = true;
		//Container Check - Top/Bottom
		if(hitBottom === true && this.ySpeed <= 0){
			this.yHasMomentum = false;
			this.yCord	= penHeight - this.radius;
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
			this.isGoingDown = false;
			this.yCord	= penHeight - this.radius;
			this.ySpeed -= this.friction;
		}

		//Container Check - Sides
		if (leftBound <= 0){
			this.isGoingRight	= true;
			this.xCord	= 0 + this.radius;
			this.ySpeed -= this.friction;
			this.xSpeed -= this.friction;
		}
		else if (rightBound >= penWidth){
			this.isGoingRight	= false;
			this.xCord	= penWidth - this.radius;
			this.ySpeed -= this.friction;
			this.xSpeed -= this.friction;
		}

		//Check Other Balls
		for( let i=0; i<otherBalls.length; i++){
			const otherBall	= otherBalls[i];
			if(otherBall.ballID	=== this.ballID)
				continue;
			const distanceBetween	= this.getDistanceBetween(otherBall);
			const minimumDistancePossible	= this.radius + otherBall.radius;
			const isTouching			= distanceBetween < minimumDistancePossible;
			if(isTouching)
				console.log(this.ballID + ' is touching ' + otherBall.ballID);
			else
				console.log('not touching: D1(' +distanceBetween+ '); D2(' + minimumDistancePossible + ")");

		}//end i-for
	}//End updateTrajectory()

	hitBottom(penHeight){
		const bottomBound	= this.yCord + this.radius;
		if (bottomBound >= penHeight)
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
		//Get the distance between two different objects;
		const xDiff		= this.xCord - otherBall.xCord;
		const yDiff		= this.yCord - otherBall.yCord;
		const distance	= Math.sqrt(xDiff*xDiff + yDiff*yDiff);
		return distance;
	}
}
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
		const canvas	= this.canvasRef;
		const ctx		= canvas.getContext('2d');
		ctx.beginPath();
		ctx.rect(0,0, this.state.width, this.state.height);
		ctx.fillStyle = "#FF0000";
		ctx.fill();
		if (this.isStarted === false){
			//init balls
			this.balls.push(new Ball({canvas: canvas, ballID: "ball0", xInit:21, yInit:41}));
			this.balls[0].draw();
			this.isStarted = true;
		}
		else{
			//animate balls
			for(let i=0; i<this.balls.length; i++){
				const ball	= this.balls[i];
				ball.updateCoordinates(this.state.height, this.balls);
				ball.updateTrajectory(this.state.height, this.state.width, this.balls);
				ball.draw();
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
							let didClickBall	= false;
							for(let i=0; i<this.balls.length; i++){
								const ball			= this.balls[i];
								const xBall			= ball.xCord;
								const yBall			= ball.yCord;
								const xDiff			= xCanvasPos - xBall;
								const yDiff			= yCanvasPos - yBall;
								const ballMouseDistance	= Math.sqrt(xDiff*xDiff + yDiff*yDiff);
								const clickedBall = ballMouseDistance <= ball.radius;
								if(clickedBall){
									ball.accelerate();
									didClickBall	= true;
									break;
								}
							}//end i-for
							if(!didClickBall){
								//Make new ball;
								console.log('Making new ball' + this.balls.length)
								const canvas	= this.canvasRef;
								const newBall	= new Ball({
									canvas:	canvas, 
									ballID:	"ball" + this.balls.length, 
									xInit:	xCanvasPos, 
									yInit:	yCanvasPos
								});
								this.balls.push(newBall);
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

