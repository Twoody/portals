'use strict';
class Ball{
	constructor(properties){
		this.canvas		= properties.canvas;
		this.ballId		= properties.ballID;
		this.x			= properties.x;
		this.y			= properties.y;
		this.radius		= properties.radius;
		this.color		= "blue";
		this.speed		= 5;
		this.angle		= 45;
		this.radians	= this.angle * Math.PI/180;
		this.dx	= Math.cos(this.radians) * this.speed;	//The change in our x coordinate
		this.dy	= Math.sin(this.radians) * this.speed;	//The change in our y coordinate
	}
	draw(){
		const ctx = this.canvas.getContext('2d');
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
	updateBall(maxWidth, maxHeight){
		this.handleWallCollisions(maxWidth, maxHeight);
		this.radians = this.angle * Math.PI/180;
		this.dx	= Math.cos(this.radians) * this.speed;	//The change in our x coordinate
		this.dy	= Math.sin(this.radians) * this.speed;	//The change in our y coordinate
		this.x	+= this.dx;
		this.y	+= this.dy;
	}
	handleWallCollisions(maxWidth, maxHeight){
		if (this.x > maxWidth-this.radius || this.x < this.radius ){
			this.angle = 180 - this.angle;	//Angle of reflection
		} 
		else if (this.y > maxHeight-this.radius || this.y < this.radius){
			this.angle = 360 - this.angle;	//Angle of reflection
		}

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
						ballId:	0,
						x:			41,
						y:			41,
						radius:	30,
					})
				);
			}// End first ball init;
			for(let i=0; i<this.balls.length; i++){
				let ball	= this.balls[i];
				ball.updateBall(this.state.width, this.state.height);
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
            />
         </div>
      );
   }
}

ReactDOM.render(
	<BallPen />,
	document.getElementById('ball-pen-8')
);
