import React from "react";
import { accelerateBalls, decelerateBalls, shrinkBalls } from "./Ball.js";
import { World } from "./World.js"

class BallPen extends React.Component{
   constructor(props){
      super(props);
      this.state      = {
         height:		0,
         width:		0,
			clickTimer:	0,
			xClick:		0,
			yClick:		0,
			ballCnt:		0,
			hasGravity:			false,
			hasWallFriction:	false,
			hasBallFriction:	false,
			hasInertia:			false,
			isLeavingTrails:	false,
      };
		this.movableRectangle			= null;
		this.world							= new World(this.canvasRef);
		this.balls							= [];
      this.updateWindowDimensions	= this.updateWindowDimensions.bind(this);
		this.handleKeydown				= this.handleKeydown.bind(this);
		this.handleKeyup					= this.handleKeyup.bind(this);
		this.handleCanvasMouseDown		= this.handleCanvasMouseDown.bind(this);
		this.handleCanvasMouseMove		= this.handleCanvasMouseMove.bind(this);
		this.handleCanvasMouseUp		= this.handleCanvasMouseUp.bind(this);
		this.handleInputChange			= this.handleInputChange.bind(this);
		this.handleToggleButton			= this.handleToggleButton.bind(this);
   }

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
		this.setState( state => ({
			[name] : !this.state[name]
		}));
		return true;
	}
	handleCanvasMouseDown(event){
		this.world.handleCanvasMouseDown(event);
	}//end handleCanvasMouseDown
	handleCanvasMouseUp(event){
		const canvas = this.canvasRef;
		return this.world.handleCanvasMouseUp(event, canvas);
	}//end handleCanvasMouseUp()
	handleCanvasMouseMove(event){
		const canvas	= this.canvasRef;
      const ctx		= canvas.getContext('2d');
		return this.world.handleCanvasMouseMove(event, ctx);
	}//end handleCanvasMouseMove()
	handleKeydown(event){
		if(!event || !event.key){
			console.log("WARNING: KEYBOARD INPUT NOT UNDERSTOOD");
			return false;
		}
		if(!this.movableRectangle){
			console.log("WARNING: Rectangle not initialized yet;");
			return false;
		}
		let isReserved = false;
		for(let i=0; i<this.world.reservedKeys; i++){
			if (this.world.reservedKeys[i] === event.keyCode){
				isReserved = true;
				break;
			}
		}
		const canvas	= this.canvasRef;
      const ctx		= canvas.getContext('2d');
		if( isReserved === false )
			return false;

		event.preventDefault();
		this.world.handleKeyDown(event.keyCode, ctx);
		return true;
	}//end handleKeydown()
	handleKeymove(){
		return this.world.handleKeymove();
	}//end handleKeymove()
	handleKeyup(){
		return this.world.handleKeyup();
	}//end handleKeyup()
	componentDidMount(){
      window.addEventListener('resize', this.updateWindowDimensions);
		const canvas	= this.canvasRef;
      const ctx		= canvas.getContext('2d');
 	   this.updateWindowDimensions();
		this.world.handleMount(ctx);
   }
   componentWillUnmount(){
      window.removeEventListener('resize', this.updateWindowDimensions);
		this.world.handleUnmount();
	}
   componentDidUpdate() {
		//Going to handle updates as we go to enhance efficiency;
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
		const ballCntStyle	= {
			textAlign: "right"
		};
		const buttonStyle = {
			color: "white",
			backgroundColor: "black",
		}
      return (
         <div style={divStyle}>
				<p id="ballCnt" style={ballCntStyle}>
					Ball Count: {this.state.ballCnt}
				</p>
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
							<button style={buttonStyle} onClick={e => { shrinkBalls(this.world.balls); } }>
								Shrink Some Balls
							</button>
						</td>
						<td>
							<button style={buttonStyle} onClick={ e=> {accelerateBalls(this.world.balls); } }>
								Accelerate Balls
							</button>
						</td>
						<td>
							<button style={buttonStyle} onClick={ e=> { decelerateBalls(this.balls); } }>
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
