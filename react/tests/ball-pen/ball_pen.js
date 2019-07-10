'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
	function Ball(props) {
		_classCallCheck(this, Ball);

		this.isGoingRight = true;
		this.isGoingDown = true;
		this.xCord = props.xInit;
		this.yCord = props.yInit;
		this.radius = 30;
		this.xSpeed = 2;
		this.ySpeed = 1.05;
		this.gravity = 0.5;
		this.friction = 0.15;
		this.kineticGain = 1 / 3;
		this.kineticLoss = 2 / 3;
		this.color = "blue";
		this.ballID = props.ballID;
		this.canvas = props.canvas;
		this.maxWidth = props.maxWidth;
		this.maxHeight = props.maxHeight;
	}

	_createClass(Ball, [{
		key: 'draw',
		value: function draw() {
			var ctx = this.canvas.getContext('2d');
			ctx.beginPath();
			ctx.arc(this.xCord, this.yCord, this.radius, 2 * Math.PI, false);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	}, {
		key: 'accelerate',
		value: function accelerate() {
			console.log('accelerating ball: ' + this.ballID);
			this.ySpeed += 5;
			this.xSpeed += 2;
		}
	}, {
		key: 'updateSpeed',
		value: function updateSpeed() {
			if (this.isGoingDown) this.ySpeed += this.gravity;else this.ySpeed -= this.gravity;
		}
	}, {
		key: 'updateCoordinates',
		value: function updateCoordinates(otherBalls) {
			if (this.isGoingDown === true) this.yCord += this.ySpeed;else //We are going up;
				this.yCord -= this.ySpeed;
			if (this.isGoingRight === true) this.xCord += this.xSpeed;else this.xCord -= this.xSpeed;
		} //End updateCoordinates()

	}, {
		key: 'updateTrajectory',
		value: function updateTrajectory(otherBalls) {
			//Will need to update to allow for multiple heights and widths
			//	and then find the best/only solution;
			var rightBound = this.xCord + this.radius;
			var leftBound = this.xCord - this.radius;
			var hitTop = this.hitTop();
			var hitBottom = this.hitBottom();
			var isBouncing = true;
			//Container Check - Top/Bottom
			if (hitBottom === true && this.ySpeed <= 0) {
				//Hit bottom but no more bounce;
				this.yCord = this.maxHeight - this.radius;
				if (this.xSpeed > 0) this.xSpeed -= this.friction;
				if (this.xSpeed < 0) this.xSpeed = 0;
				this.ySpeed = 0;
				isBouncing = false;
			} else if (hitTop === false && this.ySpeed <= 0) {
				//Lost momentum; Coming back down;
				this.isGoingDown = true;
				this.ySpeed -= this.friction;
			} else if (hitTop === true) {
				this.isGoingDown = true;
				this.yCord = 0 + this.radius;
				this.ySpeed -= this.friction;
			} else if (hitBottom === true) {
				//Hit Bottom but still bouncing up;
				this.isGoingDown = false;
				this.yCord = this.maxHeight - this.radius;
				this.ySpeed -= this.friction;
			}

			//Container Check - Sides
			if (leftBound <= 0 || rightBound >= this.maxWidth) {
				if (leftBound <= 0) {
					this.isGoingRight = true;
					this.xCord = 0 + this.radius;
				} else if (rightBound >= this.maxWidth) {
					this.isGoingRight = false;
					this.xCord = this.maxWidth - this.radius;
				}
				if (isBouncing) this.ySpeed -= this.friction;
				if (this.xSpeed > 0) this.xSpeed -= this.friction;
				if (this.xSpeed <= 0) this.xSpeed = 0;
			}

			//Check Other Balls
			for (var i = 0; i < otherBalls.length; i++) {
				var otherBall = otherBalls[i];
				if (otherBall.ballID === this.ballID) continue;
				var distanceBetween = this.getDistanceBetween(otherBall);
				var minimumDistancePossible = this.radius + otherBall.radius;
				var isOverlapping = distanceBetween < minimumDistancePossible;
				if (isOverlapping) {
					console.log('overlapping');
					this.diagnoseCollision(otherBall, distanceBetween);
					//this.updateTrajectory(otherBalls);
				}
			} //end i-for
		} //End updateTrajectory()

	}, {
		key: 'hitBottom',
		value: function hitBottom() {
			var bottomBound = this.yCord + this.radius;
			if (bottomBound >= this.maxHeight) return true;
			return false;
		}
	}, {
		key: 'hitTop',
		value: function hitTop() {
			var topBound = this.yCord - this.radius;
			if (topBound <= 0) return true;
			return false;
		}
	}, {
		key: 'getDistanceBetween',
		value: function getDistanceBetween(otherBall) {
			//Get the distance between `this` and a different object;
			var xDiff = this.xCord - otherBall.xCord;
			var yDiff = this.yCord - otherBall.yCord;
			var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
			return distance;
		}
	}, {
		key: 'getSlope',
		value: function getSlope(otherBall) {
			var xDiff = this.xCord - otherBall.xCord;
			var yDiff = this.yCord - otherBall.yCord;
			var slope = yDiff / xDiff;
			if (slope === -0 || slope === +0) slope = 0;
			return slope;
		}
	}, {
		key: 'diagnoseCollision',
		value: function diagnoseCollision(otherBall, distanceBetween) {
			var requiredDistance = this.radius + this.radius;
			var missingDistance = requiredDistance - distanceBetween;
			var slope = this.getSlope(otherBall);
			//const missingDistance	= requiredDistance;

			if (this.ySpeed <= 0) {
				//Current Ball has no bounce;
				if (otherBall.ySpeed <= 0) this.isGoingDown = true;else {
					//Transfter bounce from other ball to current ball;
					this.ySpeed = otherBall.ySpeed * this.kineticGain;
					otherBall.ySpeed = otherBall.ySpeed * this.kineticLoss;
					this.isGoingDown = false;
					otherBall.isGoingDown = false;
				}
			} else if (otherBall.ySpeed <= 0) {
				//Transfter bounce from current ball to other ball;
				otherBall.ySpeed = this.ySpeed * this.kineticGain;
				this.ySpeed = this.ySpeed * this.kineticLoss;
				otherBall.isGoingDown = false;
				this.isGoingDown = false;
			} else if (this.isGoingDown === otherBall.isGoingDown) {
				//Both balls are in the same direction;
				if (this.isGoingDown) {
					if (this.yCord > otherBall.yCord) {
						//Current ball is below other ball;
						this.ySpeed += otherBall.ySpeed * this.kineticGain;
						otherBall.ySpeed = otherBall.ySpeed * this.kineticLoss;
						if (this.willChangeOnCollision_y(slope)) otherBall.isGoingDown = false;
					} else {
						//Current ball is ontop of other ball;
						otherBall.ySpeed += this.ySpeed * this.kineticGain;
						this.ySpeed = this.ySpeed * this.kineticLoss;
						if (this.willChangeOnCollision_y(slope)) this.isGoingDown = false;
					}
				} else {
					//Both balls are going up
					if (this.yCord > otherBall.yCord) {
						//Current ball is below other ball
						otherBall.ySpeed += this.ySpeed * this.kineticGain;
						this.ySpeed = this.ySpeed * this.kineticLoss;
						if (this.willChangeOnCollision_y(slope)) this.isGoingDown = false;
					} else {
						//Current ball is on top other ball
						this.ySpeed += otherBall.ySpeed * this.kineticGain;
						otherBall.ySpeed = otherBall.ySpeed * this.kineticLoss;
						if (this.willChangeOnCollision_y(slope)) otherBall.isGoingDown = false;
					}
				}
			} else {
				//Both balls are MOVING and headed in opposite direction;
				//Just add friction and change direction;
				this.ySpeed -= this.friction;
				otherBall.ySpeed -= this.friction;
				if (this.willChangeOnCollision_y(slope)) {
					this.isGoingDown = !this.isGoingDown;
					otherBall.isGoingDown = !otherBall.isGoingDown;
				}
				//Need to figure out what ball is on top and on bottom
				//	so that we do not push it out of bounds;
				if (this.yCord < otherBall.yCord) {
					//Current ball is ontop of otherball
					var currOnBottom = this.hitBottom();
					if (currOnBottom) {
						//Update other ball, as we do not want to push this out of bounds;
						otherBall.yCord = this.yCord + (this.yCord - otherBall.yCord) / distanceBetween * missingDistance;
					} else {
						//We can update the current ball instead
						this.yCord = otherBall.yCord + (otherBall.yCord - this.yCord) / distanceBetween * missingDistance;
					}
				} else {
					//Current ball is below otherball;
					var currOnTop = this.hitTop();
					if (currOnTop) {
						//update other ball so we do not push this out of bounds;
						otherBall.yCord = this.yCord + (this.yCord - otherBall.yCord) / distanceBetween * missingDistance;
					} else {
						//We can update the current ball instead
						this.yCord = otherBall.yCord + (otherBall.yCord - this.yCord) / distanceBetween * missingDistance;
					}
				}
			}

			if (this.xSpeed <= 0) {
				this.xSpeed = otherBall.xSpeed * (2 / 3);
				otherBall.xSpeed = otherBall.xSpeed * (1 / 3);
				this.isGoingRight = otherBall.isGoingRight;
				otherBall.isGoingRight = !otherBall.isGoingRight;
				otherBall.xCord = otherBall.xCord + (otherBall.xCord - this.xCord) / distanceBetween * missingDistance;
			} else if (otherBall.xSpeed <= 0) {
				otherBall.xSpeed = this.xSpeed * (2 / 3);
				this.xSpeed = this.xSpeed * (1 / 3);
				otherBall.isGoingRight = this.isGoingRight;
				this.isGoingRight = !this.isGoingRight;
				this.xCord = this.xCord + (this.xCord - otherBall.xCord) / distanceBetween * missingDistance;
			} else if (this.isGoingRight === otherBall.isGoingRight) {
				//	Both balls are MOVING in the same direction
				//	If balls are going in same direction, then the inner ball
				//	will receive speed while the other ball will lose speed;
				if (this.isGoingRight) {
					//Both balls are going right
					if (this.xCord > otherBall.xCord) {
						//Current ball is MOVING right of other ball;
						//TODO: Check bounds;
						this.xSpeed += otherBall.xSpeed * (2 / 3);
						otherBall.xSpeed = otherBall.xSpeed * (1 / 3);
						this.xCord = this.xCord + (this.xCord - otherBall.xCord) / distanceBetween * missingDistance;
						otherBall.isGoingRight = !otherBall.isGoingRight;
					} else {
						//Other ball is MOVING right of current ball;
						//TODO: Check bounds;
						otherBall.xSpeed += this.xSpeed * (2 / 3);
						this.xSpeed = this.xSpeed * (1 / 3);
						otherBall.xCord = otherBall.xCord + (otherBall.xCord - this.xCord) / distanceBetween * missingDistance;
						this.isGoingRight = !this.isGoingRight;
					}
				} else {
					//Both balls are going left;
					if (this.xCord > otherBall.xCord) {
						//Other ball is MOVING left of current ball;
						//TODO: Check bounds;
						otherBall.xSpeed += this.xSpeed * (2 / 3);
						this.xSpeed = this.xSpeed * (1 / 3);
						otherBall.xCord = otherBall.xCord + (otherBall.xCord - this.xCord) / distanceBetween * missingDistance;
						this.isGoingRight = !this.isGoingRight;
					} else {
						//Current ball is MOVING right of other ball;
						//TODO: Check bounds;
						this.xSpeed += otherBall.xSpeed * (2 / 3);
						otherBall.xSpeed = otherBall.xSpeed * (1 / 3);
						this.xCord = this.xCord + (this.xCord - otherBall.xCord) / distanceBetween * missingDistance;
						otherBall.isGoingRight = !otherBall.isGoingRight;
					}
				}
			} else {
				//	Balls are going in opposite directions;
				//	If balls are goign in opposite directions, then both
				//	balls switch direction while losing speed to friction;
				if (this.xCord - this.radius <= 0) otherBall.xCord = otherBall.xCord + (otherBall.xCord - this.xCord) / distanceBetween * missingDistance;else if (this.xCord + this.radius >= this.maxWidth) otherBall.xCord = otherBall.xCord + (otherBall.xCord - this.xCord) / distanceBetween * missingDistance;else this.xCord = this.xCord + (this.xCord - otherBall.xCord) / distanceBetween * missingDistance;
				this.isGoingRight = !this.isGoingRight;
				otherBall.isGoingRight = !otherBall.isGoingRight;
				this.xSpeed -= this.friction;
				otherBall.xSpeed -= this.friction;
			}
		} //end diagnoseCollision()

	}, {
		key: 'willChangeOnCollision_y',
		value: function willChangeOnCollision_y(slope) {
			if (slope <= 1 && slope >= 0.65 || slope >= -1 && slope > -0.65) return true;
			return false;
		}
	}]);

	return Ball;
}(); //end Ball Class

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
		_this.isStarted = false;
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
			if (width && width > 575) width -= 320; //Buffer for not x-small
			else width -= 120; //Buffer for x-small
			var height = window.innerHeight;
			height -= 280; //Buffer...
			if (height < 0) height = 0;
			this.setState({
				width: width,
				height: height
			});
			for (var i = 0; i < this.balls.length; i++) {
				this.balls[i].maxHeight = height;
				this.balls[i].maxWidth = width;
			}
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
			if (this.state.width) {
				if (this.isStarted === false) {
					//init balls
					this.balls.push(new Ball({
						canvas: canvas,
						ballID: "ball0",
						xInit: 41,
						yInit: 41,
						maxHeight: this.state.height,
						maxWidth: this.state.width
					}));
					this.balls[0].draw();
					this.isStarted = true;
				} else {
					//animate balls
					for (var i = 0; i < this.balls.length; i++) {
						var ball = this.balls[i];
						ball.updateSpeed();
						ball.updateCoordinates(this.state.height, this.balls);
						ball.updateTrajectory(this.balls);
						ball.draw();
					}
				}
			}
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
							var ballMouseDistance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
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
									ballID: "ball" + _this3.balls.length,
									xInit: xCanvasPos,
									yInit: yCanvasPos,
									maxHeight: _this3.state.height,
									maxWidth: _this3.state.width
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

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('ball-pen'));