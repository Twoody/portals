(window["webpackJsonpreact-src"]=window["webpackJsonpreact-src"]||[]).push([[0],{13:function(t,i,e){t.exports=e(22)},18:function(t,i,e){},22:function(t,i,e){"use strict";e.r(i);var s=e(0),n=e.n(s),h=e(11),a=e.n(h),o=(e(18),e(8)),l=e(2),r=e(3),d=e(5),c=e(4),u=e(1),g=e(6);function v(t){return t%1!==0&&t.toString().split(".")[1].length||0}function f(){return"rgb("+127*Math.floor(3*Math.random())+", "+127*Math.floor(3*Math.random())+", "+127*Math.floor(3*Math.random())+")"}function x(t,i){return t=Math.ceil(t),i=Math.floor(i),Math.floor(Math.random()*(i-t+1))+t}function y(t,i){var e=v(t),s=v(i),n=Math.max(e,s),h=(Math.random()*(i-t)+t).toFixed(n);return h=parseFloat(h)}function p(t,i,e,s,n){return Math.pow(t-e,2)+Math.pow(i-s,2)<=Math.pow(n,2)}var m=function(){function t(i){Object(l.a)(this,t),this.type="ball",this.ballID=i.ballID,this.color=i.color,this.xCord=i.xCord,this.yCord=i.yCord,this.radius=i.radius,this.dx=i.dx,this.dy=i.dy,this.gravity=.45,this.friction=.05,this.kineticLoss=1/3,this.kineticGain=2/3,this.isGoingRight=!0,this.isGoingDown=!0,this.isGoingLeft=!1,this.isGoingUp=!1,this.nextX=this.xCord+this.dx,this.nextY=this.yCord+this.dy,this.canGoLeft=!1,this.canGoRight=!1,this.canGoDown=!1,this.canGoUp=!1}return Object(r.a)(t,[{key:"accelerate",value:function(t,i){this.dx+=t,this.dy+=i,this.dx>2*this.radius-.01&&(this.dx=2*this.radius-.01),this.dy>2*this.radius-.01&&(this.dy=2*this.radius-.01),this.dx>this.maxSpeed&&(this.dx=this.maxSpeed),this.dy>this.maxSpeed&&(this.dy=this.maxSpeed),this.decelerate(0,0)}},{key:"accelerateBySize",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:50,s=this.radius/e;t&&i?this.accelerate(s,s):t?this.accelerate(s,0):i&&this.accelerate(0,s)}},{key:"applyGravity",value:function(){this.isGoingDown?this.accelerate(0,this.gravity):this.isGoingUp?this.decelerate(0,this.gravity):this.canGoDown&&this.accelerate(0,this.gravity)}},{key:"decelerate",value:function(t,i){this.dx-=t,this.dy-=i,this.dx<=0&&(this.dx=0),this.dy<=0&&(this.dy=0)}},{key:"destruct",value:function(){this.radius=0}},{key:"distanceTo",value:function(t,i){var e=this.nextX-t,s=this.nextY-i;return Math.sqrt(Math.pow(e,2)+Math.pow(s,2))}},{key:"draw",value:function(t){t.beginPath(),t.arc(this.xCord,this.yCord,this.radius,2*Math.PI,0),t.fillStyle=this.color,t.fill(),t.closePath()}},{key:"handleBallCollisions",value:function(t){for(var i=0;i<t.length;i++)if(this.ballID!==t[i].ballID){var e=t[i],s=e.radius+this.radius,n=this.distanceTo(e.nextX,e.nextY),h=n<=s;if(h){this.nextX>e.nextX?this.canGoLeft=!1:this.canGoRight=!1,this.nextY>e.yCord?this.canGoUp=!1:this.canGoDown=!1;for(var a=this.dy/50,o=this.dx/50,l=0;h;)if(this.isGoingRight?this.nextX-=o:this.isGoingLeft&&(this.nextX+=o),this.isGoingDown?this.nextY-=a:this.isGoingUp&&(this.nextY+=a),h=(n=this.distanceTo(e.nextX,e.nextY))<s,50===(l+=1)){this.nextY=this.yCord,this.nextX=this.xCord;break}if(50===l&&!1===this.canGoDown)return this.canGoRight&&this.canGoLeft&&console.log("weird"),this.canGoRight&&0===this.dx?this.accelerateBySize(!0,!1):this.canGoLeft&&0===this.dx&&this.accelerateBySize(!0,!1),!1;e.decelerate(this.friction,this.friction),this.decelerate(e.friction,e.friction),this.kineticLoss>0&&this.kineticGain>0&&(e.accelerate(this.dx*this.kineticLoss,0),e.accelerate(0,this.dy*this.kineticLoss),this.dy*=this.kineticGain,this.dx*=this.kineticGain)}}return!0}},{key:"handleClick",value:function(){return console.log("accelerating ball"+this.ballID),this.accelerate(5,20),!0}},{key:"handleMovement",value:function(t){0===this.dy?this.isGoingUp?(this.isGoingUp=!1,this.canGoDown?this.isGoingDown=!0:this.isGoingDown=!1):this.isGoingDown?(this.isGoingUp=!1,this.isGoingDown=!1):(this.isGoingUp=!1,this.isGoingDown=!1,this.decelerate(t,0)):this.canGoDown&&this.canGoUp?this.isGoingDown?(this.isGoingUp=!1,this.isGoingDown=!0):this.isGoingUp?(this.isGoingUp=!0,this.isGoingDown=!1):(this.isGoingUp=!1,this.isGoingDown=!0):this.canGoUp?(this.isGoingUp=!0,this.isGoingDown=!1):this.canGoDown?(this.isGoingDown=!0,this.isGoingUp=!1):(this.isGoingDown=!1,this.isGoingUp=!1,this.decelerate(t,0)),this.dx<=0?this.canGoDown&&this.gravity>0?(this.dx,this.canGoRight?(this.isGoingRight=!0,this.isGoingLeft=!1):this.canGoLeft&&(this.isGoingRight=!1,this.isGoingLeft=!0)):(this.isGoingRight=!1,this.isGoingLeft=!1):this.isGoingRight||this.isGoingLeft?this.canGoRight&&this.canGoLeft?this.isGoingRight?(this.isGoingRight=!0,this.isGoingLeft=!1):(this.isGoingLeft=!0,this.isGoingRight=!1):this.canGoRight?(this.isGoingRight=!0,this.isGoingLeft=!1):this.canGoLeft?(this.isGoingLeft=!0,this.isGoingRight=!1):(this.isGoingRight=!1,this.isGoingLeft=!1):this.canGoRight?(this.isGoingRight=!0,this.isGoingLeft=!1):this.canGoLeft&&(this.isGoingLeft=!0,this.isGoingRight=!1),this.isGoingUp&&this.isGoingDown&&console.log("ERROR: BALL CANNOT GO UP AND DOWN"),this.isGoingLeft&&this.isGoingRight&&console.log("ERROR: BALL CANNOT GO LEFT AND RIGHT")}},{key:"handleRectangleInteractions",value:function(t,i,e){var s=t.isOverLappingBall(this);if(!1!==s){this.decelerate(t.friction,t.friction),this.nextX>t.xCenter?this.canGoLeft=!1:this.canGoRight=!1,this.nextY>t.yCenter?this.canGoUp=!1:(this.canGoDown=!1,0===this.dy&&(this.canGoUp=!1),this.nextY=t.yTop+this.radius);for(var n=this.dy/50,h=this.dx/50,a=0,o=!0;s;)if(this.isGoingRight?this.nextX-=h:this.isGoingLeft&&(this.nextX+=h),this.isGoingDown?this.nextY-=n:this.isGoingUp&&(this.nextY+=n),s=t.isOverLappingBall(this),50===(a+=1)){o=!1;break}!1===o&&(this.nextY=this.yCord,this.nextX=this.xCord)}}},{key:"handleWallCollisions",value:function(t,i,e){var s=this.hitBottom(i),n=this.hitTop(0),h=this.hitRight(t),a=this.hitLeft(0);n&&s||(s?(this.decelerate(0,e),0===this.dy&&(this.canGoUp=!1),this.canGoDown=!1,this.nextY=i-this.radius):n&&(this.decelerate(0,e),this.canGoUp=!1,this.nextY=0+this.radius)),h&&a?(this.nextX=this.xCord,this.nextY=this.yCord,this.dy=0,this.dx=0,console.log("WARNING: SCREEN NOT FITTED;")):h?(this.canGoRight=!1,this.nextX=t-this.radius):a&&(this.canGoLeft=!1,this.nextX=0+this.radius)}},{key:"handleWindowResize",value:function(t,i,e,s){this.yCord+this.radius>i&&(this.yCord=i-this.radius,this.accelerate(4,10),this.shrink()),this.yCord-this.radius<=0&&this.shrink(),(this.xCord+this.radius>t||this.xCord-this.radius<0)&&(this.xCord+this.radius>t?this.xCord=t-this.radius:this.xCord=0+this.radius,this.accelerate(10,4),this.shrink());for(var n=0;n<e.length;n++){var h=e[n];if(h.ballID!==this.ballID)this.isOverLappingBall(h)&&this.shrink()}for(var a=0;a<s.length;a++){var o=s[a];if(o.isOverLappingBall(this)){var l=Math.max(o.xLeft,Math.min(this.xCord,o.xLeft+o.width)),r=Math.max(o.yTop,Math.min(this.xCord,o.yTop+o.height));this.yCord+this.radius<r?this.yCord=r+this.radius:this.yCord-this.radius<r&&(this.yCord=r-this.radius),this.xCord-this.radius>l?this.xCord=l+this.radius:this.xCord+this.radius<l&&(this.xCord=l-this.radius),this.accelerate(6,6),this.shrink()}}}},{key:"hitBottom",value:function(t){return this.nextY+this.radius>=t}},{key:"hitLeft",value:function(t){return this.nextX-this.radius<=t}},{key:"hitTop",value:function(t){return this.nextY-this.radius<=t}},{key:"hitRight",value:function(t){return this.nextX+this.radius>=t}},{key:"isOverLappingBall",value:function(t){return!1!==p(this.xCord,this.yCord,t.nextX,t.nextY,this.radius+t.radius)}},{key:"label",value:function(t){this.radius<30||(t.beginPath(),this.isGoingDown||this.isGoingUp?(t.font="10px Arial",t.fillStyle="white",t.fillText("Bouncing"+this.ballID,this.xCord-this.radius+1,this.yCord+1),this.isGoingDown?(t.font="8px Arial",t.fillStyle="white",t.fillText("Down: "+this.dy.toFixed(1),this.xCord-this.radius+13,this.yCord+10)):(t.font="8px Arial",t.fillStyle="white",t.fillText("Up: "+this.dy.toFixed(1),this.xCord-this.radius+13,this.yCord+10)),this.isGoingLeft&&(t.font="8px Arial",t.fillStyle="white",t.fillText("Left: "+this.dx.toFixed(1),this.xCord-this.radius+13,this.yCord+22)),this.isGoingRight&&(t.font="8px Arial",t.fillStyle="white",t.fillText("Right: "+this.dx.toFixed(1),this.xCord-this.radius+13,this.yCord+22))):this.isGoingRight||this.isGoingLeft?(t.font="12px Arial",t.fillStyle="white",t.fillText("Rolling"+this.ballID,this.xCord-this.radius+1,this.yCord+1),this.isGoingRight&&(t.font="10px Arial",t.fillStyle="white",t.fillText("Right",this.xCord-this.radius+10,this.yCord+10)),this.isGoingLeft&&(t.font="10px Arial",t.fillStyle="white",t.fillText("Left",this.xCord-this.radius+10,this.yCord+10)),t.font="10px Arial",t.fillStyle="white",t.fillText(this.dx.toFixed(2),this.xCord-this.radius+10,this.yCord+20)):(t.font="12px Arial",t.fillStyle="white",t.fillText("Static"+this.ballID,this.xCord-this.radius+1,this.yCord+1),t.font="10px Arial",t.fillStyle="white",t.fillText("dx:"+this.dx.toFixed(2),this.xCord-this.radius+10,this.yCord+10),t.font="10px Arial",t.fillStyle="white",t.fillText("dy:"+this.dy.toFixed(2),this.xCord-this.radius+10,this.yCord+20)),t.closePath())}},{key:"move",value:function(t,i,e,s,n){this.resetSurroundings(),this.setNextCoordinates();for(var h=0;h<s.length;h++)this.handleRectangleInteractions(s[h],t,i);this.handleWallCollisions(t,i,e),this.handleBallCollisions(n),this.handleMovement(e),this.updateCoordinates(),this.applyGravity()}},{key:"resetSurroundings",value:function(){this.canGoUp=!0,this.canGoDown=!0,this.canGoLeft=!0,this.canGoRight=!0}},{key:"setNextCoordinates",value:function(){this.isGoingUp?this.nextY=this.yCord-this.dy:this.isGoingDown&&(this.nextY=this.yCord+this.dy),this.isGoingLeft?this.nextX=this.xCord-this.dx:this.isGoingRight&&(this.nextX=this.xCord+this.dx)}},{key:"shrink",value:function(){this.radius*=.9,this.setNextCoordinates()}},{key:"updateCoordinates",value:function(){this.xCord=this.nextX,this.yCord=this.nextY}}]),t}();function w(t,i,e,s,n){if(t.xCord-t.radius<0)return!1;if(t.xCord+t.radius>i)return!1;if(t.yCord-t.radius<0)return!1;if(t.yCord+t.radius>e)return!1;for(var h=0;h<n.length;h++){if(n[h].isOverLappingBall(t))return!1}for(var a=0;a<s.length;a++){var o=s[a];if(t.isOverLappingBall(o))return!1}return!0}function C(t,i,e){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:3,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:30,h=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,a=x(s,n);a+=.01*x(1,99);var o=x(a,t-a),l=x(a,i-a),r=y(0,.151),d=y(0,.151);null!==h&&(r>h&&(r=h),d>h&&(d=h));var c=new m({ballID:e,color:f(),xCord:o,yCord:l,radius:a,dx:r,dy:d});return c.maxSpeed=null!==h?h<a?h:Math.ceil(a):a,c}var b=function(){function t(i){Object(l.a)(this,t),this.type="rectangle",this.rectID=i.rectID,this.color=i.color,this.width=i.width,this.height=i.height,this.xLeft=i.xLeft,this.yTop=i.yTop,this.xRight=this.xLeft+this.width,this.yBottom=this.yTop+this.height,this.xCenter=Math.abs(this.xRight-this.width/2),this.yCenter=Math.abs(this.yBottom-this.height/2),this.nextX=this.xLeft,this.nextY=this.yTop,this.gravity=0,this.friction=.05}return Object(r.a)(t,[{key:"draw",value:function(t){t.beginPath(),t.rect(this.xLeft,this.yTop,this.width,this.height),t.fillStyle=this.color,t.fill(),t.closePath()}},{key:"handleMove",value:function(t,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];this.handleWallInteractions(t,i),this.handleEntityInteractions(t,i,e),this.updateCoordinates()}},{key:"handleBallInteractions",value:function(t,i,e){if(!1===this.isOverLappingBall(e))return!0;for(var s=Math.abs(this.xLeft-this.nextX)/50,n=Math.abs(this.yTop-this.nextY)/50,h=0;this.isOverLappingBall(e);)if(this.isGoingRight?this.nextX-=s:this.isGoingLeft&&(this.nextX+=s),this.isGoingUp?this.nextY+=n:this.isGoingDown&&(this.nextY-=n),50===(h+=1)){this.nextX=this.xLeft,this.nextY=this.yTop;break}this.isOverLappingBall(e)&&(console.log("ERROR: Rectangle.handleBallInteractions: Super stuck;"),this.isGoingRight&&e.nextX<this.xCenter?this.nextX+=e.radius:this.isGoingRight&&e.nextX>this.xCenter&&(this.nextX-=e.radius),this.isGoingLeft&&e.nextX>this.xCenter?this.nextX-=e.radius:this.isGoingLeft&&e.nextX<this.xCenter&&(this.nextX+=e.radius),this.isGoingDown&&e.nextY>this.yCenter?this.nextY-=e.radius:this.isGoingDown&&e.nextY<this.yCenter&&(this.nextY+=e.radius),this.isGoingUp&&e.nextY>this.yCenter?this.nextY-=e.radius:this.isGoingup&&e.nextY<this.yCenter&&(this.nextY+=e.radius)),this.isGoingRight&&e.nextX>this.xCenter&&(this.isGoingRight=!1),this.isGoingLeft&&e.nextX<this.xCenter&&(this.isGoingLeft=!1),this.isGoingDown&&e.nextY>this.yCenter&&(this.isGoingDown=!1),this.isGoingUp&&e.nextY<this.yCenter&&(this.isGoingUp=!1)}},{key:"handleEntityInteractions",value:function(t,i){for(var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],s=0;s<e.length;s++){var n=e[s];"rectangle"===n.type?this.handleRectangleInteractions(t,i,n):"ball"===n.type&&this.handleBallInteractions(t,i,n)}}},{key:"handleRectangleInteractions",value:function(t,i,e){}},{key:"handleWallInteractions",value:function(t,i){return this.nextX<0&&(this.nextX=0),this.nextX+this.width>t&&(this.nextX=t-this.width),this.nextY<0&&(this.nextY=0),this.nextY+this.height>i&&(this.nextY=i-this.height),!0}},{key:"isOverLappingBall",value:function(t){var i=Math.abs(t.nextX-this.xCenter),e=Math.abs(t.nextY-this.yCenter),s=this.width/2+t.radius,n=this.height/2+t.radius;return!(i>s)&&(!(e>n)&&(i<=this.width/2||(e<=this.height/2||!!p(i,e,this.width/2,this.height/2,t.radius))))}},{key:"isInBounds",value:function(t,i){return!(this.xLeft<0)&&(!(this.xRight>t)&&(!(this.yTop<0)&&!(this.yBottom>i)))}},{key:"isLegalMovement",value:function(t,i,e){this.nextX=t,this.nextY=i;for(var s=Math.abs(this.xLeft-t)/100,n=Math.abs(this.yTop-i)/100,h=0;h<e.length;h++){var a=e[h];if("ball"===a.type&&this.willOverLapBall(a))return console.log("illegal movement: reseting coordinates back;"),a.accelerate(s,n),this.nextX=this.xLeft,this.nextY=this.yYop,this.resetMovement(),!1}return!0}},{key:"processDrag",value:function(t,i,e){var s=this.xCenter,n=this.yCenter,h=this.xLeft,a=this.yTop;return this.resetMovement(),t<s?(h=t-this.width/2,this.isGoingLeft=!0):t>s&&(h=t-this.width/2,this.isGoingRight=!0),i<n?(a=i-this.height/2,this.isGoingUp=!0):i>n&&(a=i-this.height/2,this.isGoingDown=!0),!1===this.isLegalMovement(h,a,e)?(this.nextX=this.xLeft,this.nextY=this.yTop,this.resetMovement(),!1):(this.nextX=h,this.nextY=a,!0)}},{key:"processMovement",value:function(){}},{key:"resetMovement",value:function(){this.isGoingLeft=!1,this.isGoingRight=!1,this.isGoingUp=!1,this.isGoingDown=!1}},{key:"updateCoordinates",value:function(){this.xLeft=this.nextX,this.yTop=this.nextY,this.xRight=this.xLeft+this.width,this.yBottom=this.yTop+this.height,this.xCenter=Math.abs(this.xRight-this.width/2),this.yCenter=Math.abs(this.yBottom-this.height/2),this.nextX=this.xLeft,this.nextY=this.yTop}},{key:"willOverLapBall",value:function(t){var i=this.xLeft,e=this.yTop,s=this.nextX,n=this.nextY;this.updateCoordinates();var h=this.isOverLappingBall(t);return this.nextX=i,this.nextY=e,this.updateCoordinates(),this.nextX=s,this.nextY=n,h}}]),t}(),G=function(t){function i(t){var e;return Object(l.a)(this,i),(e=Object(d.a)(this,Object(c.a)(i).call(this,t))).href=t.href,e.faUnicode=t.faUnicode,e}return Object(g.a)(i,t),Object(r.a)(i,[{key:"handleClick",value:function(){return window.open(this.href,"_blank").blur(),window.focus(),!0}},{key:"label",value:function(t){var i=this.radius-5,e=this.xCord-this.radius/3,s=this.yCord+this.radius/3;return!(i<0)&&(t.beginPath(),t.font="400 "+i+'px "Font Awesome 5 Brands"',t.fillStyle="white",t.fillText(this.faUnicode,e,s),t.closePath(),!0)}}]),i}(m);function k(t,i,e){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:3,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:30,h=arguments.length>5?arguments[5]:void 0,a=arguments.length>6?arguments[6]:void 0,o=arguments.length>7&&void 0!==arguments[7]?arguments[7]:null,l=x(s,n);l+=.01*x(1,99);var r=x(l,t-l),d=x(l,i-l),c=y(0,.151),u=y(0,.151);null!==o&&(c>o&&(c=o),u>o&&(u=o));var g=new G({ballID:e,color:f(),xCord:r,yCord:d,radius:l,dx:c,dy:u});return g.maxSpeed=null!==o?o<l?o:Math.ceil(l):l,g.href=a,g.faUnicode=h,g}function R(t,i){for(var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:30,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,h=arguments.length>5?arguments[5]:void 0,a=[{__name:"gmail",faUnicode:"\uf1a0",href:"mailto:Tanner.L.Woody@gmail.com",color:"#dd4b39"},{__name:"android",faUnicode:"\uf17b",href:"https://play.google.com/store/apps/details?id=com.beWoody.tanner.KISS_List",color:"#a4c639"},{__name:"strava",faUnicode:"\uf428",href:"https://www.strava.com/athletes/9502204",color:"#fc4c02"},{__name:"instagram",faUnicode:"\uf16d",href:"https://www.instagram.com/thatguywoody/",color:"#125688"},{__name:"facebook",faUnicode:"\uf09a",href:"https://www.facebook.com/tanner.woody.9",color:"#3B5998"},{__name:"linkedIn",faUnicode:"\uf08c",href:"https://www.linkedin.com/in/tanner-woody-113208b7/",color:"#007bb5"},{__name:"twitter",faUnicode:"\uf099",href:"https://twitter.com/woody_tanner",color:"#55ACEE"},{__name:"stackoverflow",faUnicode:"\uf16c",href:"https://stackoverflow.com/users/2957890/t-woody",color:"#FF9900"},{__name:"github",faUnicode:"\uf09b",href:"https://github.com/TWoody",color:"#f40083"}],o=[],l=0;l<a.length;l++){for(var r=a[l],d=!1,c=0,u=null;!1===d;)if(d=w(u=k(t,i,r.__name,e,s,r.faUnicode,r.href,n),t,i,o,h),50===(c+=1)){console.log("UNABLE TO MAKE BALL "+r.__name);break}u&&50!==c&&(u.color=r.color,o.push(u))}return o}var L=.075,D=function(t){function i(t){var e;return Object(l.a)(this,i),(e=Object(d.a)(this,Object(c.a)(i).call(this,t))).state={height:0,width:0,clickTimer:0,xClick:0,yClick:0,ballCnt:0,hasGravity:!1,hasWallFriction:!1,hasBallFriction:!1,hasInertia:!1,isLeavingTrails:!1},e.movableRectangle=null,e.balls=[],e.friction=L,e.updateWindowDimensions=e.updateWindowDimensions.bind(Object(u.a)(e)),e.handleKeydown=e.handleKeydown.bind(Object(u.a)(e)),e.handleKeyup=e.handleKeyup.bind(Object(u.a)(e)),e.handleCanvasMouseDown=e.handleCanvasMouseDown.bind(Object(u.a)(e)),e.handleCanvasMouseMove=e.handleCanvasMouseMove.bind(Object(u.a)(e)),e.handleCanvasMouseUp=e.handleCanvasMouseUp.bind(Object(u.a)(e)),e.handleInputChange=e.handleInputChange.bind(Object(u.a)(e)),e.handleToggleButton=e.handleToggleButton.bind(Object(u.a)(e)),e.resetBalls=e.resetBalls.bind(Object(u.a)(e)),e}return Object(g.a)(i,t),Object(r.a)(i,[{key:"didClickBall",value:function(t,i){for(var e=0;e<this.balls.length;e++){var s=this.balls[e];if(p(t,i,s.xCord,s.yCord,s.radius))return s}return null}},{key:"drawBackground",value:function(){if(0===this.state.width)return!1;var t=this.canvasRef.getContext("2d");return t.beginPath(),t.fillStyle="black",t.fillRect(0,0,this.state.width,this.state.height),t.closePath(),!0}},{key:"handleCanvasClick",value:function(){var t=this.canvasRef.getBoundingClientRect(),i=this.state.xClick-t.left,e=this.state.yClick-t.top,s=this.didClickBall(i,e);if(null!==s)return s.handleClick();var n=C(this.state.width,this.state.height,this.balls.length,1,3,5);return n.xCord=i,n.yCord=e,n.nextX=i,n.nextY=e,!0===w(n,this.state.width,this.state.height,this.balls,[this.movableRectangle])&&(this.setNewBallDirection(n),console.log("making new ball"+n.ballID),this.balls.push(n),this.setState({ballCnt:this.state.ballCnt+1}),!0)}},{key:"handleInputChange",value:function(t){var i=t.target,e="checkbox"===i.type?i.checked:i.value,s=i.name;this.setState(Object(o.a)({},s,e))}},{key:"handleToggleButton",value:function(t){var i=this,e=t.target.name;this.setState(function(t){return Object(o.a)({},e,!i.state[e])})}},{key:"handleCanvasMouseDown",value:function(t){t.changedTouches&&t.changedTouches.length?(document.addEventListener("touchmove",function(t){t.preventDefault(),t.stopImmediatePropagation()},{passive:!1}),document.addEventListener("touchmove",this.handleCanvasMouseMove),document.addEventListener("touchend",this.handleCanvasMouseUp),this.setState({clickTimer:new Date,xClick:Math.round(t.changedTouches[0].clientX),yClick:Math.round(t.changedTouches[0].clientY)})):t?(document.addEventListener("mousemove",this.handleCanvasMouseMove),document.addEventListener("mouseup",this.handleCanvasMouseUp),this.setState({clickTimer:new Date})):console.log("input not understood")}},{key:"handleCanvasMouseUp",value:function(t){document.removeEventListener("mousedown",this.handleCanvasMouseDown),document.removeEventListener("mouseup",this.handleCanvasMouseUp),document.removeEventListener("mousemove",this.handleCanvasMouseMove),new Date-this.state.clickTimer<250?(this.setState({xClick:t.clientX,yClick:t.clientY}),this.handleCanvasClick()):console.log("DRAGGING FINSIHED"),this.setState({clickTimer:null})}},{key:"handleCanvasMouseMove",value:function(t){if(!this.movableRectangle)return console.log("WARNING: Rectangle not initialized yet;"),!1;t.changedTouches&&t.changedTouches.length?this.setState({xClick:Math.round(t.changedTouches[0].clientX),yClick:Math.round(t.changedTouches[0].clientY)}):this.setState({xClick:t.clientX,yClick:t.clientY}),this.handleRectangleDrag()&&this.updateRectangle()}},{key:"handleRectangleDrag",value:function(){var t=this.canvasRef.getBoundingClientRect(),i=this.state.xClick-t.left,e=this.state.yClick-t.top;return!!this.movableRectangle.processDrag(i,e,this.balls)&&(this.movableRectangle.handleMove(this.state.width,this.state.height,this.balls),!0)}},{key:"handleKeydown",value:function(t){if(!t&&!t.key)return console.log("WARNING: KEYBOARD INPUT NOT UNDERSTOOD"),!1;if(!this.movableRectangle)return console.log("WARNING: Rectangle not initialized yet;"),!1;var i=2,e=this.movableRectangle.xLeft,s=this.movableRectangle.yTop;if(this.movableRectangle.resetMovement(),![37,38,39,40].includes(t.keyCode))return!1;this.state.isHeldDown?(i+=(new Date-this.state.timePressed)/100)>this.movableRectangle.width&&(i=this.movableRectangle.width/2-.01):this.setState({isHeldDown:!0,timePressed:new Date});return 37===t.keyCode&&(t.preventDefault(),e-=i,this.movableRectangle.isGoingLeft=!0),38===t.keyCode&&(t.preventDefault(),s-=i,this.movableRectangle.isGoingUp=!0),39===t.keyCode&&(t.preventDefault(),e+=i,this.movableRectangle.isGoingRight=!0),40===t.keyCode&&(t.preventDefault(),s+=i,this.movableRectangle.isGoingDown=!0),!1===this.movableRectangle.isLegalMovement(e,s,this.balls)?(this.movableRectangle.nextX=this.movableRectangle.xLeft,this.movableRectangle.nextY=this.movableRectangle.yTop,this.movableRectangle.resetMovement(),!1):(this.movableRectangle.nextX=e,this.movableRectangle.nextY=s,this.movableRectangle.handleMove(this.state.width,this.state.height,this.balls),this.updateRectangle(),!0)}},{key:"handleKeyup",value:function(){this.setState({isHeldDown:!1,timePressed:null}),console.log("key up")}},{key:"initMiddleRectangle",value:function(){if(0===this.state.width)return!1;var t=function(t,i){var e={};return e.x=t/2,e.y=i/2,e}(this.state.width,this.state.height),i=t.x-80,e=t.y-15,s=new b({rectID:0,color:"white",xLeft:i,yTop:e,width:160,height:30});this.movableRectangle=s}},{key:"initBalls",value:function(){for(var t=R(this.state.width,this.state.height,30,30,5,[this.movableRectangle]),i=0;i<t.length;i++)this.balls.push(t[i]),this.setState({ballCnt:this.state.ballCnt+1});for(var e=this.state.ballCnt;e<85;e++){for(var s=0,n=!1,h=null;!1===n;){if(n=w(h=C(this.state.width,this.state.height,this.balls.length,1,3,5),this.state.width,this.state.height,this.balls,[this.movableRectangle]),500===s){console.log("FAILED MAKING A WORKABLE BALL");break}s+=1}h&&500!==s&&(this.setNewBallDirection(h),this.balls.push(h),this.setState({ballCnt:this.state.ballCnt+1}))}return!0}},{key:"componentDidMount",value:function(){var t=this;this.updateWindowDimensions(),this.initMiddleRectangle(),this.rectangleTimerID=setInterval(function(){return t.updateRectangle()},25),this.ballTimerID=setInterval(function(){return t.updateBalls()},25),window.addEventListener("resize",this.updateWindowDimensions),document.body.addEventListener("keydown",this.handleKeydown),document.body.addEventListener("keyup",this.handleKeyup)}},{key:"componentWillUnmount",value:function(){clearInterval(this.rectangleTimerID),clearInterval(this.ballTimerID),window.removeEventListener("resize",this.updateWindowDimensions),document.body.removeEventListener("keydown",this.handleKeydown),document.body.removeEventListener("keyup",this.handleKeyup),document.removeEventListener("mousemove",this.handleCanvasMouseMove),document.removeEventListener("mouseup",this.handleCanvasMouseUp),document.removeEventListener("touchstart",this.handleCanvasMouseDown),document.removeEventListener("touchmove",this.handleCanvasMouseMove),document.removeEventListener("touchend",this.handleCanvasMouseUp)}},{key:"componentDidUpdate",value:function(){}},{key:"updateWindowDimensions",value:function(){var t=window.innerWidth,i=window.innerHeight;if((i-=180)<0&&(i=0),(t-=50)<0&&(t=0),this.setState({width:t,height:i}),this.drawBackground(),this.movableRectangle&&(this.movableRectangle.handleMove(this.state.width,this.state.height,[]),this.updateRectangle()),this.balls){for(var e=0;e<this.balls.length;e++)this.balls[e].handleWindowResize(this.state.width,this.state.height,this.balls,[this.movableRectangle]);this.updateBalls()}}},{key:"updateBalls",value:function(){if(0===this.state.width)return!1;if(!this.movableRectangle)return!1;0===this.balls.length&&this.initBalls();for(var t=this.canvasRef.getContext("2d"),i=0;i<this.balls.length;i++){var e=this.balls[i];!1===this.state.hasGravity?e.gravity=0:e.gravity=.45,!1===this.state.hasInertia?(e.kineticLoss=0,e.kineticGain=1):(e.kineticLoss=.15,e.kineticGain=.85),!1===this.state.hasBallFriction?e.friction=0:e.friction=.05,!1===this.state.hasWallFriction?this.friction=0:this.friction=L,e.move(this.state.width,this.state.height,this.friction,[this.movableRectangle],this.balls)}return!1===this.state.isLeavingTrails&&this.drawBackground(),this.drawBalls(t),this.drawRectangle(t),!0}},{key:"updateRectangle",value:function(){if(0!==this.state.width){this.movableRectangle||this.initMiddleRectangle();var t=this.canvasRef.getContext("2d");this.state.hasWallFriction?this.movableRectangle.friction=L:this.movableRectangle.friction=0,this.drawRectangle(t)}}},{key:"drawBalls",value:function(t){for(var i=0;i<this.balls.length;i++){var e=this.balls[i];e.draw(t),e.href,e.label(t)}}},{key:"drawRectangle",value:function(t){this.movableRectangle.draw(t),function(t,i,e,s){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"black";t.beginPath(),t.font="25px Arial",t.fillStyle=n,t.fillText(i,e,s),t.closePath()}(t,"RECTANGLE",this.movableRectangle.xCenter-80,this.movableRectangle.yCenter+7,f())}},{key:"setNewBallDirection",value:function(t){var i=this.balls.length%4;0===i?(t.isGoingDown=!0,t.isGoingUp=!1,t.isGoingRight=!0,t.isGoingLeft=!1):1===i?(t.isGoingDown=!0,t.isGoingUp=!1,t.isGoingRight=!1,t.isGoingLeft=!0):2===i?(t.isGoingDown=!1,t.isGoingUp=!0,t.isGoingRight=!1,t.isGoingLeft=!0):3===i&&(t.isGoingDown=!1,t.isGoingUp=!0,t.isGoingRight=!0,t.isGoingLeft=!1)}},{key:"resetBalls",value:function(t){this.balls=[],this.setState({ballCnt:0});for(var i=R(this.state.width,this.state.height,30,30,5,[this.movableRectangle]),e=0;e<i.length;e++)this.balls.push(i[e]);return this.setState({ballCnt:this.balls.length}),!0}},{key:"render",value:function(){var t=this,i={color:"white",backgroundColor:"black"};return n.a.createElement("div",{style:{paddingRight:35,paddingLeft:35}},n.a.createElement("p",{id:"ballCnt",style:{textAlign:"right"}},"Ball Count: ",this.state.ballCnt),n.a.createElement("canvas",{ref:function(i){return t.canvasRef=i},id:"hireMeCanvas",width:this.state.width,height:this.state.height,style:{fontFamily:"Font Awesome 5 Free",fontWeight:400,border:"1px solid #000000",touchAction:"none"},onMouseDown:this.handleCanvasMouseDown,onTouchStart:this.handleCanvasMouseDown}),n.a.createElement("table",{width:this.state.width},n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("button",{style:i,name:"hasGravity",onClick:this.handleToggleButton},"Turn Gravity ",this.state.hasGravity?"Off":"On")),n.a.createElement("td",null,n.a.createElement("button",{style:i,name:"hasWallFriction",onClick:this.handleToggleButton},this.state.hasWallFriction?"Remove":"Apply"," Wall Friction")),n.a.createElement("td",null,n.a.createElement("button",{style:i,name:"hasBallFriction",onClick:this.handleToggleButton},this.state.hasBallFriction?"Remove":"Apply"," Ball Friction"))),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("button",{style:i,name:"hasInertia",onClick:this.handleToggleButton},this.state.hasInertia?"Remove":"Apply"," Energy Transfer")),n.a.createElement("td",null,n.a.createElement("button",{style:i,name:"isLeavingTrails",onClick:this.handleToggleButton},this.state.isLeavingTrails?"Remove":"Keep"," Trails")),n.a.createElement("td",null,n.a.createElement("button",{style:i,onClick:this.resetBalls},"Reset Balls"))),n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("button",{style:i,onClick:function(i){!function(t){for(var i=0;i<t.length;i++){var e=t[i];Math.random()>=.5&&e.shrink()}}(t.balls)}},"Shrink Some Balls")),n.a.createElement("td",null,n.a.createElement("button",{style:i,onClick:function(i){!function(t){for(var i=0;i<t.length;i++){var e=t[i];e.dx<1&&(e.dx+=3),e.dy<1&&(e.dy+=3);var s=y(0,.99)*e.dx,n=y(0,.99)*e.dy;e.accelerate(s,n)}}(t.balls)}},"Accelerate Balls")),n.a.createElement("td",null,n.a.createElement("button",{style:i,onClick:function(i){!function(t){for(var i=0;i<t.length;i++){var e=t[i],s=y(0,.99)*e.dx,n=y(0,.99)*e.dy;e.decelerate(s,n)}}(t.balls)}},"Decelerate Balls"))))))}}]),i}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var M=e(12),T=e(9);M.a.add(T.a,T.b),a.a.render(n.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[13,1,2]]]);
//# sourceMappingURL=main.de32c44e.chunk.js.map