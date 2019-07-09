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
		this.yHasMomentum = true;
		this.xHasMomentum = true;
		this.xCord = 21;
		this.yCord = 41;
		this.radius = 60;
		this.xSpeed = 2;
		this.ySpeed = 1.05;
		this.gravity = 0.5;
		this.friction = 0.15;
		this.color = "white";
		this.ballID = props.ballID;
		this.canvas = props.canvas;
	}

	_createClass(Ball, [{
		key: 'draw',
		value: function draw() {
			var ctx = this.canvas.getContext('2d');
			ctx.beginPath();
			ctx.arc(this.xCord, this.yCord, this.radius, 2 * Math.PI, false);
			ctx.fillStyle = "blue";
			ctx.fill();
		}
	}, {
		key: 'accelerate',
		value: function accelerate() {
			console.log('accelerating ball: ' + this.ballID);
			this.ySpeed += 5;
			this.xSpeed += 2;
			this.xHasMomentum = true;
			this.yHasMomentum = true;
		}
	}, {
		key: 'updateCoordinates',
		value: function updateCoordinates(maxHeight) {
			if (this.yHasMomentum) {
				//Still bouncing;
				if (this.isGoingDown === true) {
					this.ySpeed += this.gravity;
					this.yCord += this.ySpeed;
				} else {
					//We are going up;
					this.ySpeed -= this.gravity;
					this.yCord -= this.ySpeed;
				}
			} else if (this.xSpeed <= 0) this.xHasMomentum = false;
			if (this.xHasMomentum) {
				if (!this.yHasMomentum) this.xSpeed -= this.friction;
				if (this.xSpeed <= 0) this.xHasMomentum = false;else {
					if (this.isGoingRight === true) this.xCord += this.xSpeed;else this.xCord -= this.xSpeed;
				}
			}
		} //End updateCoordinates()

	}, {
		key: 'updateTrajectory',
		value: function updateTrajectory(penHeight, penWidth) {
			//Will need to update to allow for multiple heights and widths
			//	and then find the best/only solution;
			var rightBound = this.xCord + this.radius;
			var leftBound = this.xCord - this.radius;
			var hitTop = this.hitTop();
			var hitBottom = this.hitBottom(penHeight);
			this.yHasMomentum = true;

			if (hitBottom === true && this.ySpeed <= 0) {
				this.yHasMomentum = false;
				this.yCord = penHeight - this.radius;
			} else if (hitTop === false && this.ySpeed <= 0) {
				//Lost momentum; Coming back down;
				this.isGoingDown = true;
				this.ySpeed -= this.friction;
			} else if (hitTop === true) {
				this.isGoingDown = true;
				this.yCord = 0 + this.radius;
				this.ySpeed -= this.friction;
			} else if (hitBottom === true) {
				this.isGoingDown = false;
				this.yCord = penHeight - this.radius;
				this.ySpeed -= this.friction;
			}

			if (leftBound <= 0) {
				this.isGoingRight = true;
				this.xCord = 0 + this.radius;
				this.ySpeed -= this.friction;
				this.xSpeed -= this.friction;
			} else if (rightBound >= penWidth) {
				this.isGoingRight = false;
				this.xCord = penWidth - this.radius;
				this.ySpeed -= this.friction;
				this.xSpeed -= this.friction;
			}
		} //End updateTrajectory()

	}, {
		key: 'hitBottom',
		value: function hitBottom(penHeight) {
			var bottomBound = this.yCord + this.radius;
			if (bottomBound >= penHeight) return true;
			return false;
		}
	}, {
		key: 'hitTop',
		value: function hitTop() {
			var topBound = this.yCord - this.radius;
			if (topBound <= 0) return true;
			return false;
		}
	}]);

	return Ball;
}();

var BallPen = function (_React$Component) {
	_inherits(BallPen, _React$Component);

	function BallPen(props) {
		_classCallCheck(this, BallPen);

		var _this = _possibleConstructorReturn(this, (BallPen.__proto__ || Object.getPrototypeOf(BallPen)).call(this, props));

		_this.state = {
			height: 0,
			width: 0
		};
		_this.ball = null;
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
			var canvas = this.canvasRef;
			var ctx = canvas.getContext('2d');
			ctx.beginPath();
			ctx.rect(0, 0, this.state.width, this.state.height);
			ctx.fillStyle = "#FF0000";
			ctx.fill();
			if (this.isStarted === false) {
				//init balls
				this.ball = new Ball({ canvas: canvas, ballID: "ball0" });
				this.ball.draw();
				this.isStarted = true;
			} else {
				//animate balls
				this.ball.updateCoordinates(this.state.height);
				this.ball.updateTrajectory(this.state.height, this.state.width);
				this.ball.draw();
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
						var xBall = _this3.ball.xCord;
						var yBall = _this3.ball.yCord;
						var xDiff = xCanvasPos - xBall;
						var yDiff = yCanvasPos - yBall;
						var ballMouseDistance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
						var clickedBall = ballMouseDistance <= _this3.ball.radius;
						if (clickedBall) {
							_this3.ball.accelerate();
						} else {
							console.log(' did not clicked ball');
						}
					}
				})
			);
		}
	}]);

	return BallPen;
}(React.Component);

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('ball-pen'));