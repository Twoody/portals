var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = function () {
	function Rectangle(properties) {
		_classCallCheck(this, Rectangle);

		this.type = 'rectangle';
		this.rectID = properties.rectID;
		this.color = properties.color;
		this.width = properties.width;
		this.height = properties.height;
		this.xLeft = properties.xLeft;
		this.yTop = properties.yTop;
		this.xRight = this.xLeft + this.width;
		this.yBottom = this.yTop + this.height;
		this.xCenter = Math.abs(this.xRight - this.width / 2);
		this.yCenter = Math.abs(this.yBottom - this.height / 2);
		this.nextX = this.xLeft;
		this.nextY = this.yTop;
		this.gravity = 0;
		this.friction = 0.05;
	}

	_createClass(Rectangle, [{
		key: 'draw',
		value: function draw(ctx) {
			ctx.beginPath();
			ctx.rect(this.xLeft, this.yTop, this.width, this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		} //end draw()

	}, {
		key: 'handleMove',
		value: function handleMove(sWidth, sHeight) {
			var entities = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

			//Handle rectangle movement:
			this.handleWallInteractions(sWidth, sHeight);
			this.handleEntityInteractions(sWidth, sHeight, entities);
			this.updateCoordinates();
		} //end handleMove

	}, {
		key: 'handleBallInteractions',
		value: function handleBallInteractions(sWidth, sHeight, ball) {
			/*	Find out what way rectangle is moving;
   	If we encounter a ball, move that ball IFF that ball can move in the other direction;
   */
			if (this.isOverLappingBall(ball) === false) {
				return true;
			}
			//Move rectangle away from ball until no overlap continue;
			var timeRatio = 50;
			var dx = Math.abs(this.xLeft - this.nextX);
			var dy = Math.abs(this.yTop - this.nextY);
			var dxRatio = dx / timeRatio;
			var dyRatio = dy / timeRatio;
			var timeCnt = 0;
			while (this.isOverLappingBall(ball)) {
				if (this.isGoingRight) this.nextX -= dxRatio; //Move back left
				else if (this.isGoingLeft) this.nextX += dxRatio; //Move back right
				if (this.isGoingUp) this.nextY += dyRatio; //Move back down;
				else if (this.isGoingDown) this.nextY -= dyRatio; //Move back up;
				timeCnt += 1;
				if (timeCnt === timeRatio) {
					this.nextX = this.xLeft;
					this.nextY = this.yTop;
					break;
				}
			}
			if (this.isOverLappingBall(ball)) {
				//Ball and rectangle are super stuck for whatever reason;
				//Manually try to move rectangle out of the way;
				console.log('ERROR: Rectangle.handleBallInteractions: Super stuck;');
				if (this.isGoingRight && ball.nextX < this.xCenter) {
					//Rectangle is moving right and ball is stuck left of rectangle;
					this.nextX += ball.radius;
				} else if (this.isGoingRight && ball.nextX > this.xCenter) {
					//Rectangle is moving right and ball is right of rectangle;
					//Since this is overlapping, move the rectangle back left to avoid overlap;
					this.nextX -= ball.radius;
				}
				if (this.isGoingLeft && ball.nextX > this.xCenter) {
					this.nextX -= ball.radius;
				} else if (this.isGoingLeft && ball.nextX < this.xCenter) {
					//Moving left and ball is left; Since overlap, move back right;
					this.nextX += ball.radius;
				}

				if (this.isGoingDown && ball.nextY > this.yCenter) {
					//Move rectangle back up;
					this.nextY -= ball.radius;
				} else if (this.isGoingDown && ball.nextY < this.yCenter) {
					//Rectangle is going down and ball is above above rectangle;
					//Move rectangle down;
					this.nextY += ball.radius;
				}
				if (this.isGoingUp && ball.nextY > this.yCenter) {
					//Rectangle is going up and ball is below rectangle;
					//Move rectangle up;
					this.nextY -= ball.radius;
				} else if (this.isGoingup && ball.nextY < this.yCenter) {
					//Move rectangle down;
					this.nextY += ball.radius;
				}
			}

			//Process directions and speeds
			if (this.isGoingRight && ball.nextX > this.xCenter) {
				//Rectangle is going right and ball is in path;
				this.isGoingRight = false;
			}
			if (this.isGoingLeft && ball.nextX < this.xCenter) {
				this.isGoingLeft = false;
			}
			if (this.isGoingDown && ball.nextY > this.yCenter) {
				this.isGoingDown = false;
			}
			if (this.isGoingUp && ball.nextY < this.yCenter) {
				this.isGoingUp = false;
			}
		}
	}, {
		key: 'handleEntityInteractions',
		value: function handleEntityInteractions(sWidth, sHeight) {
			var entities = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

			for (var i = 0; i < entities.length; i++) {
				var entity = entities[i];
				if (entity.type === 'rectangle') this.handleRectangleInteractions(sWidth, sHeight, entity);else if (entity.type === 'ball') this.handleBallInteractions(sWidth, sHeight, entity);else {
					//type not found
				}
			} //end i-for
		}
	}, {
		key: 'handleRectangleInteractions',
		value: function handleRectangleInteractions(sWidth, sHeight, entity) {
			//Encountered other rectangle; Can we move that rectangle, too?
		}
	}, {
		key: 'handleWallInteractions',
		value: function handleWallInteractions(sWidth, sHeight) {
			//Find out what item is out of bounds and fix accordingly;
			if (this.nextX < 0) this.nextX = 0;
			if (this.nextX + this.width > sWidth) this.nextX = sWidth - this.width;
			if (this.nextY < 0) this.nextY = 0;
			if (this.nextY + this.height > sHeight) this.nextY = sHeight - this.height;
			return true;
		}
	}, {
		key: 'isOverLappingBall',
		value: function isOverLappingBall(ball) {
			/* Is rectangle intersecting/overlapping ball;
   	Input:
   		Ball() object
   	Output:
   		Boolean
   */
			var ballDistanceX = Math.abs(ball.nextX - this.xCenter);
			var ballDistanceY = Math.abs(ball.nextY - this.yCenter);
			var sideDistance = this.width / 2 + ball.radius;
			var vertDistance = this.height / 2 + ball.radius;
			if (ballDistanceX > sideDistance) return false;
			if (ballDistanceY > vertDistance) return false;
			if (ballDistanceX <= this.width / 2) return true;
			if (ballDistanceY <= this.height / 2) return true;

			//Corners
			var areCornersTouching = isOverLapping(ballDistanceX, ballDistanceY, this.width / 2, this.height / 2, ball.radius);
			if (areCornersTouching) return true;
			return false;
		}
	}, {
		key: 'isInBounds',
		value: function isInBounds(width, height) {
			//Determine if rectangle fits the screen width and screen height;
			if (this.xLeft < 0) return false;
			if (this.xRight > width) return false;
			if (this.yTop < 0) return false;
			if (this.yBottom > height) return false;
			return true;
		} //end isInBounds();

	}, {
		key: 'isLegalMovement',
		value: function isLegalMovement(nextX, nextY, entities) {
			/*	Go over entities and see if this next movement is going to cause
   	a conflict with the existing rectangle;
   		TODO: accelerating the ball here is not intuitive;
   */
			this.nextX = nextX;
			this.nextY = nextY;
			var dx = Math.abs(this.xLeft - nextX);
			var dy = Math.abs(this.yTop - nextY);
			var dxBoost = dx / 100;
			var dyBoost = dy / 100;
			for (var i = 0; i < entities.length; i++) {
				var entity = entities[i];
				if (entity.type === 'ball') {
					if (this.willOverLapBall(entity)) {
						console.log('illegal movement: reseting coordinates back;');
						//Accelerate ball;
						entity.accelerate(dxBoost, dyBoost);
						this.nextX = this.xLeft;
						this.nextY = this.yYop;
						this.resetMovement();
						return false;
					}
				} //end ball check
			} //end i-for
			return true;
		}
	}, {
		key: 'processDrag',
		value: function processDrag(clientX, clientY, entities) {
			var xMid = this.xCenter;
			var yMid = this.yCenter;
			var nextX = this.xLeft;
			var nextY = this.yTop;
			this.resetMovement();

			if (clientX < xMid) {
				//Move left
				nextX = clientX - this.width / 2;
				this.isGoingLeft = true;
			} else if (clientX > xMid) {
				//Move right
				nextX = clientX - this.width / 2;
				this.isGoingRight = true;
			} else {
				//Same position
			}
			if (clientY < yMid) {
				//Move Up
				nextY = clientY - this.height / 2;
				this.isGoingUp = true;
			} else if (clientY > yMid) {
				//Move Down
				nextY = clientY - this.height / 2;
				this.isGoingDown = true;
			} else {
				//Same position
			}

			var isLegalDrag = this.isLegalMovement(nextX, nextY, entities);
			if (isLegalDrag === false) {
				this.nextX = this.xLeft;
				this.nextY = this.yTop;
				this.resetMovement();
				return false;
			} else {
				this.nextX = nextX;
				this.nextY = nextY;
				return true;
			}
		} //end processDrag()

	}, {
		key: 'processMovement',
		value: function processMovement() {}
	}, {
		key: 'resetMovement',
		value: function resetMovement() {
			this.isGoingLeft = false;
			this.isGoingRight = false;
			this.isGoingUp = false;
			this.isGoingDown = false;
		}
	}, {
		key: 'updateCoordinates',
		value: function updateCoordinates() {
			this.xLeft = this.nextX;
			this.yTop = this.nextY;
			this.xRight = this.xLeft + this.width;
			this.yBottom = this.yTop + this.height;
			this.xCenter = Math.abs(this.xRight - this.width / 2);
			this.yCenter = Math.abs(this.yBottom - this.height / 2);
			this.nextX = this.xLeft;
			this.nextY = this.yTop;
		} //end updateCoordinates()

	}, {
		key: 'willOverLapBall',
		value: function willOverLapBall(ball) {
			//Do some coordinate trickery to see if updated results will 
			//	cause a conflict as if it did happen;
			var currX = this.xLeft;
			var currY = this.yTop;
			var nextX = this.nextX;
			var nextY = this.nextY;
			this.updateCoordinates();
			var ret = this.isOverLappingBall(ball);
			this.nextX = currX;
			this.nextY = currY;
			this.updateCoordinates();
			this.nextX = nextX;
			this.nextY = nextY;
			return ret;
		}
	}]);

	return Rectangle;
}(); //End Rectangle Class