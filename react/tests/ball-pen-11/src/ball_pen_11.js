'use strict';
const initRadius = 30;

class BallPen extends React.Component{
   constructor(props){
      super(props);
      this.state      = {
         height: 0,
         width:  0,
      };
		this.balls    = [];
		this.friction = 1.0;
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
   }
	handleCanvasClick(canvas, xClick, yClick){
		const rect			= canvas;
		const xMousePos	= xClick;
		const yMousePos	= yClick;;
		const xCanvasPos	= xMousePos - rect.left;
		const yCanvasPos	= yMousePos - rect.top;
		let isLegalBall	= true;	//Will try to make false;
		let didClickBall	= false;
		for(let i=0; i<this.balls.length; i++){
			//See if ball is clicked;
			//If ball not clicked, see if new ball is still possible;
			const ball			= this.balls[i];
			const xBall			= ball.xCord;
			const yBall			= ball.yCord;
			const xDiff			= xCanvasPos - xBall;
			const yDiff			= yCanvasPos - yBall;
			const radius		= this.balls[i].radius;
			const ballMouseDistance	= Math.sqrt(xDiff**2 + yDiff**2);
			const clickedBall			= ballMouseDistance <= radius;
			if (isLegalBall)
				isLegalBall = ballMouseDistance >= (radius + initRadius);
			if(clickedBall){
				ball.accelerate();
				didClickBall = true;
				break;
			}
		}//end i-for
		if(isLegalBall){
			//Check with top, bottom, and sides;
			if (xCanvasPos - initRadius < 0)
				isLegalBall = false;
			else if (xCanvasPos + initRadius > this.state.width)
				isLegalBall = false;
			else if (yCanvasPos - initRadius < 0)
				isLegalBall = false;
			else if (yCanvasPos + initRadius > this.state.height)
				isLegalBall = false;
		}
		if(!didClickBall){
			//Make new ball;
			if(isLegalBall){
				console.log('Making new ball' + this.balls.length)
				const newBall	= new Ball({
					ballID:	this.balls.length,
					xCord:	xCanvasPos,
					yCord:	yCanvasPos,
					radius:	initRadius,
					dx: 		2,
					dy:		2
				});
				this.balls.push(newBall);
			}
			else
				console.log('Not legal ball');
		}
	}  
   componentDidMount() {
      this.updateWindowDimensions();
      this.updateCanvas();
      this.timerID   = setInterval(
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
      let width   = window.innerWidth;
      if (width && width >575)
         width -= 320;   //Buffer for not x-small
      else
         width -= 120;   //Buffer for x-small
      let height   = window.innerHeight;
      height   -= 280;   //Buffer...
      if (height < 0)
         height = 0;
      this.setState({
         width: width, 
         height: height
      });

		//Move balls around if conflict;
		//Change radius if conflict;
		for(let i=0; i<this.balls.length; i++){
			let ball			= this.balls[i];
			let ballBottom	= ball.yCord + ball.radius;
			let ballTop		= ball.yCord - ball.radius;
			if(ballBottom > height){
				ball.yCord = height - ball.radius;
				ball.accelerate();
				ball.radius *= 0.9;
			}
			if(ballTop <= 0){
				ball.radius *= 0.9;
			}
			for(let j=i+1; j<this.balls.length; j++){
				let otherBall = this.balls[j];
				const minDistance = ball.radius + otherBall.radius;
				const curDistance	= ball.distanceBetween(
					ball.xCord,
					ball.yCord,
					otherBall.xCord,
					otherBall.yCord,
				);
				if(curDistance < minDistance)
					ball.radius *= 0.9;
			}
		}//end i-for
      return;
   }
   updateCanvas(){
      const canvas   = this.canvasRef;
      const ctx      = canvas.getContext('2d');
      ctx.beginPath();
      ctx.rect(0,0, this.state.width, this.state.height);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
		if(this.state.width !== 0){
			if(this.balls.length === 0){
				// Init first ball
				this.balls.push(
					new Ball({
						ballID:	0,
						xCord:	41,
						yCord:	41,
						radius:	initRadius,
						dx: 		2,
						dy:		2
					})
				);
			}// End first ball init;
			for(let i=0; i<this.balls.length; i++){
				let ball	= this.balls[i];

				//Assume we can go any direction first; Change values on `handle`*;
				ball.canGoUp		= true;
				ball.canGoDown		= true;
				ball.canGoLeft		= true;
				ball.canGoRight	= true;

				//Set wanted coordinates based off of previous movement;
				if(ball.isGoingUp)
					ball.nextY = ball.yCord - ball.dy;
				else if(ball.isGoingDown)
					ball.nextY = ball.yCord + ball.dy;
				if(ball.isGoingLeft)
					ball.nextX = ball.xCord - ball.dx;
				else if(ball.isGoingRight)
					ball.nextX = ball.xCord + ball.dx;
				
				//See if expected coordinates will prevent us from going certain directions;
				ball.handleBoundaries(this.state.width, this.state.height, this.balls);
				ball.handleWallCollisions(this.state.width, this.state.height, this.friction);
				ball.handleBallCollisions(this.balls);

				ball.handleMovement();

				ball.updateCoordinates();
				ball.applyGravity();

				ball.draw(ctx);
				ball.label(ctx);
			}//end i-for
		}//end if state.width clarity check;
   }

   render(){
      const penStyle   = {
         border:   "1px solid #000000"
      };
      return (
         <div>
            <canvas
               ref={canvas => this.	canvasRef = canvas}
               width={this.state.width}
               height={this.state.height}
               style={penStyle}
					onClick={e => {
						const canvas	= this.canvasRef.getBoundingClientRect();
						const xClick	= e.clientX;
						const yClick	= e.clientY;
						this.handleCanvasClick(canvas, xClick, yClick);
					}}
            />
         </div>
      );
   }
}

ReactDOM.render(
	<BallPen />,
	document.getElementById('ball-pen-11')
);
