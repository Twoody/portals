'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
	function Ball(props) {
		_classCallCheck(this, Ball);

		this.canvas = props.canvas;
		this.ballID = props.ballID;
		this.index = props.index;
		this.color = "blue";
		this.xCord = props.xInit;
		this.yCord = props.yInit;
		this.xPrev = null;
		this.yPrev = null;
		this.radius = props.radius;;
		this.mass = Math.pow(this.radius, 3);
		this.dy = 2;
		this.dx = 1.05;
		this.dxAllowed = this.dx; //Not always allowed to do full movement;
		this.dyAllowed = this.dy;
		this.gravity = 0.05;
		this.friction = 0.1;
		this.drag = 0.01;
		this.isGoingRight = true;
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
		key: 'updateCoordinates',
		value: function updateCoordinates() {
			this.xPrev = this.xCord;
			this.yPrev = this.yCord;
			if (this.isGoingRight) this.xCord += this.dxAllowed;else this.xCord -= this.dxAllowed;
			this.yCord += this.dyAllowed;
			//console.log('y:' + this.yCord);
			//console.log('x:' + this.xCord);
		}
	}, {
		key: 'handleCollisions',
		value: function handleCollisions(width, height, otherBalls) {
			/*
   This physics engine is designed to prohibit objects penetrating each other, 
   it works only on non-penetrating rigid bodies. Detecting a penetration 
   (overlap) between objects means that a collision has occurred. We then back 
   up in time to just before the collision – so the objects are not 
   overlapping – and apply an impulse to reverse the collision.
   	- https://www.myphysicslab.com/develop/docs/Engine2D.html#themathbehindthephysicsengine
   */
			this.handleWallCollisions(width, height);
			this.handleBallCollisions(otherBalls);
			this.handleScreenResize(width, height);
		} //end handleCollisions()

	}, {
		key: 'handleWallCollisions',
		value: function handleWallCollisions(width, height) {
			var leftBound = this.xCord - this.radius + this.dxAllowed;
			var rightBound = this.xCord + this.radius + this.dxAllowed;
			var topBound = this.yCord - this.radius + this.dyAllowed;
			var bottomBound = this.yCord + this.radius + this.dyAllowed;
			if (leftBound < 0) {
				//Overlapping containers left side;
				this.updateAllowedMovement(0, this.yCord + this.dyAllowed, this.radius);
				this.dx -= this.friction;
				this.isGoingRight = !this.isGoingRight;
				console.log('Hit Left');
			}
			if (rightBound > width) {
				//Overlapping containers left side;
				this.updateAllowedMovement(width, this.yCord + this.dyAllowed, this.radius);
				this.dx -= this.friction;
				this.isGoingRight = !this.isGoingRight;
			}
			if (topBound < 0) {
				//Overlapping containers left side;
				this.updateAllowedMovement(this.xCord + this.dxAllowed, 0, this.radius);
				this.dy += this.friction;
				this.dy *= -1;
				console.log('Hit top');
			}
			if (bottomBound > height) {
				//Overlapping containers left side;
				this.updateAllowedMovement(this.xCord + this.dxAllowed, height, this.radius);
				this.dy -= this.friction;
				if (this.dy < 0) {
					//No more momemntum to go back up
					this.dy = 0;
					this.dx -= this.friction;
					if (this.dx < 0) this.dx = 0;
				} else {
					this.dy *= -1;
				}
			}
		} //end handleWallCollisions()

	}, {
		key: 'updateAllowedMovement',
		value: function updateAllowedMovement(xBound, yBound, minDistance) {
			//Draw a line from current position to parameter positions;
			//While line is greatere than minDistance, subtract from what is allowed;
			var frames = 100;
			var dxRatio = this.dxAllowed / frames;
			var dyRatio = this.dyAllowed / frames;
			var frameCount = 1;
			var nextDistance = this.getNextDistance(xBound, yBound);
			while (nextDistance < minDistance) {
				if (this.isGoingRight) {
					//Move back left
					this.dxAllowed += dxRatio;
				} else {
					//Move backright 
					this.dxAllowed -= dxRatio;
				}
				this.dyAllowed -= dyRatio;
				nextDistance = this.getNextDistance(xBound, yBound);
			}
		}
	}, {
		key: 'handleBallCollisions',
		value: function handleBallCollisions(otherBalls) {
			for (var i = 0; i < otherBalls.length; i++) {
				var otherBall = otherBalls[i];
				if (otherBall.ballID === this.ballID) continue;
				var combinedR = this.radius + otherBall.radius;
				var distance = this.getNextDistance(otherBall.xCord, otherBall.yCord);
				if (combinedR >= distance) continue;
				//Else, we have a collision;
			}
		} //end handleBallCollisions()

	}, {
		key: 'handleScreenResize',
		value: function handleScreenResize(width, height) {
			var leftBound = this.xCord - this.radius;
			var rightBound = this.xCord + this.radius;
			var topBound = this.yCord - this.radius;
			var bottomBound = this.yCord + this.radius;
			if (leftBound < 0) {
				//Overlapping containers left side;
				this.dxAllowed = 0;
				this.xCord = 0 + this.radius;
				this.dx -= this.friction;
				this.isGoingRight = !this.isGoingRight;
			}
			if (rightBound > width) {
				//Overlapping containers left side;
				this.dxAllowed = 0;
				this.xCord = width - this.radius;
				this.dx -= this.friction;
				this.isGoingRight = !this.isGoingRight;
			}
			if (topBound < 0) {
				//Overlapping containers left side;
				this.dyAllowed = 0;
				this.yCord = 0 + this.radius;
				this.dy += this.friction;
				this.dy *= -1;
			}
			if (bottomBound > height) {
				//Overlapping containers left side;
				this.dyAllowed = 0;
				this.yCord = height - this.radius;
				this.dy -= this.friction;
				this.dy *= -1;
			}
		}
	}, {
		key: 'getNextDistance',
		value: function getNextDistance(otherX, otherY) {
			var xDiff = this.xCord + this.dxAllowed - otherX;
			var yDiff = this.yCord + this.dyAllowed - otherY;
			var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
			return distance;
		}
	}, {
		key: 'getDistanceBetween',
		value: function getDistanceBetween(otherX, otherY) {
			var xDiff = this.xCord - otherX;
			var yDiff = this.yCord - otherY;
			var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
			return distance;
		}
	}, {
		key: 'isStatic',
		value: function isStatic(width, height) {
			//Ball is static if the friction from the container stops the movement
			//	at the point we change directions.
			// I.e. there is no more momentum after the friction interaction;
			if (this.yCord - this.radius < height) {
				return false;
			}
			if (this.dx > 0) return false;
			console.log(this.ballID + ' IS STATIC');
			return true;
		}
	}, {
		key: 'applyGravity',
		value: function applyGravity() {
			this.dy += this.gravity;
		}
	}, {
		key: 'isInBounds',
		value: function isInBounds(width, height) {}
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
			return;
		}
	}, {
		key: 'updateCanvas',
		value: function updateCanvas() {
			//TODO: Check if bottom layer is maxed out on objects;
			//			If bottom layer is maxed out on objects, and all items are static,
			//			Add an additional layer to the top of the canvas for any extra balls;
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
						index: 0,
						xInit: 61,
						yInit: 41,
						radius: 30
					}));
					this.balls[0].draw();
					this.isStarted = true;
				} else {
					//animate balls
					for (var i = 0; i < this.balls.length; i++) {
						var ball = this.balls[i];
						if (ball.isStatic(this.state.width, this.state.height)) {
							ball.draw();
							continue;
						}
						ball.applyGravity();
						ball.dxAllowed = ball.dx;
						ball.dyAllowed = ball.dy;
						ball.handleCollisions(this.state.width, this.state.height, this.balls);
						ball.updateCoordinates();
						ball.draw();
					}
				}
			}
		} //end updateCanvas()

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
							if (isLegalBall) {
								isLegalBall = ballMouseDistance >= radius * 2;
							}
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
									index: _this3.balls.length,
									xInit: xCanvasPos,
									yInit: yCanvasPos,
									radius: 30
								});
								_this3.balls.push(newBall);
							} else {
								console.log('Not legal ball');
							}
						}
					}
				})
			);
		}
	}]);

	return BallPen;
}(React.Component);

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('ball-pen'));