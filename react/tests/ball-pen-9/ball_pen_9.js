'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
	function Ball(properties) {
		_classCallCheck(this, Ball);

		this.canvas = properties.canvas;
		this.ballID = properties.ballID;
		this.xCord = properties.xCord;
		this.yCord = properties.yCord;
		this.radius = properties.radius;
		this.dx = properties.dx;
		this.dy = properties.dy;
		this.color = "blue";
		this.nextX = this.xCord + this.dx;
		this.nextY = this.yCord + this.dy;
		this.gravity = 0.45;
		this.friction = 0.05;
		this.isGoingRight = true;
		this.isGoingDown = true;
		this.isStatic = false;
		this.kineticLoss = 1 / 3;
		this.kineticGain = 2 / 3;
	}

	_createClass(Ball, [{
		key: 'draw',
		value: function draw() {
			var ctx = this.canvas.getContext('2d');
			ctx.beginPath();
			ctx.arc(this.xCord, this.yCord, this.radius, 2 * Math.PI, //Start angle in radians
			0 //End angle in radians
			);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	}, {
		key: 'updateCoordinates',
		value: function updateCoordinates() {
			this.xCord = this.nextX;
			this.yCord = this.nextY;
		}
	}, {
		key: 'applyGravity',
		value: function applyGravity() {
			if (this.isGoingDown) this.dy += this.gravity;else this.dy -= this.gravity;
		}
	}, {
		key: 'accelerate',
		value: function accelerate() {
			this.isStatic = false;
			this.dx += 2 * this.gravity;
			this.dy += 10 * this.gravity;;
		}
	}, {
		key: 'handleWindowResize',
		value: function handleWindowResize(maxWidth, maxHeight) {
			this.isStatic = false;
			var ballBottom = this.yCord + this.radius;
			var ballTop = this.yCord - this.radius;
			var ballRight = this.xCord + this.radius;
			var ballLeft = this.xCord - this.radius;
			if (ballBottom >= maxHeight) this.yCord = maxHeight - this.radius;
			if (ballTop <= 0) this.yCord = 0 + this.radius;
			if (ballRight >= maxWidth) this.xCord = maxWidth - this.radius;
			if (ballLeft <= 0) this.xCord = 0 + this.radius;
		} //end handleWindowResize()

	}, {
		key: 'handleWallCollisions',
		value: function handleWallCollisions(maxWidth, maxHeight, friction) {
			this.isStatic = false;
			var willOverlapBottom = this.hitBottom(maxHeight);
			var willOverlapTop = this.hitTop();
			var willOverlapRight = this.hitRight(maxWidth);
			var willOverlapLeft = this.hitLeft();
			if (willOverlapTop && willOverlapBottom) {
				//The screen is now to small for our ball;
				//We will just keep the ball at it's current place and stop all movemnt;
				this.nextX = this.xCord;
				this.nextY = this.yCord;
				this.dy = 0;
				this.dx = 0;
				console.log('WARNING: SCREEN NOT FITTED;');
			} else if (willOverlapBottom) {
				this.dy -= friction;
				if (this.dy <= 0) {
					this.dy = 0;
					this.isGoingDown = true;
				} else this.isGoingDown = false;
				this.nextY = maxHeight - this.radius;
			} else if (willOverlapTop) {
				this.dy += friction;
				this.isGoingDown = true;
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
				this.isGoingRight = false;
				this.nextX = maxWidth - this.radius;
			} else if (willOverlapLeft) {
				this.isGoingRight = true;
				this.nextX = 0 + this.radius;
			} else {
				//No collision
			}
		}
	}, {
		key: 'handleBallCollisions',
		value: function handleBallCollisions(allBalls) {
			//Find out if NEXT coordinates overlap anything;
			for (var i = 0; i < allBalls.length; i++) {
				if (this.ballID === allBalls[i].ballID) continue;
				var otherBall = allBalls[i];
				var minDistance = otherBall.radius + this.radius; //Buffer
				var nextDistance = this.distanceTo(otherBall.xCord, otherBall.yCord);
				var willOverlap = nextDistance <= minDistance;
				if (!willOverlap) continue;
				//Else, we will need to adjust the next coordinates so that they do not 
				//	overlap otherBall;
				//We can do this by taking the ratio of dx and dy changes and "step back"
				//	through time until we find a place the balls no longer overlap;
				var timeRatio = 50;
				var dyRatio = this.dy / timeRatio;
				var dxRatio = this.dx / timeRatio;
				var cnt = 0;
				while (willOverlap) {
					if (this.isGoingRight) this.nextX -= dxRatio; //Step back left
					else this.nextX += dxRatio; //Step back right
					if (this.isGoingDown) this.nextY -= dyRatio; //Step back up
					else this.nextY += dyRatio; //Step back down
					nextDistance = this.distanceTo(otherBall.xCord, otherBall.yCord);
					willOverlap = nextDistance < minDistance;
					cnt += 1;
					if (cnt === timeRatio) {
						//Problem not solved;
						//We need to adjust the ball instead;
						break;
					}
				} //end while

				//Change directions of balls for next iteration;
				if (!otherBall.isStatic) {
					if (this.isGoingRight) {
						if (otherBall.isGoingRight) {
							//Both Balls are moving right; Change "inner" ball only;
							if (this.nextX > otherBall.xCord) {
								//outter ball is current ball
								otherBall.isGoingRight = false;
							} else {
								this.isGoingRight = false;
							}
						} else {
							//Balls are heading in opposite directions;
							//Have left ball go left and right ball go right
							//Current ball is going right;
							this.isGoingRight = true;
							otherBall.isGoingRight = false;
						}
					} else {
						//Current ball is going left;
						if (!otherBall.isGoingRight) {
							//Both balls are going left;
							//Have right most ball go right instead;
							if (this.nextX > otherBall.xCord) {
								//Right most balls is current ball
								this.isGoingRight = true;
							} else {
								otherBall.isGoingRight = true;
							}
						} else {
							//Other ball is going right;
							//Have left ball go left and right ball go right;
							this.isGoingRight = false;
							otherBall.isGoingRight = true;
						}
					}
				} else {
					//Other ball is "static";
					//See if we can roll off the ball;
					if (this.nextX < otherBall.xCord) {
						//Current ball is left of other ball;
						this.isGoingRight = false;
						otherBall.isGoingRight = true;
					} else {
						//Current ball is right of other ball;
						this.isGoingRight = true;
						otherBall.isGoingRight = false;
					}
				} //End handling left/right changes;

				if (otherBall.isStatic) {
					//Static ball is always going down;
					//This implies some weird logic changes
					if (this.nextY > otherBall.yCord) {
						//Current ball is below otherBall
						//This happens when other ball cannot move without touching
						//	the current ball;
						this.dx += this.friction;
						otherBall.dy += this.friction;
					} else if (this.nextY < otherBall.yCord) {
						//Current ball is above otherball;
						otherBall.isGoingDown = true;
						this.isGoingDown = false;
						this.dx += this.friction * 10;
						otherBall.dy += this.friction * 2;
						console.log("Nexty: " + this.nextY + ", curY: " + this.yCord);
					} else {
						//Y Cords are the same; Maybe they found the perfect balance;
					}
				} else {
					//Other ball is NOT static;
					if (this.nextY < otherBall.yCord) {
						//Current ball is above otherball;
						otherBall.isGoingDown = true;
						this.isGoingDown = false;
					} else {
						//Current ball is below otherball;
						this.isGoingDown = true;
						otherBall.isGoingDown = false;
					}
				}

				//Apply Kinetic Transfer
				otherBall.dx += this.dx * this.kineticLoss;
				this.dx *= this.kineticGain;
				otherBall.dy += this.dy * this.kineticLoss;
				this.dy *= this.kineticGain;
				otherBall.isStatic = false;
				this.isStatic = false;
			} //end i-for
		} //End handleBallCollision()

	}, {
		key: 'distanceTo',
		value: function distanceTo(x, y) {
			var xDiff = this.nextX - x;
			var yDiff = this.nextY - y;
			var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
			return distance;
		}
	}, {
		key: 'hitBottom',
		value: function hitBottom(maxHeight) {
			var ballMaxBottom = this.nextY + this.radius;
			if (ballMaxBottom >= maxHeight) return true;
			return false;
		}
	}, {
		key: 'hitTop',
		value: function hitTop() {
			var ballMaxTop = this.nextY - this.radius;
			if (ballMaxTop <= 0) return true;
			return false;
		}
	}, {
		key: 'hitRight',
		value: function hitRight(maxWidth) {
			var ballMaxRight = this.nextX + this.radius;
			if (ballMaxRight >= maxWidth) return true;
			return false;
		}
	}, {
		key: 'hitLeft',
		value: function hitLeft() {
			var ballMaxLeft = this.nextX - this.radius;
			if (ballMaxLeft <= 0) return true;
			return false;
		}
	}, {
		key: 'isBouncing',
		value: function isBouncing(maxHeight, allBalls) {
			var ballMaxBottom = this.yCord + this.radius;
			if (ballMaxBottom >= maxHeight && this.dy <= 0) {
				//Negative dy implies no more juice;
				//If we are on the bottom, the ball can no longer go down;
				this.isGoingDown = true;
				return false;
			} else if (this.isGoingDown === false) {
				//console.log(this.ballID + " IS NOT GOING DOWN");
				return true;
			}
			for (var i = 0; i < allBalls.length; i++) {
				if (allBalls[i] === this.ball) continue;
				var otherBall = allBalls[i];
				var yOther = otherBall.yCord;
				var xOther = otherBall.xCord;
				if (yOther >= this.yCord) continue;
				var xDiff = this.xCord - xOther;
				var yDiff = this.yCord - yOther;
				var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
				var minDistance = this.radius + otherBall.radius;
				var buffer = 0.05;
				if (distance > minDistance - buffer && distance < minDistance + buffer) {
					if (this.yCord > otherBall.yCord) return false;
				}
			} //end i-for
			return true;
		}
	}]);

	return Ball;
}(); //End Ball Class


var BallPen = function (_React$Component) {
	_inherits(BallPen, _React$Component);

	function BallPen(props) {
		_classCallCheck(this, BallPen);

		var _this = _possibleConstructorReturn(this, (BallPen.__proto__ || Object.getPrototypeOf(BallPen)).call(this, props));

		_this.state = {
			height: 0,
			width: 0
		};
		_this.balls = [];
		_this.friction = 1.0;
		_this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
		return _this;
	}

	_createClass(BallPen, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.updateWindowDimensions();
			this.updateCanvas();
			this.timerID = setInterval(function () {
				return _this2.updateCanvas();
			}, 25);
			window.addEventListener('resize', this.updateWindowDimensions);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearInterval(this.timerID);
			window.removeEventListener('resize', this.updateWindowDimensions);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.updateCanvas();
		}
	}, {
		key: 'updateWindowDimensions',
		value: function updateWindowDimensions() {
			var width = window.innerWidth;
			if (width && width > 575) width -= 620; //Buffer for not x-small
			else width -= 120; //Buffer for x-small
			var height = window.innerHeight;
			height -= 280; //Buffer...
			if (height < 0) height = 0;
			this.setState({
				width: width,
				height: height
			});
			for (var i = 0; i < this.balls.length; i++) {
				var ball = this.balls[i];
				ball.handleWindowResize(width, height);
			} //end i-for
			return;
		}
	}, {
		key: 'updateCanvas',
		value: function updateCanvas() {
			var canvas = this.canvasRef;
			var ctx = canvas.getContext('2d');
			ctx.beginPath();
			ctx.rect(0, 0, this.state.width, this.state.height);
			ctx.fillStyle = "#FF0000";
			ctx.fill();
			if (this.state.width !== 0) {
				if (this.balls.length === 0) {
					// Init first ball
					this.balls.push(new Ball({
						canvas: canvas,
						ballID: 0,
						xCord: 41,
						yCord: 41,
						radius: 30,
						dx: 2,
						dy: 2
					}));
					//Init second ball for testing;
					this.balls.push(new Ball({
						canvas: canvas,
						ballID: 1,
						xCord: 141,
						yCord: 41,
						radius: 30,
						dx: 0,
						dy: 0
					}));
				} // End first ball init;
				for (var i = 0; i < this.balls.length; i++) {
					var ball = this.balls[i];
					var isBouncing = ball.isBouncing(this.state.height, this.balls);
					if (!ball.isGoingDown && ball.dy <= 0) {
						//Ball lost momentum last frame and needs to come back down;
						ball.isGoingDown = true;
						//ball.isStatic = false;
					}
					if (!isBouncing && ball.dx === 0) {
						//Ball is static;
						ball.isStatic = true;
						ball.draw();
						ctx.font = "15px Arial";
						ctx.fillStyle = "white";
						ctx.fillText("Static" + ball.ballID, ball.xCord - ball.radius + 1, ball.yCord + 1);
						ball.dy = 0;
						ball.dx = 0;
						ball.nextY = ball.yCord;
						ball.nextX = ball.xCord;
					} else if (!isBouncing) {
						ball.isStatic = false;
						ball.nextY = ball.yCord + ball.dy;
						if (ball.isGoingRight) ball.nextX = ball.xCord + ball.dx;else ball.nextX = ball.xCord - ball.dx;
						//Ball is rolling; Apply friction;
						ball.dx -= this.friction;
						if (ball.dx < 0) ball.dx = 0;
						ball.dy = 0;
						ball.handleWallCollisions(this.state.width, this.state.height, this.friction);
						ball.handleBallCollisions(this.balls);
						ball.updateCoordinates();
						ball.draw();
						ctx.font = "15px Arial";
						ctx.fillStyle = "white";
						ctx.fillText("Rolling" + ball.ballID, ball.xCord - ball.radius + 1, ball.yCord + 1);
					} else {
						ball.isStatic = false;
						if (isBouncing) ball.applyGravity();else {
							console.log(ball.ballID + ": NOT BOUNCING");
						}
						if (ball.isGoingDown) ball.nextY = ball.yCord + ball.dy;else ball.nextY = ball.yCord - ball.dy;
						if (ball.isGoingRight) ball.nextX = ball.xCord + ball.dx;else ball.nextX = ball.xCord - ball.dx;
						ball.handleWallCollisions(this.state.width, this.state.height, this.friction);
						ball.handleBallCollisions(this.balls);
						var isLimbo = ball.xCord === ball.nextX && ball.yCord === ball.nextY;
						ball.updateCoordinates();
						ball.draw();
						if (isLimbo) {
							ctx.font = "12px Arial";
							ctx.fillStyle = "white";
							ctx.fillText("Limbo" + ball.ballID, ball.xCord - ball.radius + 1, ball.yCord + 1);
						} else {
							ctx.font = "12px Arial";
							ctx.fillStyle = "white";
							ctx.fillText("Bouncing" + ball.ballID, ball.xCord - ball.radius + 1, ball.yCord + 1);
						}
					}
				} //end i-for
			} //end if state.width clarity check;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var penStyle = {
				border: "1px solid #000000"
			};
			return React.createElement(
				'div',
				null,
				React.createElement('canvas', {
					ref: function ref(canvas) {
						return _this3.canvasRef = canvas;
					},
					width: this.state.width,
					height: this.state.height,
					style: penStyle,
					onClick: function onClick(e) {
						var rect = _this3.canvasRef.getBoundingClientRect();
						var xMousePos = e.clientX;
						var yMousePos = e.clientY;
						var xCanvasPos = xMousePos - rect.left;
						var yCanvasPos = yMousePos - rect.top;
						var radius = _this3.balls[0].radius;
						var isLegalBall = true;
						var didClickBall = false;
						for (var i = 0; i < _this3.balls.length; i++) {
							var ball = _this3.balls[i];
							var xBall = ball.xCord;
							var yBall = ball.yCord;
							var xDiff = xCanvasPos - xBall;
							var yDiff = yCanvasPos - yBall;
							var ballMouseDistance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
							var clickedBall = ballMouseDistance <= radius;
							if (isLegalBall) isLegalBall = ballMouseDistance >= radius * 2;
							if (clickedBall) {
								ball.accelerate();
								didClickBall = true;
								break;
							}
						} //end i-for
						if (isLegalBall) {
							//Check with top, bottom, and sides;
							if (xCanvasPos - radius < 0) isLegalBall = false;else if (xCanvasPos + radius > _this3.state.width) isLegalBall = false;else if (yCanvasPos - radius < 0) isLegalBall = false;else if (yCanvasPos + radius > _this3.state.height) isLegalBall = false;
						}
						if (!didClickBall) {
							//Make new ball;
							if (isLegalBall) {
								console.log('Making new ball' + _this3.balls.length);
								var canvas = _this3.canvasRef;
								var newBall = new Ball({
									canvas: canvas,
									ballID: _this3.balls.length,
									xCord: xCanvasPos,
									yCord: yCanvasPos,
									radius: 30,
									dx: 2,
									dy: 2
								});
								_this3.balls.push(newBall);
							} else console.log('Not legal ball');
						}
					}
				})
			);
		}
	}]);

	return BallPen;
}(React.Component);

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('ball-pen-9'));