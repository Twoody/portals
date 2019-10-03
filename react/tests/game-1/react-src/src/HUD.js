import { writeToScreen } from "./utils.js";

export class HUD{
  constructor( props={} ){
    this.x             = null;
    this.y             = null;
    this.w             = null;
    this.sw            = null;
    this.ballMsg       = null;
    this.brickMsg      = null;
    this.bottom        = null;
    this.RALWidth      = 30; //(R)ectangle (a)nd (l)ives width;
    this.pauseWidth    = 10;
    this.h             = 13;
    this.ballTemplate  = "BALLS: ";
    this.brickTemplate = "BRICKS: ";
    this.background    = "grey";
    this.fontColor     = "orange";
    this.font          = "13px Arial";
  }//end constructor
  updateDisplay(sWidth, ballCount, brickCount, score){
    this.ballMsg    = this.ballTemplate + ballCount;
    this.brickMsg   = this.brickTemplate + brickCount;
    let lDiff       = null;
    const maxLength = Math.max(
      this.ballMsg.length,
      this.brickMsg.length
    );
    if(this.ballMsg.length < maxLength){
      lDiff        = maxLength - this.ballMsg.length;
      this.ballMsg = this.ballTemplate;
      for (let i=0; i<lDiff; i++){
        this.ballMsg += " ";
      }//end i-for
      this.ballMsg += ballCount;
    }
    if(this.brickMsg.length < maxLength){
      lDiff         = maxLength - this.brickMsg.length;
      this.brickMsg = this.brickTemplate;
      for (let i=0; i<lDiff; i++){
        this.brickMsg += " ";
      }
      this.brickMsg += brickCount;
    }
    this.w      = 10 * (maxLength - 1);
    this.x      = sWidth - this.w + 16;
    this.sw     = sWidth;
    this.y      = 15;
    this.bottom = this.y*2 + 4;
    this.score  = score;
  }//end updateDisplay();
  labelBallCnt(ctx){
    ctx.beginPath();
    ctx.rect(
      this.x,
      0,
      this.w,
      this.bottom,
    );
    ctx.fillStyle = this.background;
    ctx.fill();
    ctx.closePath();
    writeToScreen(ctx, this.ballMsg, this.x, this.y, this.fontColor, this.font);
  }//end labelBallCnt
  labelBrickCnt(ctx){
    //labelBall() rectangle has init there;
    writeToScreen(ctx, this.brickMsg, this.x, this.bottom-4, this.fontColor, this.font);
  }//end labelBrickCnt()
  labelScore(ctx){
    ctx.beginPath();
    ctx.rect(
      0,
      0,
      this.w,
      this.bottom
    );
    ctx.fillStyle = this.background;
    ctx.fill();
    ctx.closePath();
    writeToScreen(ctx, "SCORE:", 2, this.y, this.fontColor, this.font);
    writeToScreen(ctx, this.score+"", 2, this.bottom-4, this.fontColor, this.font);
  }//end labelScore()
  labelLivesAndRockets(ctx, lives, rockets){
    /*
    * Hearts and Missiles located in middle of screen
    */
    const hBuffer = 5;
    const vBuffer = 10;
    const x       = this.sw/2 - this.RALWidth;
    const y       = 0;
    const rw      = this.RALWidth*2; //Rectangle width;
    ctx.beginPath();
    ctx.rect(
      x,
      y,
      rw,
      this.bottom //length
    );
    ctx.fillStyle = this.background;
    ctx.fill();
    ctx.closePath();
    writeToScreen(
      ctx, 
      lives + " " + "\uf004",
      x + hBuffer, 
      14,               //vertical buffer
      "orange", 
      "900 15px \"Font Awesome 5 Free\"",
    );
    writeToScreen(
      ctx, 
      rockets + " " + "\uf102",
      x + hBuffer, 
      this.bottom - 4,                //vertical buffer
      "orange", 
      "900 15px \"Font Awesome 5 Free\"",
    );
  }//end labelLivesAndRockets()
  labelPause(ctx){
    const hBuffer = 5;
    const vBuffer = 10;
    const x       = this.sw/2 - this.rocketWidth - this.pauseWidth;
    const y       = 0;
    ctx.beginPath();
    ctx.rect(
      x,
      y,
      this.pauseWidth,
      this.bottom //length
    );
    ctx.fillStyle = this.background;
    ctx.fill();
    ctx.closePath();

    writeToScreen(
      ctx, 
      "8" + " " + "\uf102",
      x + hBuffer, 
      this.bottom - 4,                //vertical buffer
      "orange", 
      "900 15px \"Font Awesome 5 Free\"",
    );
  }//end labelPause()
  layBackdrop(ctx){
    ctx.beginPath();
    ctx.rect(
      0,
      0,
      this.sw,    //Screen Width
      this.bottom //length
    );
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
    return true;
  }//end layBackdrop()
}//end HUD class
