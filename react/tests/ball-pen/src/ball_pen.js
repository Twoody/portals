'use strict';
class Ball{
	constructor(props){
		this.xCord			= 21;
		this.yCord			= 21;
		this.radius			= 20;
		this.trajectory	= 120;	//In degrees; 0 to 359
		this.acceleration	= 0;
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
		const xBound1	= this.xCord + this.radius;
		const xBound2	= this.xCord - this.radius;
		const yBound1	= this.yCord + this.radius;
		const yBound2	= this.yCord - this.radius;
		if (xBound1 >= penWidth || xBound2 <= 0){
			this.trajectory += 180;
			if (xBound2 < 0)
				this.xCord	= 0 + this.radius + 1;
			else if (xBound1 > penWidth)
				this.xCord	= penWidth - this.radius -1;
		}
		else if (yBound1 >= penHeight || yBound2 <= 0){
	//	if (this.yCord >= penHeight || this.yCord <= 0){
			this.trajectory += 180;
			if (yBound2 < 0)
				this.yCord	= 0 + this.radius + 1;
			else if (yBound1 > penHeight)
				this.yCord	= penHeight - this.radius - 1;
		}
		if(this.trajectory >=360)
			this.trajectory -= 360;	//reset back between 0 and 359;
	}
	updateCoordinates(){
		if (this.trajectory >= 330 && this.trajectory <360){			//1
			//up one;
			this.yCord = this.yCord - 1;
			this.xCord = this.xCord;
		}
		else if (this.trajectory >= 0 && this.trajectory <15){			//1
			//up one;
			this.yCord = this.yCord - 1;
			this.xCord = this.xCord;
		}

		else if (this.trajectory >= 15 && this.trajectory <60){		//2
			//up one; right one;
			this.yCord = this.yCord - 1;
			this.xCord = this.xCord + 1;
		}
		else if (this.trajectory >= 60 && this.trajectory <105){		//3
			//right one;
			this.yCord = this.yCord;
			this.xCord = this.xCord + 1;
		}
		else if (this.trajectory >= 105 && this.trajectory <150){	//4
			//down one; right one;
			this.yCord = this.yCord + 1;
			this.xCord = this.xCord + 1;
		}
		else if (this.trajectory >= 150 && this.trajectory <195){	//5
			//down one;
			this.yCord = this.yCord + 1;
			this.xCord = this.xCord;
		}
		else if (this.trajectory >= 195 && this.trajectory <240){	//6
			//down one; left one;
			this.yCord = this.yCord + 1;
			this.xCord = this.xCord - 1;
		}
		else if (this.trajectory >= 240 && this.trajectory <285){	//7
			//left one;
			this.yCord = this.yCord;
			this.xCord = this.xCord - 1;
		}
		else if (this.trajectory >= 285 && this.trajectory <330){	//8
			//up one; left one;
			this.yCord = this.yCord - 1;
			this.xCord = this.xCord - 1;
		}
		else{
			console.log('BALL TRAJECTORY OUT OF BOUNDS');
		}
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
			10
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
			this.ball.updateCoordinates();
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

