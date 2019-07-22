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
		this.canGoLeft = true;
		this.canGoRight = true;
		this.canGoDown = true;
		this.canGoUp = true;
		this.isStatic = false;
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
					this.canGoUp = false;
				}
				this.canGoDown = false;
				this.nextY = maxHeight - this.radius;
			} else if (willOverlapTop) {
				this.dy += friction;
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
						break;
					}
				} //end while

				//TODO: A process of destroying balls if persistent overlap;

				//Apply Kinetic Transfers
				otherBall.dx += this.dx * this.kineticLoss;
				this.dx *= this.kineticGain;
				otherBall.dy += this.dy * this.kineticLoss;
				this.dy *= this.kineticGain;
				otherBall.isStatic = false;
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
					//init second ball for testing;
					//	this.balls.push(
					//		new Ball({
					//			canvas:	canvas,
					//			ballID:	1,
					//			xCord:	141,
					//			yCord:	41,
					//			radius:	30,
					//			dx: 		0,
					//			dy:		0
					//		})
					//	);
				} // End first ball init;
				for (var i = 0; i < this.balls.length; i++) {
					var ball = this.balls[i];
					ball.applyGravity();
					//Assume we can go any direction first; Change values on `handle`*;
					ball.canGoUp = true;
					ball.canGoDown = true;
					ball.canGoLeft = true;
					ball.canGoRight = true;

					//See if we lost momentum since last frame;
					if (ball.isGoingUp && ball.dy <= 0) {
						//Ball lost momentum last frame and cannot go up any further;
						ball.isGoingUp = false;
						ball.isGoingDown = true;
					}

					//Set wanted coordinates based off of previous movement;
					if (ball.isGoingUp) ball.nextY = ball.yCord - ball.dy;else if (ball.isGoingDown) ball.nextY = ball.yCord + ball.dy;
					if (ball.isGoingLeft) ball.nextX = ball.xCord - ball.dx;else if (ball.isGoingRight) ball.nextX = ball.xCord + ball.dx;

					//See if expected coordinates will prevent us from going certain directions;
					ball.handleWallCollisions(this.state.width, this.state.height, this.friction);
					ball.handleBallCollisions(this.balls);

					// **** Handle Ball Movement ****
					//Set directions for next movement based off of current collisions;
					if (ball.canGoDown && ball.canGoUp) {
						ball.isGoingUp = ball.isGoingUp;
						ball.isGoingDown = ball.isGoingDown;
					} else if (ball.canGoUp) {
						if (ball.dy > 0) ball.isGoingUp = true;
						ball.isGoingDown = false;
					} else if (ball.canGoDown) {
						ball.isGoingDown = true;
						ball.isGoingUp = false;
					} else {
						ball.isGoingDown = false;
						ball.isGoingUp = false;
						ball.dx -= this.friction;
						if (ball.dx < 0) ball.dx = 0;
					}
					if (ball.canGoRight && ball.canGoLeft) {
						ball.isGoingRight = ball.isGoingRight;
						ball.isGoingLeft = ball.isGoingLeft;
					} else if (ball.canGoRight) {
						ball.isGoingRight = true;
						ball.isGoingLeft = false;
					} else if (ball.canGoLeft) {
						ball.isGoingRight = false;
						ball.isGoingLeft = true;
					} else {
						ball.isGoingRight = false;
						ball.isGoingLeft = false;
					}

					if (ball.isGoingUp && ball.isGoingDown) console.log('ERROR: BALL CANNOT GO UP AND DOWN');
					if (ball.isGoingLeft && ball.isGoingRight) console.log('ERROR: BALL CANNOT GO LEFT AND RIGHT');
					ball.updateCoordinates();
					ball.draw();
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

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('ball-pen-10'));