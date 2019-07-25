'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initRadius = 30;

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
		key: 'handleCanvasClick',
		value: function handleCanvasClick(canvas, xClick, yClick) {
			var rect = canvas;
			var xMousePos = xClick;
			var yMousePos = yClick;;
			var xCanvasPos = xMousePos - rect.left;
			var yCanvasPos = yMousePos - rect.top;
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
				if (isLegalBall) isLegalBall = ballMouseDistance >= radius + initRadius;
				if (clickedBall) {
					ball.accelerate();
					didClickBall = true;
					break;
				}
			} //end i-for
			if (isLegalBall) {
				//Check with top, bottom, and sides;
				if (xCanvasPos - initRadius < 0) isLegalBall = false;else if (xCanvasPos + initRadius > this.state.width) isLegalBall = false;else if (yCanvasPos - initRadius < 0) isLegalBall = false;else if (yCanvasPos + initRadius > this.state.height) isLegalBall = false;
			}
			if (!didClickBall) {
				//Make new ball;
				if (isLegalBall) {
					console.log('Making new ball' + this.balls.length);
					var newBall = new Ball({
						ballID: this.balls.length,
						xCord: xCanvasPos,
						yCord: yCanvasPos,
						radius: initRadius,
						dx: 2,
						dy: 2
					});
					this.balls.push(newBall);
				} else console.log('Not legal ball');
			}
		}
	}, {
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

			//Move balls around if conflict;
			//Change radius if conflict;
			for (var i = 0; i < this.balls.length; i++) {
				var ball = this.balls[i];
				var ballBottom = ball.yCord + ball.radius;
				var ballTop = ball.yCord - ball.radius;
				if (ballBottom > height) {
					ball.yCord = height - ball.radius;
					ball.accelerate();
					ball.radius *= 0.9;
				}
				if (ballTop <= 0) {
					ball.radius *= 0.9;
				}
				for (var j = i + 1; j < this.balls.length; j++) {
					var otherBall = this.balls[j];
					var minDistance = ball.radius + otherBall.radius;
					var curDistance = ball.distanceBetween(ball.xCord, ball.yCord, otherBall.xCord, otherBall.yCord);
					if (curDistance < minDistance) ball.radius *= 0.9;
				}
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
						ballID: 0,
						xCord: 41,
						yCord: 41,
						radius: initRadius,
						dx: 2,
						dy: 2
					}));
				} // End first ball init;
				for (var i = 0; i < this.balls.length; i++) {
					var ball = this.balls[i];

					//Assume we can go any direction first; Change values on `handle`*;
					ball.canGoUp = true;
					ball.canGoDown = true;
					ball.canGoLeft = true;
					ball.canGoRight = true;

					//Set wanted coordinates based off of previous movement;
					if (ball.isGoingUp) ball.nextY = ball.yCord - ball.dy;else if (ball.isGoingDown) ball.nextY = ball.yCord + ball.dy;
					if (ball.isGoingLeft) ball.nextX = ball.xCord - ball.dx;else if (ball.isGoingRight) ball.nextX = ball.xCord + ball.dx;

					//See if expected coordinates will prevent us from going certain directions;
					ball.handleBoundaries(this.state.width, this.state.height, this.balls);
					ball.handleWallCollisions(this.state.width, this.state.height, this.friction);
					ball.handleBallCollisions(this.balls);

					ball.handleMovement();

					ball.updateCoordinates();
					ball.applyGravity();

					ball.draw(ctx);
					ball.label(ctx);
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
						var canvas = _this3.canvasRef.getBoundingClientRect();
						var xClick = e.clientX;
						var yClick = e.clientY;
						_this3.handleCanvasClick(canvas, xClick, yClick);
					}
				})
			);
		}
	}]);

	return BallPen;
}(React.Component);

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('ball-pen-11'));