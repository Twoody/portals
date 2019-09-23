import { Ball } from "./Ball.js";

export class Rocket extends Ball{
  constructor(props){
    super(props);
    this.faUnicode     = "\uf102";
    this.fontFamily    = "\"Font Awesome 5 Free\"";
    this.fontWeight    = "900";
    this.fontSize      = "15px";
    this.font          = this.fontWeight + " " + this.fontSize + " " + this.fontFamily;
    this.isDestructing = false;
    this.type          = "rocket";
    this.isGoingUp     = true;
    this.isGoingDown   = false;
    this.isGoingLeft   = false;
    this.isGoingRight  = false;
    this.dy            = 3;
  }
  label(ctx){
		/*	WARNING: Rewrite of Balls.js method;
		*/
		const x			= this.xCord - (this.radius/3);
		const y			= this.yCord + (this.radius/3);	//Somehow this work very well;

		ctx.beginPath();
		//WARNING: Just pulling in css via ./public/index.html css link
		//TODO: Fix this up and import just the icons we neeed;
    ctx.font      = this.font;
		ctx.fillStyle	= "white";
		ctx.fillText(this.faUnicode, x, y);	//Coords are left and down;

		ctx.closePath();
		return true;
	}//end label()
	move(minWidth, sWidth, minHeight, sHeight, wallFriction, rectangles, balls){
    //WARNING: Major rewrite without calling super.move()
    this.nextX           = this.xCord
    this.nextY           = this.yCord - 3;
		const willOverlapTop = this.hitTop(minHeight);
    if( willOverlapTop ){
      //If rocket goes to top of screen, rocket dissapears;
      this.isDestructing = true;
      return true;
    }
    //Skip init rectangle (i.e. paddle)
    for (let i=1; i<rectangles.length; i++){
      if ( rectangles[i].isOverLappingBall(this) ){
        this.isDestructing        = true;
        rectangles[i].isBlowingUp = true;
        rectangles[i].hitCount += 1;
        console.log('rocket obliterating rect' + rectangles[i].rectID);
      }
    }//end i-for
    for (let i=0; i<balls.length; i++){
      if ( balls[i] === this )
        continue;
      if ( this.isOverLappingBall( balls[i] ) ){
        this.isDestructing     = true;
        balls[i].isDestructing = true;
      }
    }//end i-for
    this.updateCoordinates();
    return true;
  }//end move()
}//End Rocket Class
