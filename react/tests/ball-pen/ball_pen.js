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
		this.radius = props.radius;;
		this.mass = Math.pow(this.radius, 3);
		this.dy = 2;
		this.dx = 1.05;
		this.gravity = 1;
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
			this.xCord += this.dx;
			this.yCord += this.dy;
		}
	}, {
		key: 'staticCollision',
		value: function staticCollision(otherBalls) {
			for (var i = 0; i < otherBalls.length; i++) {
				var otherBall = otherBalls[i];
				if (this.ballID === otherBall.ballID) continue;
				var combinedR = this.radius + otherBall.radius;
				var distance = this.getDistanceBetween(otherBall);
				if (distance > combinedR) continue;
				var theta = this.getThetaBetween(otherBall);
				var overlap = this.getOverlap(otherBall);
				//TODO: getSmallerBall();
				var smallerBallID = this.radius <= otherBall.radius ? this.ballID : otherBall.ballID;
				if (smallerBallID === this.ballID) {
					this.xCord -= overlap * Math.cos(theta);
					this.yCord -= overlap * Math.sin(theta);
				} else {
					otherBall.xCord -= overlap * Math.cos(theta);
					otherBall.yCord -= overlap * Math.sin(theta);
				}
			} //end i-for
		}
	}, {
		key: 'ballCollision',
		value: function ballCollision(otherBalls) {
			for (var i = 0; i < otherBalls.length; i++) {
				var otherBall = otherBalls[i];
				if (this.ballID === otherBall.ballID) {
					continue;
				}
				var distanceNextFrame = this.getDistanceNextFrame(otherBall);
				//console.log('distanceNextFrame: ' + distanceNextFrame);
				if (distanceNextFrame > 0) {
					continue;
				}
				console.log('Collsion: `' + this.ballID + '` & `' + otherBall.ballID + '`');
				var theta = this.getThetaBetween2(otherBall);
				var angle1 = this.getAngle();
				var angle2 = otherBall.getAngle();
				var m1 = this.mass;
				var m2 = otherBall.mass;
				var v1 = this.getSpeed();
				var v2 = otherBall.getSpeed();
				//TODO: Break this up and explain it;
				var dx1F = (v1 * Math.cos(angle1 - theta) * (m1 - m2) + 2 * m2 * v2 * Math.cos(angle2 - theta)) / (m1 + m2) * Math.cos(theta) + v1 * Math.sin(angle1 - theta) * Math.cos(theta + Math.PI / 2);
				//var dx1F =     (v1 * Math.cos(theta1 - phi)   * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi))   / (m1+m2) * Math.cos(phi)   + v1*Math.sin(theta1-phi)   * Math.cos(phi+Math.PI/2);
				var dy1F = (v1 * Math.cos(angle1 - theta) * (m1 - m2) + 2 * m2 * v2 * Math.cos(angle2 - theta)) / (m1 + m2) * Math.sin(theta) + v1 * Math.sin(angle1 - theta) * Math.sin(theta + Math.PI / 2);
				var dx2F = (v2 * Math.cos(angle2 - theta) * (m2 - m1) + 2 * m1 * v1 * Math.cos(angle1 - theta)) / (m1 + m2) * Math.cos(theta) + v2 * Math.sin(angle2 - theta) * Math.cos(theta + Math.PI / 2);
				var dy2F = (v2 * Math.cos(angle2 - theta) * (m2 - m1) + 2 * m1 * v1 * Math.cos(angle1 - theta)) / (m1 + m2) * Math.sin(theta) + v2 * Math.sin(angle2 - theta) * Math.sin(theta + Math.PI / 2);

				this.dx = dx1F;
				this.dy = dy1F;
				otherBall.dx = dx2F;
				otherBall.dy = dy2F;
			} //end i-for
		} //end ballCollision()

	}, {
		key: 'wallCollision',
		value: function wallCollision(width, height) {
			var didHitWall = false;
			if (this.xCord - this.radius + this.dx < 0 || this.xCord + this.radius + this.dx > width) {
				this.dx *= -1;
				didHitWall = true;
			}
			if (this.yCord - this.radius + this.dy < 0 || this.yCord + this.radius + this.dy > height) {
				this.dy *= -1;
				didHitWall = true;
			}
			if (this.yCord + this.radius > height) {
				this.yCord = height - this.radius;
				didHitWall = true;
			}
			if (this.yCord - this.radius < 0) {
				this.yCord = this.radius;
				didHitWall = true;
			}
			if (this.xCord + this.radius > width) {
				this.xCord = width - this.radius;
				didHitWall = true;
			}
			if (this.xCord - this.radius < 0) {
				this.xCord = this.radius;
				didHitWall = true;
			}
			if (didHitWall) {
				//console.log('hit wall');
			} else {
					//console.log('did not hit wall');
				}
		}
	}, {
		key: 'getThetaBetween',
		value: function getThetaBetween(otherBall) {
			var theta = Math.atan2(this.yCord - otherBall.yCord, this.xCord - otherBall.xCord);
			return theta;
		}
	}, {
		key: 'getThetaBetween2',
		value: function getThetaBetween2(otherBall) {
			var theta = Math.atan2(otherBall.yCord - this.yCord, otherBall.xCord - this.xCord);
			return theta;
		}
	}, {
		key: 'getOverlap',
		value: function getOverlap(otherBall) {
			var distance = this.getDistanceBetween(otherBall);
			var overlap = this.radius + otherBall.radius - distance;
			return overlap;
		}
	}, {
		key: 'getAngle',
		value: function getAngle() {
			return Math.atan2(this.dy, this.dx);
		}
	}, {
		key: 'getSpeed',
		value: function getSpeed() {
			return Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
		}
	}, {
		key: 'accelerate',
		value: function accelerate() {
			console.log('accelerating ball: ' + this.ballID);
			if (this.dy > 0) this.dy += 5;else this.dy -= 5;
			if (this.xy > 0) this.dx += 2;else this.dx -= 2;
		}
	}, {
		key: 'applyGravity',
		value: function applyGravity(height) {
			if (this.onGround(height) === false) this.dy += this.gravity;
		}
	}, {
		key: 'applyDrag',
		value: function applyDrag() {
			this.dx *= 0.99;
			this.dy *= 0.99;
		}
	}, {
		key: 'getDistanceBetween',
		value: function getDistanceBetween(otherBall) {
			//Get the distance between `this` and a different object;
			var xDiff = this.xCord - otherBall.xCord;
			var yDiff = this.yCord - otherBall.yCord;
			var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
			return distance;
		}
	}, {
		key: 'getDistanceNextFrame',
		value: function getDistanceNextFrame(otherBall) {
			var nextX1 = this.xCord + this.dx;
			var nextX2 = otherBall.xCord + otherBall.dx;
			var nextY1 = this.yCord + this.dy;
			var nextY2 = otherBall.yCord + otherBall.dy;
			var xDiff = nextX1 - nextX2;
			var yDiff = nextY1 - nextY2;
			var combinedR = this.radius + otherBall.radius;
			var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)) - combinedR;
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
		key: 'onGround',
		value: function onGround(height) {
			return this.yCord + this.radius >= height;
		}
	}, {
		key: 'isStatic',
		value: function isStatic(height) {
			if (this.dy <= 0 && this.yCord === height) return true;
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
						radius: 30,
						maxHeight: this.state.height,
						maxWidth: this.state.width
					}));
					this.balls[0].draw();
					this.isStarted = true;
				} else {
					//animate balls
					for (var i = 0; i < this.balls.length; i++) {
						var ball = this.balls[i];
						if (ball.isStatic(this.state.height)) continue;
						ball.applyGravity(this.state.height);
						ball.applyDrag();
						ball.updateCoordinates();
						ball.staticCollision(this.balls);
						ball.ballCollision(this.balls);
						ball.wallCollision(this.state.width, this.state.height);
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
									radius: 30,
									maxHeight: _this3.state.height,
									maxWidth: _this3.state.width
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