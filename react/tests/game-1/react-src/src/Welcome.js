import { World } from "./World.js";
import { Rectangle } from "./Rectangle.js";
import { getMiddleOfCanvas, writeToScreen } from "./utils.js";

export class Welcome extends World{
  /*
    Be the begining screen of the game;
    Add the other levels to a clickable interface for
    our game to choose from;
  */
  constructor(props={}){
    props.hasBrandBalls  = false;
    props.hasMovableRect = false;
    props.initBallCnt    = 85;
    super(props);
    this.isDisplayingHud = false;
    this.choiceRects     = [];
    this.choices         = 3;
    this.hBuffer         = 15;
    this.vBuffer         = 15;
    this.rHeight         = 40;
    this.fWidth          = 200;
    this.fHeight         = this.vBuffer * (this.choices+1) + this.rHeight*this.choices;
    this.fColor          = "white";
    this.buttonColor     = "grey";
    this.gitHref         = "https://github.com/Twoody/portals/tree/features/react/tests/game-1";
  }
  updateBalls(ctx){
    super.updateBalls(ctx);
    this.choiceRects = [];
    this.initChoiceRects();
    this.drawWelcomeScreen(ctx);
  }
  
  drawWelcomeScreen(ctx){
    //Make a welcome screen ontop of balls background;
    const middleCords = getMiddleOfCanvas(this.width, this.height);
    const xLeft       = middleCords.x - this.fWidth/2;
    const yTop        = middleCords.y - this.fHeight/2;
    this.drawFrame(ctx, xLeft, yTop);
    for (let i=0; i<this.choiceRects.length; i++){
      const cRect = this.choiceRects[i];
      cRect.draw(ctx);
    }
    this.drawLabels(ctx, middleCords);
  }//end drawToScreen()

  drawFrame(ctx, xLeft, yTop){
    //Frame in regards to picture frame; Not FPS;
    ctx.beginPath();                    //Start framing
    ctx.rect(
      xLeft,
      yTop,
      this.fWidth,
      this.fHeight
    );
    ctx.fillStyle = this.fColor;
    ctx.fill();
    ctx.closePath();                    //End framing
  }//end drawFrame()
  drawLabels(ctx, middleCords){
    //All buffers relative to font and NOT dynamic;
    for (let i=0; i<this.choiceRects.length; i++){
      const rect    = this.choiceRects[i];
      const hBuffer = 5;
      const vBuffer = 7;
      writeToScreen(
        ctx, 
        rect.msg,
        rect.xLeft + hBuffer, 
        rect.yCenter + vBuffer, 
        "orange", 
        "15px Arial"
      );
    }//end i-for
  }//end drawLabels()
  initChoiceRects(){
    const middleCords = getMiddleOfCanvas(this.width, this.height);
    const xLeft       = middleCords.x - this.fWidth/2;
    const yTop        = middleCords.y - this.fHeight/2;
    const r1  = new Rectangle({
      rectID: 0,
      color:  this.buttonColor,
      xLeft:  xLeft + this.hBuffer,
      yTop:   yTop + this.vBuffer,
      width:  this.fWidth - this.hBuffer*2,
      height: this.rHeight,
    });
    const r2  = new Rectangle({
      rectID: 1,
      color:  this.buttonColor,
      xLeft:  xLeft + this.hBuffer,
      yTop:   yTop + this.vBuffer*2 + this.rHeight,
      width:  this.fWidth - this.hBuffer*2,
      height: this.rHeight,
    });
    const r3  = new Rectangle({
      rectID: 2,
      color:  this.buttonColor,
      xLeft:  xLeft + this.hBuffer,
      yTop:   yTop + this.vBuffer*3 + this.rHeight*2,
      width:  this.fWidth - this.hBuffer*2,
      height: this.rHeight,
    });
    r1.msg = "New Game";
    r2.msg = "Continue";
    r3.msg = "Source Code";
    this.choiceRects.push(r1);
    this.choiceRects.push(r2);
    this.choiceRects.push(r3);
  }//end initChoiceRects()
  handleCanvasClick(canvas){
    const rect          = canvas.getBoundingClientRect();
    const xClick        = this.xClick - rect.left;   //X cord of user click
    const yClick        = this.yClick - rect.top;    //Y cord of user click
    const clickedButton = this.didClickRectangle(xClick, yClick, this.choiceRects);
    if(clickedButton === null){
      this.isDisplayingHud = true;
      super.handleCanvasClick(canvas);
    }
    else{
      if (clickedButton.rectID === 0){
        console.log('init new game');
        return 1;
      }
      else if (clickedButton.rectID === 1){
        //TODO
        return 0;
      }
      else if (clickedButton.rectID === 2){
        //Open up a tab to github
        const tab = window.open(this.gitHref, '_blank');
        tab.blur();
        window.focus();
        return 0;
      }
      else{
        console.log('ERROR 2223: rectid not found');
        return -1;
      }
    }
  }//end handleCanvasClick();
  didClickRectangle(xClick, yClick, rects=this.rectangles){
    for( let i=0; i<rects.length; i++){
      const rect = rects[i];
      if( rect.contains(xClick, yClick) )
        return rect;
    }//end i-for
    return null;
  }
}//end Welcome Class
