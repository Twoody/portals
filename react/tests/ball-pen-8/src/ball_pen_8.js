'use strict';
class Ball{
	constructor(properties){
		this.canvas			= properties.canvas;
		this.ballID			= properties.ballID;
		this.x				= properties.x;
		this.y				= properties.y;
		this.radius			= properties.radius;
		this.elasticity	= 0.65
		this.color			= "blue";
		this.xVelocity		= 2;
		this.yVelocity		= 5;
		this.nextX	= this.x + this.xVelocity;
		this.nextY	= this.y + this.yVelocity;
		this.mass	= this.radius*3;
		this.hasFriction	= false;
		this.hasGravity	= false;
	}
	draw(){
		const ctx = this.canvas.getContext('2d');
		this.x = this.nextX;
		this.y = this.nextY;
		ctx.beginPath();
		ctx.arc(
			this.x,
			this.y, 
			this.radius,
			2*Math.PI,		//Start angle in radians
			0					//End angle in radians
		);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	applyGravity(maxHeight, gravity){
		if(this.y + this.radius < maxHeight)
			this.yVelocity += gravity;
	}
	applyElasticity(){
		this.yVelocity *= -1 * this.elasticity;
	}
	applyFriction(friction){
		this.xVelocity = this.xVelocity - (this.xVelocity*friction);
		//this.yVelocity = this.yVelocity - (this.yVelocity*friction);
	}
	updateBall(maxWidth, maxHeight, friction, allBalls, gravity){
		if(this.hasGravity && this.y + this.radius <= maxHeight)
			this.applyGravity(maxHeight, gravity);
		this.nextX	= this.x + this.xVelocity;
		this.nextY	= this.y + this.yVelocity;
		this.x	= this.x + this.xVelocity;
		this.y	= this.y + this.yVelocity;
		this.handleWallCollisions(maxWidth, maxHeight, friction);
		this.handleBallCollisions(maxWidth, maxHeight, friction, allBalls);
	}
	handleWallCollisions(maxWidth, maxHeight, friction){
		if (this.nextX > maxWidth-this.radius){
			if(this.hasFriction)
				this.applyFriction(friction);
			this.xVelocity *= -1;
			this.nextX		= maxWidth-this.radius;
		} 
		if(this.nextX < this.radius){
			if(this.hasFriction)
				this.applyFriction(friction);
			this.xVelocity *= -1;
			this.nextX		= this.radius;
		}
		if (this.nextY > maxHeight-this.radius){
			if(this.hasGravity)
				this.applyElasticity();
			else
				this.yVelocity *= -1;
			if(this.hasFriction)
				this.applyFriction(friction);
			this.nextY		= maxHeight-this.radius;
		} 
		if(this.nextY < this.radius){
			if(this.hasFriction)
				this.applyFriction(friction);
			this.yVelocity *= -1;
			this.nextY		= this.radius;
		}
	}
	handleBallCollisions(maxWidth, maxHeight, friction, allBalls){
		for(let i=0; i<allBalls.length; i++){
			let otherBall = allBalls[i];
			if(otherBall.ballID === this.ballID)
				continue;
			const willCollide = this.isCollidingWith(otherBall);
			if( !willCollide )
				continue;
			//Else, update velocity and direction between balls;
			otherBall.nextX	= otherBall.x + otherBall.xVelocity;
			otherBall.nextY	= otherBall.y + otherBall.yVelocity;
			const collisionAngle	= this.getCollisionAngle(otherBall);

			const mass1				= this.mass;
			const speed1 			= this.getSpeed();
			const direction1		= this.getDirection();
			const xVelocity1		= speed1 * Math.cos(direction1 - collisionAngle);
			const yVelocity1		= speed1 * Math.sin(direction1 - collisionAngle);

			const mass2				= otherBall.mass;
			const speed2 			= otherBall.getSpeed();
			const direction2		= otherBall.getDirection();
			const xVelocity2		= speed2 * Math.cos(direction2 - collisionAngle);
			const yVelocity2		= speed2 * Math.sin(direction2 - collisionAngle);

			const mDiff1			= mass1 - mass2;
			const mDiff2			= mass2 - mass1;
			const mass3				= mass1 + mass2;
		
			const xVelocityFinal1	= ((mDiff1) * xVelocity1 + (mass2 * 2) * xVelocity2) / mass3;
			//var final_velocityx_1 = ((ball1.mass - ball2.mass) * velocityx_1 + 
			//    (ball2.mass + ball2.mass) * velocityx_2)/(ball1.mass + ball2.mass);
			const xVelocityFinal2	= ((mass3) * xVelocity1 + (mDiff2) * xVelocity2) / mass3;
			//var final_velocityx_2 = ((ball1.mass + ball1.mass) * velocityx_1 + 
			//    (ball2.mass - ball1.mass) * velocityx_2)/(ball1.mass + ball2.mass);

			//Rotate angles back to preserve collision angle;
			const xLengthOfSide			= Math.cos(collisionAngle);
			const xLengthOfReflection	= Math.cos(collisionAngle + Math.PI/2);
			const yLengthOfSide			= Math.sin(collisionAngle);
			const yLengthOfReflection	= Math.sin(collisionAngle + Math.PI/2);
			this.xVelocity			= xLengthOfSide * xVelocityFinal1 + xLengthOfReflection * yVelocity1;
			otherBall.xVelocity	= xLengthOfSide * xVelocityFinal2 + xLengthOfReflection * yVelocity1;
			this.yVelocity			= yLengthOfSide * xVelocityFinal1 + yLengthOfReflection * yVelocity1;
			otherBall.yVelocity	= yLengthOfSide * xVelocityFinal2 + yLengthOfReflection * yVelocity2;

			//Update next coordinates for both balls;
			this.nextX			= this.x + this.xVelocity;
			this.nextY			= this.y + this.yVelocity;
			this.x				= this.x + this.xVelocity;
			this.y				= this.y + this.yVelocity;
			//otherBall.handleWallCollisions(maxWidth, maxHeight, friction);
		}//end i-for
	}
	isCollidingWith(otherBall){
		const rCombined		= this.radius + otherBall.radius;
		//const	xDiff				= this.nextX - otherBall.x;
		//const	yDiff				= this.nextY - otherBall.y;
		const	xDiff				= this.nextX - otherBall.nextX;
		const	yDiff				= this.nextY - otherBall.nextY;
		const distance			= Math.sqrt(xDiff**2 + yDiff**2);
		if(!distance)
			console.log('WARNING: DISTANCE NOT CALCULABLE');
		if(distance >= rCombined)
			return false;
		return true;
	}
	getSpeed(){
		const speed = Math.sqrt(this.xVelocity**2 + this.yVelocity**2);
		return speed;
	}
	getDirection(){
		const direction = Math.atan2(this.yVelocity, this.xVelocity);
		return direction;
	}
	getCollisionAngle(otherBall){
		//const xDiff = this.nextX - otherBall.x;
		//const yDiff = this.nextY - otherBall.y;
		const	xDiff				= this.nextX - otherBall.nextX;
		const	yDiff				= this.nextY - otherBall.nextY;
		const angle =  Math.atan(yDiff, xDiff);
		if(!angle)
			console.log('WARNING: COLLISION ANGLE NOT CALCULABLE');
		return angle;
	}
}//End Ball Class
class BallPen extends React.Component{
   constructor(props){
      super(props);
      this.state      = {
         height: 0,
         width:  0,
      };
		this.balls	= [];
		this.friction		= 0.5;
		this.gravity		= 0.1;
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
						canvas:	canvas,
						ballID:	this.balls.length,
						x:			41,
						y:			41,
						radius:	30,
					})
				);
			}// End first ball init;
			for(let i=0; i<this.balls.length; i++){
				let ball	= this.balls[i];
				ball.updateBall(
					this.state.width, 
					this.state.height, 
					this.friction, 
					this.balls, 
					this.gravity
				);
				ball.draw();
			}//end i-for
		}
   }

   render(){
      const penStyle   = {
         border:   "1px solid #000000"
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
								const xBall			= ball.x;
								const yBall			= ball.y;
								const xDiff			= xCanvasPos - xBall;
								const yDiff			= yCanvasPos - yBall;
								const ballMouseDistance	= Math.sqrt(xDiff**2 + yDiff**2);
								const clickedBall = ballMouseDistance <= radius;
								if (isLegalBall)
									isLegalBall			= ballMouseDistance >= (radius*2);
								if(clickedBall){
									//ball.accelerate();
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
										canvas:	canvas,
										ballID:	this.balls.length,
										x:			xCanvasPos,
										y:			yCanvasPos,
										radius:	30,
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
	document.getElementById('ball-pen-8')
);
