var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
	function Ball(properties) {
		_classCallCheck(this, Ball);

		this.ballID = properties.ballID;
		this.color = properties.color;
		this.xCord = properties.xCord;
		this.yCord = properties.yCord;
		this.radius = properties.radius;
		this.dx = properties.dx;
		this.dy = properties.dy;
		this.gravity = 0.45;
		this.friction = 0.05;
		this.kineticLoss = 1 / 3;
		this.kineticGain = 2 / 3;
		//Direction variables;
		this.isGoingRight = true;
		this.isGoingDown = true;
		this.isGoingLeft = false;
		this.isGoingUp = false;
		this.nextX = this.xCord + this.dx; //Ball starts going to the right;
		this.nextY = this.yCord + this.dy; //Ball starts going down;
		//Boundary variables;
		this.canGoLeft = false;
		this.canGoRight = false;
		this.canGoDown = false;
		this.canGoUp = false;
	}

	_createClass(Ball, [{
		key: "draw",
		value: function draw(ctx) {
			ctx.beginPath();
			ctx.arc(this.xCord, this.yCord, this.radius, 2 * Math.PI, //Start angle in radians
			0 //End angle in radians
			);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	}, {
		key: "label",
		value: function label(ctx) {
			if (this.radius < 30) return;
			if (!this.isGoingDown && !this.isGoingUp) {
				if (!this.isGoingRight && !this.isGoingLeft) {
					ctx.font = "12px Arial";
					ctx.fillStyle = "white";
					ctx.fillText("Static" + this.ballID, this.xCord - this.radius + 1, this.yCord + 1);

					ctx.font = "10px Arial";
					ctx.fillStyle = "white";
					ctx.fillText("dx:" + this.dx.toFixed(2), this.xCord - this.radius + 10, this.yCord + 10);

					ctx.font = "10px Arial";
					ctx.fillStyle = "white";
					ctx.fillText("dy:" + this.dy.toFixed(2), this.xCord - this.radius + 10, this.yCord + 20);
				} else {
					ctx.font = "12px Arial";
					ctx.fillStyle = "white";
					ctx.fillText("Rolling" + this.ballID, this.xCord - this.radius + 1, this.yCord + 1);
					if (this.isGoingRight) {
						ctx.font = "10px Arial";
						ctx.fillStyle = "white";
						ctx.fillText("Right", this.xCord - this.radius + 10, this.yCord + 10);
					}
					if (this.isGoingLeft) {
						ctx.font = "10px Arial";
						ctx.fillStyle = "white";
						ctx.fillText("Left", this.xCord - this.radius + 10, this.yCord + 10);
					}
					ctx.font = "10px Arial";
					ctx.fillStyle = "white";
					ctx.fillText(this.dx.toFixed(2), this.xCord - this.radius + 10, this.yCord + 20);
				}
			} else {
				ctx.font = "10px Arial";
				ctx.fillStyle = "white";
				ctx.fillText("Bouncing" + this.ballID, this.xCord - this.radius + 1, this.yCord + 1);
				if (this.isGoingDown) {
					ctx.font = "8px Arial";
					ctx.fillStyle = "white";
					ctx.fillText("Down: " + this.dy.toFixed(1), this.xCord - this.radius + 13, this.yCord + 10);
				} else {
					ctx.font = "8px Arial";
					ctx.fillStyle = "white";
					ctx.fillText("Up: " + this.dy.toFixed(1), this.xCord - this.radius + 13, this.yCord + 10);
				}
				if (this.isGoingLeft) {
					ctx.font = "8px Arial";
					ctx.fillStyle = "white";
					ctx.fillText("Left: " + this.dx.toFixed(1), this.xCord - this.radius + 13, this.yCord + 22);
				}
				if (this.isGoingRight) {
					ctx.font = "8px Arial";
					ctx.fillStyle = "white";
					ctx.fillText("Right: " + this.dx.toFixed(1), this.xCord - this.radius + 13, this.yCord + 22);
				}
			}
		} //end label()

	}, {
		key: "updateCoordinates",
		value: function updateCoordinates() {
			this.xCord = this.nextX;
			this.yCord = this.nextY;
		}
	}, {
		key: "applyGravity",
		value: function applyGravity() {
			if (this.isGoingDown) this.accelerate(0, this.gravity);else if (this.isGoingUp) this.decelerate(0, this.gravity);else if (this.canGoDown) this.accelerate(0, this.gravity);
		}
	}, {
		key: "accelerate",
		value: function accelerate(dxBoost, dyBoost) {
			this.dx += dxBoost;
			this.dy += dyBoost;
		}
	}, {
		key: "decelerate",
		value: function decelerate(dxLoss, dyLoss) {
			this.dx -= dxLoss;
			this.dy -= dyLoss;
			if (this.dx <= 0) this.dx = 0;
			if (this.dy <= 0) this.dy = 0;
		}
	}, {
		key: "handleBoundaries",
		value: function handleBoundaries(width, height, allBalls) {
			var y = this.yCord;
			var xL = this.xCord - this.dx;
			var xR = this.xCord + this.dx;
			for (var i = 0; i < allBalls.length; i++) {
				var otherBall = allBalls[i];
				if (otherBall === this) continue;
				var minDistance = this.radius + otherBall.radius;
				var leftDistance = this.distanceBetween(xL, y, otherBall.xCord, otherBall.yCord);
				var rightDistance = this.distanceBetween(xR, y, otherBall.xCord, otherBall.yCord);
				if (rightDistance < minDistance && leftDistance < minDistance) {
					this.canGoDown = false;
					this.canGoUp = false;
				}
			} //end i-for
			if (y - this.radius <= 0) this.canGoUp = false;
			if (y + this.radius >= height) this.canGoDown = false;
		} //end handleBoundaries

	}, {
		key: "handleBallCollisions",
		value: function handleBallCollisions(allBalls) {
			//Find out if NEXT coordinates overlap anything;
			for (var i = 0; i < allBalls.length; i++) {
				if (this.ballID === allBalls[i].ballID) continue;
				var otherBall = allBalls[i];
				var minDistance = otherBall.radius + this.radius;
				var nextDistance = this.distanceTo(otherBall.xCord, otherBall.yCord);
				var willOverlap = nextDistance <= minDistance;
				if (!willOverlap) {
					continue;
				}

				//Set the directions that this ball cannot go;
				if (this.nextX > otherBall.xCord) {
					//Current ball is right of otherball
					this.canGoLeft = false;
				} else this.canGoRight = false;
				if (this.nextY > otherBall.yCord) {
					//Current ball is below of otherball
					this.canGoUp = false;
				} else this.canGoDown = false;

				//Adjust the next coordinates so that they do not overlap otherBall;
				//We can do this by taking the ratio of dx and dy changes and "step back"
				//	through time until we find a place the balls no longer overlap;
				var timeRatio = 50;
				var dyRatio = this.dy / timeRatio;
				var dxRatio = this.dx / timeRatio;
				var cnt = 0;
				while (willOverlap) {
					if (this.isGoingRight) this.nextX -= dxRatio; //Step back left
					else if (this.isGoingLeft) this.nextX += dxRatio; //Step back right
					if (this.isGoingDown) this.nextY -= dyRatio; //Step back up
					else if (this.isGoingUp) this.nextY += dyRatio; //Step back down
					nextDistance = this.distanceTo(otherBall.xCord, otherBall.yCord);
					willOverlap = nextDistance < minDistance;
					cnt += 1;
					if (cnt === timeRatio) {
						//Problem not solved;
						//We need to adjust the ball instead;
						this.nextY = this.yCord;
						this.nextX = this.xCord;
						break;
					}
				} //end while

				//Apply Kinetic Transfers & Friction
				otherBall.decelerate(this.friction, this.friction);
				this.decelerate(otherBall.friction, otherBall.friction);

				otherBall.accelerate(this.dx * this.kineticLoss, 0);
				otherBall.accelerate(0, this.dy * this.kineticLoss);
				this.dy *= this.kineticGain;
				this.dx *= this.kineticGain;
			} //end i-for
		} //End handleBallCollision()

	}, {
		key: "handleMovement",
		value: function handleMovement(friction) {
			//Set directions for next movement based off of current collisions;

			if (this.dy <= 0) {
				//Ball has no more momentum;
				this.dy = 0;
				if (this.isGoingUp) {
					//Ball lost momentum, but is in the air; Ball comes back down;
					this.isGoingUp = false;
					if (this.canGoDown) {
						this.isGoingDown = true;
					} else {
						this.isGoingDown = false;
					}
				} else if (this.isGoingDown) {
					//Ball has no more momentum to go back up;
					this.isGoingUp = false;
					this.isGoingDown = false;
				} else {
					//Ball is just rolling and losing dx momentum;
					this.isGoingUp = false;
					this.isGoingDown = false;
					this.decelerate(friction, 0);
				}
			} else {
				//Ball Has Momenutm;
				if (this.canGoDown && this.canGoUp) {
					//Ball can go anywhere and should follow its natural path;
					if (this.isGoingDown) {
						this.isGoingUp = false;
						this.isGoingDown = true;
					} else if (this.isGoingUp) {
						this.isGoingUp = true;
						this.isGoingDown = false;
					} else {
						this.isGoingUp = false;
						this.isGoingDown = true;
					}
				} else if (this.canGoUp) {
					//Ball has momentum and can go up;
					//Ball cannot go down;
					this.isGoingUp = true;
					this.isGoingDown = false;
				} else if (this.canGoDown) {
					this.isGoingDown = true;
					this.isGoingUp = false;
				} else {
					this.isGoingDown = false;
					this.isGoingUp = false;
					this.decelerate(friction, 0);
				}
			}
			//END up/down movements;
			if (this.dx <= 0) {
				//If Ball has no momentum, it can go in neither direction;
				//But if ball is "stuck", we need to give it a boost;
				if (this.canGoDown && this.gravity > 0) {
					if (this.dx === 0) this.accelerate(this.gravity * 4, 0);
					if (this.canGoRight) {
						this.isGoingRight = true;
						this.isGoingLeft = false;
					} else if (this.canGoLeft) {
						this.isGoingRight = false;
						this.isGoingLeft = true;
					}
				} else {
					this.isGoingRight = false;
					this.isGoingLeft = false;
				}
			} else if (!this.isGoingRight && !this.isGoingLeft) {
				//Ball had no momentum but just received momentum;
				if (this.canGoRight) {
					this.isGoingRight = true;
					this.isGoingLeft = false;
				} else if (this.canGoLeft) {
					this.isGoingLeft = true;
					this.isGoingRight = false;
				}
			} else if (this.canGoRight && this.canGoLeft) {
				//Ball has momentum and can go its natural path;
				if (this.isGoingRight) {
					this.isGoingRight = true;
					this.isGoingLeft = false;
				} else {
					this.isGoingLeft = true;
					this.isGoingRight = false;
				}
			} else if (this.canGoRight) {
				//Ball has momentum but cannot go left;
				this.isGoingRight = true;
				this.isGoingLeft = false;
			} else if (this.canGoLeft) {
				//Ball has momentum but cannot go right;
				this.isGoingLeft = true;
				this.isGoingRight = false;
			} else {
				this.isGoingRight = false;
				this.isGoingLeft = false;
			}

			if (this.isGoingUp && this.isGoingDown) console.log('ERROR: BALL CANNOT GO UP AND DOWN');
			if (this.isGoingLeft && this.isGoingRight) {
				console.log('ERROR: BALL CANNOT GO LEFT AND RIGHT');
			}
		} //End handleMovement()

	}, {
		key: "handleWallCollisions",
		value: function handleWallCollisions(maxWidth, maxHeight, friction) {
			var willOverlapBottom = this.hitBottom(maxHeight);
			var willOverlapTop = this.hitTop(0);
			var willOverlapRight = this.hitRight(maxWidth);
			var willOverlapLeft = this.hitLeft(0);
			if (willOverlapTop && willOverlapBottom) {
				//The screen is now to small for our ball;
				//We will just keep the ball at it's current place and stop all movemnt;
				//this.nextX = this.xCord;
				//this.nextY = this.yCord;
				//this.dy = 0;
				//this.dx = 0;
				//console.log('WARNING: SCREEN NOT FITTED;');
			} else if (willOverlapBottom) {
				this.decelerate(0, friction);
				if (this.dy === 0) {
					this.canGoUp = false;
				}
				this.canGoDown = false;
				this.nextY = maxHeight - this.radius;
			} else if (willOverlapTop) {
				this.decelerate(0, friction);
				this.canGoUp = false;
				this.nextY = 0 + this.radius;
			} else {
				//No collision
			}
			if (willOverlapRight && willOverlapLeft) {
				//The screen is now to small for our ball;
				//We will just keep the ball at it's current place and stop all movemnt;
				this.nextX = this.xCord;
				this.nextY = this.yCord;
				this.dy = 0;
				this.dx = 0;
				console.log('WARNING: SCREEN NOT FITTED;');
			} else if (willOverlapRight) {
				this.canGoRight = false;
				this.nextX = maxWidth - this.radius;
			} else if (willOverlapLeft) {
				this.canGoLeft = false;
				this.nextX = 0 + this.radius;
			} else {
				//No collision
			}
		} //End handleWallCollision

	}, {
		key: "handleWindowResize",
		value: function handleWindowResize(maxWidth, maxHeight) {
			var ballBottom = this.yCord + this.radius;
			var ballTop = this.yCord - this.radius;
			var ballRight = this.xCord + this.radius;
			var ballLeft = this.xCord - this.radius;
			if (ballBottom >= maxHeight) {
				this.yCord = maxHeight - this.radius;
				this.shrink();
			} else this.canGoDown = true;
			if (ballTop <= 0) {
				this.yCord = 0 + this.radius;
				this.accelerate(5, 20);
				this.shrink();
			}
			if (ballRight >= maxWidth) {
				this.xCord = maxWidth - this.radius;
				this.shrink();
			}
			if (ballLeft <= 0) {
				this.xCord = 0 + this.radius;
				this.shrink();
			}
		} //end handleWindowResize()

	}, {
		key: "distanceTo",
		value: function distanceTo(x, y) {
			var xDiff = this.nextX - x;
			var yDiff = this.nextY - y;
			var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
			return distance;
		}
	}, {
		key: "distanceBetween",
		value: function distanceBetween(x1, y1, x2, y2) {
			var xDiff = x1 - x2;
			var yDiff = y1 - y2;
			var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
			return distance;
		}
	}, {
		key: "hitBottom",
		value: function hitBottom(maxHeight) {
			var ballMaxBottom = this.nextY + this.radius;
			if (ballMaxBottom >= maxHeight) return true;
			return false;
		}
	}, {
		key: "hitTop",
		value: function hitTop(minHeight) {
			var ballMaxTop = this.nextY - this.radius;
			if (ballMaxTop <= minHeight) return true;
			return false;
		}
	}, {
		key: "hitRight",
		value: function hitRight(maxWidth) {
			var ballMaxRight = this.nextX + this.radius;
			if (ballMaxRight >= maxWidth) return true;
			return false;
		}
	}, {
		key: "hitLeft",
		value: function hitLeft(minWidth) {
			var ballMaxLeft = this.nextX - this.radius;
			if (ballMaxLeft <= minWidth) return true;
			return false;
		}
	}, {
		key: "shrink",
		value: function shrink() {
			//Destroy Ball
			this.radius *= 0.9;
		}
	}, {
		key: "destruct",
		value: function destruct() {
			//Destroy Ball
			this.radius = 0;
		}
	}]);

	return Ball;
}(); //End Ball Class