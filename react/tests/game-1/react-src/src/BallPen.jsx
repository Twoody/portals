import React from "react";
import { accelerateBalls, decelerateBalls, shrinkBalls } from "./Ball.js";
import { Background } from "./Background.js"
import { Welcome } from "./Welcome.js"
import { Level1 } from "./Level_1.js"

class BallPen extends React.Component{
   constructor(props){
      super(props);
		this.score							= 0;
		this.currentLevel					= 0;
		this.world							= new Welcome();
		this.balls							= [];
      this.updateWindowDimensions	= this.updateWindowDimensions.bind(this);
		this.handleKeydown				= this.handleKeydown.bind(this);
		this.handleKeyup					= this.handleKeyup.bind(this);
		this.handleCanvasMouseDown		= this.handleCanvasMouseDown.bind(this);
		this.handleCanvasMouseMove		= this.handleCanvasMouseMove.bind(this);
		this.handleCanvasMouseUp		= this.handleCanvasMouseUp.bind(this);
		this.handleInputChange			= this.handleInputChange.bind(this);
		this.handleToggleButton			= this.handleToggleButton.bind(this);
      this.state      = {
         height:		0,
         width:		0,
			clickTimer:	0,
			xClick:		0,
			yClick:		0,
			hasGravity:			this.world.hasGravity		,
			isLeavingTrails:	this.world.isLeavingTrails	,
			hasWallFriction:	this.world.hasWallFriction	,
			hasBallFriction:	this.world.hasBallFriction	,
			hasInertia:			this.world.hasInertia		,
			isGameGoing:		this.world.isGameGoing,
      };

   }//end constructor()
	handleInputChange(event) {
		const target	= event.target;
		const value		= target.type === 'checkbox' ? target.checked : target.value;
		const name		= target.name;
		this.setState({
			[name]: value
		});
		return true;
	}//end handleInputChange()
	handleToggleButton(event){
		const target	= event.target;
		const name		= target.name;
		this.world[name] = !this.world[name];
		this.setState( state => ({
			[name] : this.world[name]
		}));
		return true;
	}
	handleCanvasMouseDown(event){
		if(event.changedTouches && event.changedTouches.length){
			//Touch event: Mobile + touch screen laptops;
			document.addEventListener('touchmove', 
				ev =>{
					ev.preventDefault();
					ev.stopImmediatePropagation();
				},
				{passive:false}
			);
			document.addEventListener('touchmove',	this.handleCanvasMouseMove);
			document.addEventListener('touchend',	this.handleCanvasMouseUp);

		}//End if-touchscreen
		else if(event){
			document.addEventListener('mousemove', this.handleCanvasMouseMove);
			document.addEventListener('mouseup', this.handleCanvasMouseUp);
		}
		this.world.handleCanvasMouseDown(event);
	}//end handleCanvasMouseDown
	handleCanvasMouseUp(event){
		document.removeEventListener('mousedown',	this.handleCanvasMouseDown);
		document.removeEventListener('mouseup',	this.handleCanvasMouseUp);
		document.removeEventListener('mousemove',	this.handleCanvasMouseMove);
		const canvas		= this.canvasRef;
		const eMsg			= parseInt(this.world.handleCanvasMouseUp(event, canvas));
		if (this.state.isGameGoing === false && eMsg > 0){
			console.log('update world:update world:  ' + eMsg);
			this.updateWorld( eMsg );
		}
		return true;
	}//end handleCanvasMouseUp()
	handleCanvasMouseMove(event){
		const canvas	= this.canvasRef;
		return this.world.handleCanvasMouseMove(event, canvas);
	}//end handleCanvasMouseMove()
	handleKeydown(event){
		if(!event || !event.key){
			console.log("WARNING 33: KEYBOARD INPUT NOT UNDERSTOOD");
			return false;
		}
		if(this.world.rectangles.length === 0){
			console.log("WARNING 33: Rectangle not initialized yet;");
			return false;
		}
		const canvas		= this.canvasRef;
      const ctx			= canvas.getContext('2d');
		const isReserved	= this.isKeyRegistered(event.keyCode);
		if( isReserved === false ){
			//console.log('keyboard input `' + event.keyCode + '` not registered');
			return false;
		}
		event.preventDefault();
		this.world.handleKeydown(event.keyCode, ctx);
		return true;
	}//end handleKeydown()
	handleKeymove(){
		return this.world.handleKeymove();
	}//end handleKeymove()
	handleKeyup(event){
		const isReserved	= this.isKeyRegistered(event.keyCode);
		if( isReserved === false)
			return false;
		return this.world.handleKeyup();
	}//end handleKeyup()
	isKeyRegistered(keycode){
		let isReserved = false;
		for(let i=0; i<this.world.reservedKeys.length; i++){
			if (this.world.reservedKeys[i] === keycode){
				isReserved = true;
				break;
			}
		}//end i-for
		return isReserved;
	}//end isKeyRegistered()
	componentDidMount(){
      window.addEventListener('resize', this.updateWindowDimensions);
      document.body.addEventListener('keydown',	this.handleKeydown);
      document.body.addEventListener('keyup',	this.handleKeyup);
		const canvas	= this.canvasRef;
      const ctx		= canvas.getContext('2d');
 	   this.updateWindowDimensions();
		this.world.handleMount(ctx);
		this.statusID	= setInterval(
			()=>this.updateGameStatus(),
			25
		);
   }
   componentWillUnmount(){
      window.removeEventListener('resize', this.updateWindowDimensions);
      document.body.removeEventListener('keydown',		this.handleKeydown);
      document.body.removeEventListener('keyup',		this.handleKeyup);
		document.removeEventListener('mousemove',	this.handleCanvasMouseMove);
		document.removeEventListener('mouseup',		this.handleCanvasMouseUp);
		document.removeEventListener('touchstart',	this.handleCanvasMouseDown);
		document.removeEventListener('touchmove',	this.handleCanvasMouseMove);
		document.removeEventListener('touchend',		this.handleCanvasMouseUp);
		this.world.handleUnmount();
	}
   componentDidUpdate() {
		//Going to handle updates as we go to enhance efficiency;
   }
	updateGameStatus(){
		this.score = this.world.score;
		if(this.world.isGameGoing !== null
			&& this.world.isGameGoing !== this.state.isGameGoing
		){
      	this.setState({
         	isGameGoing: this.world.isGameGoing, 
      	});
			//console.log('should change state')
			this.currentLevel += 1;
			this.updateWorld( this.currentLevel);
		}
	}//end updateGameStatus
	updateWorld( nextWorld ){
		this.componentWillUnmount();
		if(nextWorld === 1)
			this.world = new Level1({score:this.score});
		else if(nextWorld === 2)
			this.world = new Background({score:this.score})
		else{
			this.world			= new Welcome();
			this.currentLevel	= 0;
		}
		this.componentDidMount();
	}
   updateWindowDimensions(){
      let width		= window.innerWidth;	//Matching with bootstrap hack
      let height		= window.innerHeight;
		const canvas	= this.canvasRef;
      const ctx		= canvas.getContext('2d');
		width -= 50;
      height   -= 180;   //Buffer...
      if (height < 0)
         height = 0;
		if(width < 0)
			width = 0;
      this.setState({
         width: width, 
         height: height,
      });
		this.world.handleScreenResize(width, height, ctx);
	}//end updateWindowDimenstions()
   render(){
		const	divStyle = {
			paddingRight:	35,
			paddingLeft:	35,
		};
      const penStyle	= {
			fontFamily:		"Font Awesome 5 Free",
			fontWeight:		400,
         border:   		"1px solid #000000",
			touchAction:	"none",
      };
		const buttonStyle = {
			color: "white",
			backgroundColor: "black",
		}
      return (
         <div style={divStyle}>
            <canvas ref={canvas => this.canvasRef = canvas}
					id="hireMeCanvas"
               width={this.state.width}
               height={this.state.height}
               style={penStyle}
					onMouseDown		= { this.handleCanvasMouseDown }
					onTouchStart	= { this.handleCanvasMouseDown }
            />
				<table width={this.state.width}>
					<tbody>
					<tr>
						<td>
							<button
               			style={buttonStyle}
								name="hasGravity"
								onClick={this.handleToggleButton}
							> 
								Turn Gravity {this.state.hasGravity ? "Off" : "On"}
							</button>
						</td>
						<td>
							<button
               			style={buttonStyle}
								name="hasWallFriction"
								onClick={this.handleToggleButton}
							> 
								{this.state.hasWallFriction ? "Remove" : "Apply"} Wall Friction
							</button>

						</td>
						<td>
							<button
               			style={buttonStyle}
								name="hasBallFriction"
								onClick={this.handleToggleButton}
							> 
								{this.state.hasBallFriction ? "Remove" : "Apply"} Ball Friction
							</button>
						</td>
					</tr>
					<tr>
						<td>
							<button
               			style={buttonStyle}
								name="hasInertia"
								onClick={this.handleToggleButton}
							> 
								{this.state.hasInertia ? "Remove" : "Apply"} Energy Transfer
							</button>
						</td>
						<td>
							<button
               			style={buttonStyle}
								name="isLeavingTrails"
								onClick={this.handleToggleButton}
							> 
								{this.state.isLeavingTrails ? "Remove" : "Keep"} Trails
							</button>
						</td>
						<td>
							<button style={buttonStyle}>
								Reset Balls
							</button>
						</td>
					</tr>
					<tr>
						<td>
							<button 
								style={buttonStyle} 
								onClick={e => { shrinkBalls(this.world.balls); } }
							>
								Shrink Some Balls
							</button>
						</td>
						<td>
							<button 
								style={buttonStyle} 
								onClick={ e=> {accelerateBalls(this.world.balls); } }
							>
								Accelerate Balls
							</button>
						</td>
						<td>
							<button 
							style={buttonStyle} 
							onClick={ e=> { decelerateBalls(this.world.balls); } }
						>
								Decelerate Balls
							</button>
						</td>
					</tr>
					</tbody>
				</table>
         </div>
      );
   }
}
export default BallPen;
