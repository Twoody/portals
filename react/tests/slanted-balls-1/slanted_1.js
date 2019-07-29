'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MIN_RADIUS = 1;
var MAX_RADIUS = 3;
var WALL_FRICTION = 0.075;
var BALL_FRICTION = 0.05;
var GRAVITY = 0.45;
var KINETIC_LOSS = 0.33;
var KINETIC_KEEP = 0.66;
var BACKGROUND_COLOR = "black";
var MAX_SPEED = MAX_RADIUS * 2;
var initBallCnt = 85;
function getRandomColor() {
	var red = Math.floor(Math.random() * 3) * 127;
	var green = Math.floor(Math.random() * 3) * 127;
	var blue = Math.floor(Math.random() * 3) * 127;
	var rc = "rgb(" + red + ", " + green + ", " + blue + ")";
	return rc;
}
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var BallPen = function (_React$Component) {
	_inherits(BallPen, _React$Component);

	function BallPen(props) {
		_classCallCheck(this, BallPen);

		var _this = _possibleConstructorReturn(this, (BallPen.__proto__ || Object.getPrototypeOf(BallPen)).call(this, props));

		_this.state = {
			height: 0,
			width: 0,
			hasGravity: true,
			hasWallFriction: true,
			hasBallFriction: true,
			hasKineticTransfer: true,
			isLeavingTrails: false,
			isShowingLabels: false
		};
		_this.balls = [];
		_this.rectangles = [];
		_this.friction = WALL_FRICTION;
		_this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
		_this.handleInputChange = _this.handleInputChange.bind(_this);
		_this.shrinkBalls = _this.shrinkBalls.bind(_this);
		_this.accelerateBalls = _this.accelerateBalls.bind(_this);
		_this.decelerateBalls = _this.decelerateBalls.bind(_this);
		_this.resetBalls = _this.resetBalls.bind(_this);
		return _this;
	}

	_createClass(BallPen, [{
		key: "getMiddleOfCanvas",
		value: function getMiddleOfCanvas() {
			var cords = {};
			cords.x = this.state.width / 2;
			cords.y = this.state.height / 2;
			return cords;
		}
	}, {
		key: "initRectangles",
		value: function initRectangles() {
			var middleCords = this.getMiddleOfCanvas();
			var width = 200;
			var height = 100;
			var xLeft = middleCords.x - width / 2;
			var yTop = middleCords.y - height / 2;
			var rectangle = new Rectangle({
				rectID: 0,
				color: 'white',
				xLeft: xLeft,
				yTop: yTop,
				width: width,
				height: height
			});
			this.rectangles.push(rectangle);
		}
	}, {
		key: "updateBackground",
		value: function updateBackground() {
			var canvas = this.canvasRef;
			var ctx = canvas.getContext('2d');
			ctx.beginPath();
			ctx.fillStyle = BACKGROUND_COLOR;
			ctx.fillRect(0, 0, this.state.width, this.state.height);
			ctx.closePath();
			for (var i = 0; i < this.rectangles.length; i++) {
				var rectangle = this.rectangles[i];
				rectangle.draw(ctx);

				ctx.beginPath();
				ctx.font = "20px Arial";
				ctx.fillStyle = "black";
				ctx.fillText("HIRE ME", rectangle.xCenter - 40, rectangle.yCenter);
				ctx.closePath();
			} //end i-for
		}
	}, {
		key: "initDisplay",
		value: function initDisplay() {
			this.initRectangles();
			this.setState({
				hasGravity: false,
				hasWallFriction: false,
				hasBallFriction: false,
				hasKineticTransfer: false,
				isLeavingTrails: true,
				isShowingLabels: true
			});
			for (var i = 0; i < initBallCnt; i++) {
				//Make new balls;
				var newBall = this.makeRandomBall();
				var cnt = 0;
				while (newBall === false) {
					newBall = this.makeRandomBall();
					cnt += 1;
					if (cnt === 50) return false;
				}
				newBall.maxSpeed = MAX_SPEED;;
				this.balls.push(newBall);
			} //end i-for

			this.setState({
				ballCnt: initBallCnt
			});
			return true;
		} //End initDisplay

	}, {
		key: "makeRandomBall",
		value: function makeRandomBall() {
			var randomRadius = getRandomInt(MIN_RADIUS, MAX_RADIUS);
			randomRadius += getRandomInt(1, 99) * 0.01;
			var randomX = getRandomInt(0 + randomRadius, this.state.width - randomRadius);
			var randomY = getRandomInt(0 + randomRadius, this.state.height - randomRadius);
			var randomDX = getRandomInt(1, Math.floor(randomRadius * 50)) * 0.01;
			var randomDY = getRandomInt(1, Math.floor(randomRadius * 50)) * 0.01;
			for (var i = 0; i < this.balls.length; i++) {
				var otherBall = this.balls[i];
				var minDistance = otherBall.radius + randomRadius;
				var currDistance = otherBall.distanceTo(randomX, randomY);
				if (currDistance < minDistance) {
					return false;
				}
			}
			var newBall = new Ball({
				ballID: this.balls.length,
				color: getRandomColor(),
				xCord: randomX,
				yCord: randomY,
				radius: randomRadius,
				dx: randomDX,
				dy: randomDY
			});
			for (var _i = 0; _i < this.rectangles.length; _i++) {
				var rectangle = this.rectangles[_i];
				if (rectangle.isOverLappingBall(newBall)) return false;
			} //end i-for
			newBall.maxSpeed = MAX_SPEED;
			return newBall;
		} //end /akeRandomBall

	}, {
		key: "handleInputChange",
		value: function handleInputChange(event) {
			var target = event.target;
			var value = target.type === 'checkbox' ? target.checked : target.value;
			var name = target.name;

			//Makes a POST element on submit;
			this.setState(_defineProperty({}, name, value));
		}
	}, {
		key: "handleCanvasClick",
		value: function handleCanvasClick(canvas, xClick, yClick) {
			var rect = canvas;
			var xMousePos = xClick;
			var yMousePos = yClick;;
			var xCanvasPos = xMousePos - rect.left;
			var yCanvasPos = yMousePos - rect.top;
			var randomRadius = getRandomInt(MIN_RADIUS, MAX_RADIUS);
			randomRadius += getRandomInt(1, 99) * 0.01;
			var isLegalBall = true; //Will try to make false;
			var didClickBall = false;
			for (var i = 0; i < this.balls.length; i++) {
				//See if ball is clicked;
				//If ball not clicked, see if new ball is still possible;
				var ball = this.balls[i];
				var xBall = ball.xCord;
				var yBall = ball.yCord;
				var xDiff = xCanvasPos - xBall;
				var yDiff = yCanvasPos - yBall;
				var radius = this.balls[i].radius;
				var ballMouseDistance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
				var clickedBall = ballMouseDistance <= radius;
				if (isLegalBall) isLegalBall = ballMouseDistance >= radius + randomRadius;
				if (clickedBall) {
					ball.accelerate(4 * GRAVITY, 20 * GRAVITY);
					didClickBall = true;
					break;
				}
			} //end i-for
			for (var _i2 = 0; _i2 < this.rectangles.length; _i2++) {
				var rectangle = this.rectangles[_i2];
				if (yCanvasPos > rectangle.yTop - randomRadius && yCanvasPos < rectangle.yBottom + randomRadius && xCanvasPos < rectangle.xRight + randomRadius && xCanvasPos > rectangle.xLeft - randomRadius) {
					isLegalBall = false;
					break;
				}
			} //end i-for
			if (isLegalBall) {
				//Check with top, bottom, and sides;
				if (xCanvasPos - randomRadius < 0) isLegalBall = false;else if (xCanvasPos + randomRadius > this.state.width) isLegalBall = false;else if (yCanvasPos - randomRadius < 0) isLegalBall = false;else if (yCanvasPos + randomRadius > this.state.height) isLegalBall = false;
			}
			if (!didClickBall) {
				//Make new ball;
				if (isLegalBall) {
					console.log('Making new ball' + this.balls.length);
					var newBall = new Ball({
						ballID: this.balls.length,
						color: getRandomColor(),
						xCord: xCanvasPos,
						yCord: yCanvasPos,
						radius: randomRadius,
						dx: 2,
						dy: 2
					});
					newBall.maxSpeed = MAX_SPEED;
					this.balls.push(newBall);
					this.setState({
						ballCnt: this.state.ballCnt + 1
					});
				} else console.log('Not legal ball');
			}
		}
	}, {
		key: "componentDidMount",
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
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			clearInterval(this.timerID);
			window.removeEventListener('resize', this.updateWindowDimensions);
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			this.updateCanvas();
		}
	}, {
		key: "updateWindowDimensions",
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

			//Move balls around if conflict;
			//Change radius if conflict;
			for (var i = 0; i < this.balls.length; i++) {
				var ball = this.balls[i];
				var ballBottom = ball.yCord + ball.radius;
				var ballTop = ball.yCord - ball.radius;
				if (ballBottom > height) {
					ball.yCord = height - ball.radius;
					ball.accelerate(4 * GRAVITY, 20 * GRAVITY);
					ball.shrink();
				}
				if (ballTop <= 0) {
					ball.shrink();
				}
				for (var j = i + 1; j < this.balls.length; j++) {
					var otherBall = this.balls[j];
					var minDistance = ball.radius + otherBall.radius;
					var curDistance = ball.distanceBetween(ball.xCord, ball.yCord, otherBall.xCord, otherBall.yCord);
					if (curDistance < minDistance) ball.shrink();
				}
			} //end i-for
			if (this.state.isLeavingTrails === true && width && width > 575) {
				//Do not change the size if on mobile;
				this.updateBackground();
			}
			return;
		}
	}, {
		key: "updateCanvas",
		value: function updateCanvas() {
			var canvas = this.canvasRef;
			var ctx = canvas.getContext('2d');
			if (this.state.width !== 0) {
				if (this.balls.length === 0) {
					this.updateBackground();
					this.initDisplay();
				} // End first ball init;
				if (this.state.isLeavingTrails === false) {
					this.updateBackground();
				}
			} //end if state.width clarity check;
			for (var i = 0; i < this.balls.length; i++) {
				var ball = this.balls[i];
				if (!this.state.hasWallFriction) this.friction = 0;else this.friction = WALL_FRICTION;

				if (!this.state.hasBallFriction) ball.friction = 0;else ball.friction = BALL_FRICTION;

				if (!this.state.hasKineticTransfer) {
					ball.kineticGain = 1;
					ball.kineticLoss = 0;
				} else {
					ball.kineticLoss = KINETIC_LOSS;
					ball.kineticGain = KINETIC_KEEP;
				}
				//Assume we can go any direction first; Change values on `handle`*;
				ball.canGoUp = true;
				ball.canGoDown = true;
				ball.canGoLeft = true;
				ball.canGoRight = true;

				//Set wanted coordinates based off of previous movement;
				if (ball.isGoingUp) ball.nextY = ball.yCord - ball.dy;else if (ball.isGoingDown) ball.nextY = ball.yCord + ball.dy;
				if (ball.isGoingLeft) ball.nextX = ball.xCord - ball.dx;else if (ball.isGoingRight) ball.nextX = ball.xCord + ball.dx;

				for (var j = 0; j < this.rectangles.length; j++) {
					//Handle rectangle objects
					var rectangle = this.rectangles[j];
					var ballBottomOverLapsTop = false;
					var ballTopOverLapsBottom = false;
					//Process Up/Down 
					if (ball.nextY + ball.radius >= rectangle.yTop && ball.nextY - ball.radius <= rectangle.yTop && ball.isGoingDown) {
						//If ball bottom is lower than the top of the rectangle;
						// and if the ball top is above the top of the rectangle;
						ballBottomOverLapsTop = true;
					}
					if (ball.nextY - ball.radius <= rectangle.yBottom && ball.nextY + ball.radius >= rectangle.yBottom && ball.isGoingUp) {
						//If ball top is above the bottom of the rectangle;
						// and if the top is below the top of the rectangle;
						ballTopOverLapsBottom = true;
					}

					if (ball.nextX - ball.radius >= rectangle.xRight || ball.nextX + ball.radius <= rectangle.xLeft) {
						//Is the left of the ball right of the right side of the rectangle
						ballBottomOverLapsTop = false;
						ballTopOverLapsBottom = false;
					}

					if (ballBottomOverLapsTop) {
						if (rectangle.yTop > ball.radius * 2) {
							//Rectangle top should sit below the radius;
							//There is enough room for the ball to go here;
							ball.nextY = rectangle.yTop - ball.radius;
							ball.canGoDown = false;
						} else {
							//Ball needs to bounce back and cannot fit;
							if (ball.isGoingRight) {
								ball.canGoRight = false;
								//ball.nextX = rectangle.xLeft - ball.radius;
							} else if (ball.isGoingLeft) {
								ball.canGoLeft = false;
								//ball.nextX = rectangle.xRight + ball.radius;
							}
						}
					} else if (ballTopOverLapsBottom) {
						if (rectangle.yBottom + ball.radius * 2 < this.state.width) {
							//If rectangle bottom and ball fit within the screen;
							ball.nextY = rectangle.yBottom + ball.radius;
							ball.canGoUp = false;
						} else {
							//Ball needs to bounce back and cannot fit;
							if (ball.isGoingRight) {
								ball.canGoRight = false;
								//ball.nextX = rectangle.xLeft - ball.radius;
							} else if (ball.isGoingLeft) {
								ball.canGoLeft = false;
								//ball.nextX = rectangle.xRight + ball.radius;
							}
						}
					}

					//Process Left/Right
					var ballRightOverLapsLeft = false;
					var ballLeftOverLapsRight = false;
					if (ball.nextX + ball.radius >= rectangle.xLeft && ball.nextX - ball.radius <= rectangle.xLeft) {
						//If ball right is right of the left side
						// and ball left is left of the left side
						ballRightOverLapsLeft = true;
					}
					if (ball.nextX - ball.radius <= rectangle.xRight && ball.nextX + ball.radius >= rectangle.xRight) {
						//If ball left is left of the right side
						// and ball right is right of the right side
						ballLeftOverLapsRight = true;
					}

					if (ball.nextY + ball.radius <= rectangle.yTop) {
						//If ball bottom is above rectangles top
						ballRightOverLapsLeft = false;
						ballLeftOverLapsRight = false;
					} else if (ball.nextY - ball.radius >= rectangle.yBottom) {
						//If ball top is below rectangles bottom
						ballRightOverLapsLeft = false;
						ballLeftOverLapsRight = false;
					}

					if (ballRightOverLapsLeft) {
						ball.nextX = rectangle.xLeft - ball.radius - 0.001;
						ball.canGoRight = false;
					} else if (ballLeftOverLapsRight) {
						ball.nextX = rectangle.xRight + ball.radius - 0.001;
						ball.canGoLeft = false;
					}
				} //end j-for

				//See if expected coordinates will prevent us from going certain directions;
				ball.handleBoundaries(this.state.width, this.state.height, this.balls);
				ball.handleWallCollisions(this.state.width, this.state.height, this.friction);
				ball.handleBallCollisions(this.balls);

				ball.handleMovement(this.friction);
				ball.updateCoordinates();
				if (this.state.hasGravity) {
					ball.gravity = GRAVITY;
					ball.applyGravity();
				} else {
					ball.gravity = 0;
				}

				ball.draw(ctx);
				if (this.state.isShowingLabels) ball.label(ctx);
			} //end i-for
		} //End updateCanvas()

	}, {
		key: "shrinkBalls",
		value: function shrinkBalls(event) {
			for (var i = 0; i < this.balls.length; i++) {
				if (Math.random() >= 0.5) this.balls[i].shrink();
			} //end i-for
		} //end shrinkBalls

	}, {
		key: "accelerateBalls",
		value: function accelerateBalls(event) {
			for (var i = 0; i < this.balls.length; i++) {
				var ball = this.balls[i];
				if (ball.dx < 1) ball.dx += 3;
				if (ball.dy < 1) ball.dy += 3;
				var dxGain = getRandomInt(1, 50) * 0.01 * ball.dx;
				var dyGain = getRandomInt(1, 50) * 0.01 * ball.dy;
				ball.accelerate(dxGain, dyGain);
			} //end i-for
		} //end accelerateBalls

	}, {
		key: "decelerateBalls",
		value: function decelerateBalls(event) {
			for (var i = 0; i < this.balls.length; i++) {
				var dxLoss = getRandomInt(1, 50) * 0.01 * this.balls[i].dx;
				var dyLoss = getRandomInt(1, 50) * 0.01 * this.balls[i].dy;
				this.balls[i].decelerate(dxLoss, dyLoss);
			} //end i-for
		} //end decelerateBalls

	}, {
		key: "resetBalls",
		value: function resetBalls(event) {
			this.balls = [];
			this.setState({
				hasGravity: true,
				hasWallFriction: true,
				hasBallFriction: true,
				hasKineticTransfer: true,
				isLeavingTrails: false,
				isShowingLabels: true
			});
			var newBall = this.makeRandomBall();
			newBall.color = "blue";
			this.balls.push(newBall);
			this.setState({
				ballCnt: 1
			});
		} //end resetBalls

	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var penStyle = {
				border: "1px solid #000000"
			};
			var totalStyle = {
				textAlign: "right"
			};
			return React.createElement(
				"div",
				null,
				React.createElement(
					"p",
					{ style: totalStyle },
					"Ball Count: ",
					this.state.ballCnt
				),
				React.createElement("canvas", {
					ref: function ref(canvas) {
						return _this3.canvasRef = canvas;
					},
					width: this.state.width,
					height: this.state.height,
					style: penStyle,
					onClick: function onClick(e) {
						var canvas = _this3.canvasRef.getBoundingClientRect();
						var xClick = e.clientX;
						var yClick = e.clientY;
						_this3.handleCanvasClick(canvas, xClick, yClick);
					}
				}),
				React.createElement(
					"table",
					{ width: this.state.width },
					React.createElement(
						"tbody",
						null,
						React.createElement(
							"tr",
							null,
							React.createElement(
								"td",
								null,
								React.createElement(
									"label",
									null,
									"Has Gravity:\xA0\xA0",
									React.createElement("input", {
										name: "hasGravity",
										type: "checkbox",
										checked: this.state.hasGravity,
										onChange: this.handleInputChange })
								)
							),
							React.createElement(
								"td",
								null,
								React.createElement(
									"label",
									null,
									"Has Wall Friction:\xA0\xA0",
									React.createElement("input", {
										name: "hasWallFriction",
										type: "checkbox",
										checked: this.state.hasWallFriction,
										onChange: this.handleInputChange })
								)
							),
							React.createElement(
								"td",
								null,
								React.createElement(
									"label",
									null,
									"Has Ball Friction:\xA0\xA0",
									React.createElement("input", {
										name: "hasBallFriction",
										type: "checkbox",
										checked: this.state.hasBallFriction,
										onChange: this.handleInputChange })
								)
							)
						),
						React.createElement(
							"tr",
							null,
							React.createElement(
								"td",
								null,
								React.createElement(
									"label",
									null,
									"Has Kinetic Transfer:\xA0\xA0",
									React.createElement("input", {
										name: "hasKineticTransfer",
										type: "checkbox",
										checked: this.state.hasKineticTransfer,
										onChange: this.handleInputChange })
								)
							),
							React.createElement(
								"td",
								null,
								React.createElement(
									"label",
									null,
									"Leave Trails:\xA0\xA0",
									React.createElement("input", {
										name: "isLeavingTrails",
										type: "checkbox",
										checked: this.state.isLeavingTrails,
										onChange: this.handleInputChange })
								)
							),
							React.createElement(
								"td",
								null,
								React.createElement(
									"label",
									null,
									"Turn on Lables:\xA0\xA0",
									React.createElement("input", {
										name: "isShowingLabels",
										type: "checkbox",
										checked: this.state.isShowingLabels,
										onChange: this.handleInputChange })
								)
							)
						),
						React.createElement(
							"tr",
							null,
							React.createElement(
								"td",
								null,
								React.createElement(
									"button",
									{ onClick: this.shrinkBalls },
									"Shrink Some Balls"
								)
							),
							React.createElement(
								"td",
								null,
								React.createElement(
									"button",
									{ onClick: this.accelerateBalls },
									"Accelerate Balls"
								)
							),
							React.createElement(
								"td",
								null,
								React.createElement(
									"button",
									{ onClick: this.decelerateBalls },
									"Decelerate Balls"
								)
							)
						),
						React.createElement(
							"tr",
							null,
							React.createElement(
								"td",
								null,
								React.createElement(
									"button",
									{ onClick: this.resetBalls },
									"Reset Balls"
								)
							)
						)
					)
				)
			);
		}
	}]);

	return BallPen;
}(React.Component);

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('slanted-1'));