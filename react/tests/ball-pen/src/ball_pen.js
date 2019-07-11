'use strict';
class Ball{
	constructor(props){
		this.canvas			= props.canvas;
		this.ballID			= props.ballID;
		this.index			= props.index;
		this.color			= "blue";
		this.xCord			= props.xInit;
		this.yCord			= props.yInit;
		this.radius			= props.radius;;
		this.mass			= Math.pow(this.radius, 3) - this.index;
		this.dy				= 2;
		this.dx				= 1.05;
		this.gravity		= 1.05;
		this.friction		= 0.1;
		this.drag			= 0.01;
	}
	draw(){
		const ctx		= this.canvas.getContext('2d');
		ctx.beginPath();
		ctx.arc(
			(this.xCord),
			(this.yCord), 
			this.radius,
			2*Math.PI,
			false
		);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	updateCoordinates(){
		this.xCord += this.dx;
		this.yCord += this.dy;
	}
	staticCollision(otherBalls){
		for( let i=0; i<otherBalls.length; i++){
			const otherBall	= otherBalls[i];
			if(this.ballID	=== otherBall.ballID)
				continue;
			const combinedR	= this.radius + otherBall.radius;
			const distance		= this.getDistanceBetween(otherBall);
			if( distance > combinedR )
				continue;
			console.log('Static Collision: `'+this.ballID+'` & `'+otherBall.ballID+'`');
			const theta				= this.getThetaBetween(otherBall);
			const overlap			= this.getOverlap(otherBall);
			//TODO: getSmallerBall();
			const smallerBallID	= this.radius <= otherBall.radius ? this.ballID : otherBall.ballID;
			if(smallerBallID === this.ballID){
				this.xCord -= overlap * Math.cos(theta);
				this.yCord -= overlap * Math.sin(theta);
			}
			else{
				otherBall.xCord -= overlap * Math.cos(theta);
				otherBall.yCord -= overlap * Math.sin(theta);
			}
		}//end i-for
	}
	ballCollision(otherBalls){
		for( let i=0; i<otherBalls.length; i++){
			const otherBall	= otherBalls[i];
			if(this.ballID	=== otherBall.ballID){
				continue;
			}
			const distanceNextFrame = this.getDistanceNextFrame(otherBall);
			//console.log('distanceNextFrame: ' + distanceNextFrame);
			if(distanceNextFrame >0){
				continue;
			}
			console.log('Active Collision: `'+this.ballID+'` & `'+otherBall.ballID+'`');
			const theta		= this.getThetaBetween2(otherBall);
			const angle1	= this.getAngle();
			const angle2	= otherBall.getAngle();
			const m1			= this.mass;
			const m2			= otherBall.mass;
			const	v1			= this.getSpeed();
			const v2			= otherBall.getSpeed();
			//TODO: Break this up and explain it;
			const dx1F 		= (v1 * Math.cos(angle1 - theta) * (m1-m2) + 2*m2*v2*Math.cos(angle2 - theta)) / (m1+m2) * Math.cos(theta) + v1*Math.sin(angle1-theta) * Math.cos(theta+Math.PI/2);
			const dy1F		= (v1 * Math.cos(angle1 - theta) * (m1-m2) + 2*m2*v2*Math.cos(angle2 - theta)) / (m1+m2) * Math.sin(theta) + v1*Math.sin(angle1-theta) * Math.sin(theta+Math.PI/2);
			const dx2F		= (v2 * Math.cos(angle2 - theta) * (m2-m1) + 2*m1*v1*Math.cos(angle1 - theta)) / (m1+m2) * Math.cos(theta) + v2*Math.sin(angle2-theta) * Math.cos(theta+Math.PI/2);
			const dy2F		= (v2 * Math.cos(angle2 - theta) * (m2-m1) + 2*m1*v1*Math.cos(angle1 - theta)) / (m1+m2) * Math.sin(theta) + v2*Math.sin(angle2-theta) * Math.sin(theta+Math.PI/2);

			this.dx 			= dx1F;
			this.dy			= dy1F;
			otherBall.dx	= dx2F;
			otherBall.dy	= dy2F;
		}//end i-for
	}//end ballCollision()

	wallCollision(width, height){	
		let didHitWall = false;
		if (this.xCord - this.radius + this.dx < 0 ||
			this.xCord	+ this.radius + this.dx > width) {
			//Will ball hit left or right side?
			this.dx		*= -1;
			didHitWall	= true;
		}
		if (this.yCord - this.radius + this.dy < 0 ||
			this.yCord	+ this.radius + this.dy > height) {
			//Will ball hit top or hit bottom?
			this.dy		*= -1;
			didHitWall	= true;
		}
		if (this.yCord + this.radius > height){
			//Did ball hit bottom?
			this.yCord	= height - this.radius;
			didHitWall	= true;
		}
		if (this.yCord - this.radius < 0){
			//Did ball hit top?
			this.yCord	= this.radius;
			didHitWall	= true;
		}
		if (this.xCord + this.radius > width){
			//Did ball hit right?
			this.xCord	= width - this.radius;
			didHitWall	= true;
		}
		if (this.xCord - this.radius < 0){
			//Did ball hit left?
			this.xCord	= this.radius;
			didHitWall	= true;
		}
		if(didHitWall){
			//console.log('hit wall');
			if(this.dy > 0)
				this.dy -= this.friction;
			else
				this.dy += this.friction;
			if(this.dx > 0)
				this.dx -= this.friction;
			else
				this.dx += this.friction;
		}
		else{
			//console.log('did not hit wall');
		}
	}

	getThetaBetween(otherBall){
		const theta = Math.atan2((this.yCord-otherBall.yCord), (this.xCord - otherBall.xCord));
		return theta;
	}
	getThetaBetween2(otherBall){
		const theta = Math.atan2((otherBall.yCord-this.yCord), (otherBall.xCord - this.xCord));
		return theta;
	}
	getOverlap(otherBall){
		const distance	= this.getDistanceBetween(otherBall);
		const overlap	= this.radius + otherBall.radius - distance;
		return overlap;
	}
	getAngle(){
		return Math.atan2(this.dy, this.dx);
	}
	getSpeed(){
		return Math.sqrt( Math.pow(this.dx, 2) + Math.pow(this.dy, 2) );
	}
	accelerate(){
		console.log('accelerating ball: ' + this.ballID);
		if(this.dy > 0)
			this.dy += 5;
		else
			this.dy -= 5;
		if(this.dx > 0)
			this.dx += 2;
		else
			this.dx -= 2;
	}
	applyGravity(height){
		if (this.onGround(height) === false)
			this.dy += this.gravity;
	}
	applyDrag(){
		this.dx	-= this.drag;
		this.dy	-= this.drag;
	}
	getDistanceBetween(otherBall){
		//Get the distance between `this` and a different object;
		const xDiff		= this.xCord - otherBall.xCord;
		const yDiff		= this.yCord - otherBall.yCord;
		const distance	= Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) );
		return distance;
	}
	getDistanceNextFrame(otherBall) {
		const nextX1		= this.xCord + this.dx;
		const nextX2		= otherBall.xCord + otherBall.dx;
		const nextY1		= this.yCord + this.dy;
		const nextY2		= otherBall.yCord + otherBall.dy;
		const xDiff			= nextX1 - nextX2;
		const yDiff			= nextY1 - nextY2;
		const combinedR	= this.radius + otherBall.radius;
		const distance		= Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff,2) ) - combinedR;
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
	onGround(height){
		return (this.yCord + this.radius >= height)
	}
	isStatic(height){
		if(this.dy <= 0 && this.yCord === height)
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
	//				if(ball.isStatic(this.state.height))
	//					continue;
					ball.applyGravity(this.state.height);
					ball.applyDrag();
					ball.updateCoordinates();
					ball.staticCollision(this.balls);
					ball.ballCollision(this.balls);
					ball.wallCollision(this.state.width, this.state.height);
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
										maxHeight:	this.state.height,
										maxWidth:	this.state.width
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
	document.getElementById('ball-pen')
);

