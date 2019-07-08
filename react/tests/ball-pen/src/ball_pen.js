'use strict';
class Ball{
	constructor(props){
		this.xCord			= 21;
		this.yCord			= 21;
		this.radius			= 20;
		this.xTrajectory	= 2;
		this.yTrajectory	= 2;
		this.acceleration	= 0;
		this.gravity		= 0.05;
		this.color			= "white";
		this.ballId			= props.ballId;
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
	updateTrajectory(penHeight, penWidth){
		//Will need to update to allow for multiple heights and widths
		//	and then find the best/only solution;
		const rightBound	= this.xCord + this.radius;
		const leftBound	= this.xCord - this.radius;
		const bottomBound	= this.yCord + this.radius;
		const topBound		= this.yCord - this.radius;
		if (leftBound <= 0){
			this.xTrajectory = -this.xTrajectory;;
			this.xCord	= 0 + this.radius + 1;
		}
		else if (rightBound >= penWidth){
			this.xTrajectory = -this.xTrajectory;;
			this.xCord	= penWidth - this.radius -1;
		}
		else if (topBound <= 0){
			this.yTrajectory = -this.yTrajectory;;
			this.yCord	= 0 + this.radius + 1;
		}
		else if (bottomBound >= penHeight){
			this.acceleration += 1;
			this.yTrajectory = -this.yTrajectory;;
			this.yCord	= penHeight - this.radius - 1;
		}
	}
	updateCoordinates(maxHeight){
		//Commented out until we get acceleration and gravity on track;
		//if (this.acceleration <= 0 && (this.yCord+this.radius >=maxHeight)){
			//stuck on the floor with no movement;
		//	return;
		//}
		if(this.yTrajectory > 0){
			//We are going down;
			//Gravity increases;
		}
		else{
			//We are going up;
		}
		this.xCord += this.xTrajectory;
		this.yCord += this.yTrajectory;
	}
}
class BallPen extends React.Component{
	constructor(props){
		super(props);
		this.state		= {
			height: 0,
			width: 0,
		};
		this.ball		= null;
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
		const canvas	= this.refs.canvas;
		const ctx		= canvas.getContext('2d');
		ctx.beginPath();
		ctx.rect(0,0, this.state.width, this.state.height);
		ctx.fillStyle = "#FF0000";
		ctx.fill();
		if (this.isStarted === false){
			//init balls
			this.ball = new Ball({canvas: canvas, ballID: "ball0"});
			this.ball.draw();
			this.isStarted = true;
		}
		else{
			//animate balls
			//Will need to refigure trajectory and acceleration;
			this.ball.updateTrajectory(this.state.height, this.state.width);
			this.ball.updateCoordinates(this.state.height);
			this.ball.draw();
		}
	}

	render(){
		const penStyle	= {
			border:	"1px solid #000000"
		};
		return (
			<div>
				<h1>
					Height:{this.state.height}
				</h1>
				<h1>
					Width:{this.state.width}
				</h1>
				<canvas
					ref="canvas"
					width={this.state.width}
					height={this.state.height}
					style={penStyle}
				/>
			</div>
		);
	}
}

ReactDOM.render(
	<BallPen />,
	document.getElementById('ball-pen')
);

