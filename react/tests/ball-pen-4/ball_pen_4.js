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
		this.gravity = 0.05;
		this.isGoingRight = true;
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
			this.dy += this.gravity;
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
				this.dy *= -1;
				this.dy += friction;
				this.nextY = maxHeight - this.radius;
			} else if (willOverlapTop) {
				this.dy *= -1;
				this.dy -= friction;
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
			if (this.hitBottom(maxHeight) && this.dy > 0) {
				//Positive dy implies ball still wants to go down;
				//If we are on the bottom, the ball can no longer go down;
				return false;
			}
			//TODO: For loop through allBalls
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
		_this.friction = 0.1;
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
				} // End first ball init;
				for (var i = 0; i < this.balls.length; i++) {
					var ball = this.balls[i];
					var isBouncing = ball.isBouncing(this.state.height, this.balls);
					if (!isBouncing && ball.dx === 0) {
						//Ball is static;
						ball.draw();
						ctx.font = "15px Arial";
						ctx.fillStyle = "white";
						ctx.fillText("Static", ball.xCord - ball.radius + 1, ball.yCord + 1);
						continue;
					} else if (!isBouncing) {
						if (ball.isGoingRight) ball.nextX = ball.xCord + ball.dx;else ball.nextX = ball.xCord - ball.dx;
						//Ball is rolling; Apply friction;
						ball.dx -= this.friction;
						if (ball.dx < 0) ball.dx = 0;
					} else {
						ball.applyGravity();
						ball.nextY = ball.yCord + ball.dy;
						if (ball.isGoingRight) ball.nextX = ball.xCord + ball.dx;else ball.nextX = ball.xCord - ball.dx;
					}
					ball.handleWallCollisions(this.state.width, this.state.height, this.friction);
					ball.updateCoordinates();
					ball.draw();
				} //end i-for
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
					style: penStyle
				})
			);
		}
	}]);

	return BallPen;
}(React.Component);

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('ball-pen-4'));