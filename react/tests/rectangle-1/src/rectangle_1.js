'use strict';
const BACKGROUND_COLOR	= "black";

class BallPen extends React.Component{
   constructor(props){
      super(props);
      this.state      = {
         height:		0,
         width:		0,
			clickTimer:	0,
			xClick:		0,
			yClick:		0,
			isDragging:				false,
      };
		this.middleRectangle	= null;
      this.updateWindowDimensions	= this.updateWindowDimensions.bind(this);
		this.handleKeydown				= this.handleKeydown.bind(this);
		this.handleCanvasMouseDown		= this.handleCanvasMouseDown.bind(this);
		this.handleCanvasMouseMove		= this.handleCanvasMouseMove.bind(this);
		this.handleCanvasMouseUp		= this.handleCanvasMouseUp.bind(this);
   }
	updateMiddleRectangle(){
		const middleCords	= getMiddleOfCanvas(this.state.width, this.state.height);
		const width			= 110;
		const height		= 30;
		const xLeft			= middleCords.x - width/2;
		const yTop			= middleCords.y - height/2;
		const rectangle	= new Rectangle({
			rectID:	0,
			color:	'white',
			xLeft:	xLeft,
			yTop:		yTop,
			width:	width,
			height:	height,
		});
		this.middleRectangle = rectangle;
	}//end updateMiddleRectangle()
	updateBackground(){
     	const canvas	= this.canvasRef;
     	let ctx			= canvas.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = BACKGROUND_COLOR;
		ctx.fillRect(0, 0, this.state.width, this.state.height);
		ctx.closePath();
	}

	handleCanvasClick(){
     	const canvas		= this.canvasRef;
		const rect			= canvas.getBoundingClientRect();
		const xCanvasPos	= this.state.xClick - rect.left;		//X cord of user click
		const yCanvasPos	= this.state.yClick - rect.top;		//Y cord of user click
	}//end handleCanvasClick
	handleCanvasMouseDown(event){
		/* Determine if click is long press or just a click;
			Will call functions on mouseup and mousemove;
		*/
		if(event.changedTouches && event.changedTouches.length){
			hireMeCanvas.addEventListener('touchmove', this.handleCanvasMouseMove);
			hireMeCanvas.addEventListener('touchend', this.handleCanvasMouseUp);
			//event.preventDefault();
			this.setState({
				clickTimer:	new Date(),	//Start timer
				xClick:		Math.round(event.changedTouches[0].clientX),
				yClick:		Math.round(event.changedTouches[0].clientY),
				isDragging:	true,
			});
		}
		else{
			document.body.addEventListener('mousemove', this.handleCanvasMouseMove);
			document.body.addEventListener('mouseup', this.handleCanvasMouseUp);
			this.setState({
				clickTimer:	new Date(),	//Start timer
				xClick:		event.xClick,
				yClick:		event.yClick,
				isDragging:	true,
			});
		}
	}//end handleCanvasMouseDown
	handleCanvasMouseUp(){
		/* If elapsed time is less than half a second, user just clicked;
			Else, user is long pressing and moving the rectangle;
		*/
		document.body.removeEventListener('mousedown', this.handleCanvasMouseDown);
		document.body.removeEventListener('mouseup', this.handleCanvasMouseUp);
		document.body.removeEventListener('mousemove', this.handleCanvasMouseMove);
		hireMeCanvas.removeEventListener('touchstart', this.handleCanvasMouseDown);
		hireMeCanvas.removeEventListener('touchmove', this.handleCanvasMouseMove);
		hireMeCanvas.removeEventListener('touchend', this.handleCanvasMouseUp);
		const endTime		= new Date();	//End time of screen click;
		const elapsedTime = endTime - this.state.clickTimer; //In Milliseconds;
		if(elapsedTime < 500){
			//User just clicked screen
			this.handleCanvasClick();
		}
		else{
			let isRectangleAtFinalDestination = false;
	  		const canvas		= this.canvasRef;
			const rect			= canvas.getBoundingClientRect();
			const xMid			= this.middleRectangle.xCenter;
			const yMid			= this.middleRectangle.yCenter;
			const xCanvasPos	= this.state.xClick - rect.left;	//X cord of user click
			const yCanvasPos	= this.state.yClick - rect.top;	//Y cord of user click
			let safetyNet		= 0;

			while(isRectangleAtFinalDestination === false){
				if(   xCanvasPos <= xMid+2 && xCanvasPos >= xMid-2
					&& yCanvasPos <= yMid+2 && yCanvasPos >= yMid-2
				){
					isRectangleAtFinalDestination = true;
				}
				else
					this.handleRectangleMove();
				safetyNet += 1;
				if(safetyNet > 1000)
					break;
				console.log(safetyNet + ": xmid: "		+ (xMid-2) + " - " + (xMid+2));
				console.log(safetyNet + ": xClick: "	+ xCanvasPos);
				console.log(safetyNet + ": xState: "	+ this.state.xClick);
				console.log(safetyNet + ": ymid: "		+ (yMid-2) + " - " + (yMid+2));
				console.log(safetyNet + ": yClick: "	+ yCanvasPos);
				console.log(safetyNet + ": yState: "	+ this.state.yClick);
			}//end while
			this.setState({
				isDragging:	false,
			});
			console.log("DRAGGING FINSIHED");
		}
	}//end handleCanvasMouseUp()
	handleCanvasMouseMove(event){
		//TODO: Get movement of mouse and move rectangle accordingly;
		if(!this.middleRectangle){
			console.log("WARNING: Rectangle not initialized yet;");
			console.log(this);
			return false;
		}

		if(event.changedTouches && event.changedTouches.length){
			//event.preventDefault();
			this.setState({
				xClick:		Math.round(event.changedTouches[0].clientX),
				yClick:		Math.round(event.changedTouches[0].clientY)
			});
		}
		else{
			this.setState({
				xClick:		event.clientX,
				yClick:		event.clientY
			});
		}
		this.handleRectangleMove();
	}
	handleRectangleMove(){
	  	const canvas			= this.canvasRef;
		const rect				= canvas.getBoundingClientRect();
		const clientX			= this.state.xClick - rect.left;
		const clientY			= this.state.yClick - rect.top;
		const xMid				= this.middleRectangle.xCenter;
		const yMid				= this.middleRectangle.yCenter;
		const rectangleLeft	= this.middleRectangle.xLeft;
		const rectangleTop	= this.middleRectangle.yTop;

		if(clientX < xMid){
			//Move left
			this.middleRectangle.updateCoordinates(rectangleLeft-2, rectangleTop);
		}
		if(clientX > xMid){
			//Move right
			this.middleRectangle.updateCoordinates(rectangleLeft+2, rectangleTop);
		}
		if(clientY < yMid){
			//Move Up
			this.middleRectangle.updateCoordinates(rectangleLeft, rectangleTop-2);
		}
		if(clientY > yMid){
			//Move Down
			this.middleRectangle.updateCoordinates(rectangleLeft, rectangleTop+2);
		}

	}
	handleKeydown(event){
		if(!event && !event.key){
			console.log("WARNING: KEYBOARD INPUT NOT UNDERSTOOD");
			return false;
		}
		if(!this.middleRectangle){
			console.log("WARNING: Rectangle not initialized yet;");
			console.log(this);
			return false;
		}
		const rectangleLeft	= this.middleRectangle.xLeft;
		const rectangleTop	= this.middleRectangle.yTop;
		if(event.keyCode === 37){
			//arrow left
			event.preventDefault();
			this.middleRectangle.updateCoordinates(rectangleLeft-2, rectangleTop);
		}
		if(event.keyCode === 38){
			//arrow up
			event.preventDefault();
			this.middleRectangle.updateCoordinates(rectangleLeft, rectangleTop-2);
		}
		if(event.keyCode === 39){
			//arrow right
			event.preventDefault();
			this.middleRectangle.updateCoordinates(rectangleLeft+2, rectangleTop);
		}
		if(event.keyCode === 40){
			//arrow down
			event.preventDefault();
			this.middleRectangle.updateCoordinates(rectangleLeft, rectangleTop+2);
		}
		return true;
	}

   componentDidMount() {
      this.updateWindowDimensions();
      this.updateCanvas();
      this.timerID   = setInterval(
         ()=>this.updateCanvas(),
        25
      );
      window.addEventListener('resize', this.updateWindowDimensions);
      document.body.addEventListener('keydown', this.handleKeydown);
   }
   componentWillUnmount(){
      clearInterval(this.timerID);
      window.removeEventListener('resize', this.updateWindowDimensions);
      document.body.removeEventListener('keydown', this.handleKeydown);
		document.body.removeEventListener('mousemove', this.handleCanvasMouseMove);
		document.body.removeEventListener('mouseup', this.handleCanvasMouseUp);
		hireMeCanvas.removeEventListener('touchmove', this.handleCanvasMouseMove);
		hireMeCanvas.removeEventListener('touchend', this.handleCanvasMouseUp);
   }
   componentDidUpdate() {
      this.updateCanvas();
   }

   updateWindowDimensions() {
     	const canvas	= this.canvasRef;
      let width		= window.innerWidth;
      let height		= window.innerHeight;
     	let ctx			= canvas.getContext('2d');
      if (width && width >575)
         width -= 320;   //Buffer for not x-small
      else{
         width -= 120;   //Buffer for x-small
			height = 500;
		}
      height   -= 280;   //Buffer...
      if (height < 0)
         height = 0;
      this.setState({
         width: width, 
         height: height
      });
		this.updateBackground();
      return;
   }
   updateCanvas(){
      const canvas		= this.canvasRef;
      const ctx			= canvas.getContext('2d');
		if(this.state.width !== 0){
			this.updateBackground();
			this.updateMiddleRectangle();
		}//end if state.width clarity check;

		//this.updateMiddleRectangle();
		if(this.middleRectangle){
			this.middleRectangle.draw(ctx);
			writeToScreen(
				ctx, 
				"HIRE ME", 
				this.middleRectangle.xCenter - 50, 
				this.middleRectangle.yCenter + 7, 
				getRandomColor()
			);
		}
   }//End updateCanvas()
   render(){
      const penStyle		= {
         border:   "1px solid #000000"
      };
		const totalStyle	= {
			textAlign: "right"
		};
      return (
         <div>
				<p style={totalStyle}>
					Ball Count: {this.state.ballCnt}
				</p>
            <canvas
					id="hireMeCanvas"
               ref={canvas => this.	canvasRef = canvas}
               width={this.state.width}
               height={this.state.height}
               style={penStyle}
					onMouseDown		= { this.handleCanvasMouseDown }
					onTouchStart	= { this.handleCanvasMouseDown }
            />
         </div>
      );
   }
}

ReactDOM.render(
	<BallPen />,
	document.getElementById('rectangle-1')
);
