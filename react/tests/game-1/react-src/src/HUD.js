import { writeToScreen } from "./utils.js";

export class HUD{
  constructor( props={} ){
    this.x             = null;
    this.y             = null;
    this.w             = null;
    this.ballMsg       = null;
    this.brickMsg      = null;
    this.bottom        = null;
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
      }
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
      this.y,
    );
    ctx.fillStyle = this.background;
    ctx.fill();
    ctx.closePath();
    writeToScreen(ctx, this.ballMsg, this.x, this.y, this.fontColor, this.font);
  }//end labelBallCnt
  labelBrickCnt(ctx){
    ctx.beginPath();
    ctx.rect(
      this.x,
      this.y,
      this.w,
      this.y + 4
    );
    ctx.fillStyle = this.background;
    ctx.fill();
    ctx.closePath();
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
}//end HUD class
