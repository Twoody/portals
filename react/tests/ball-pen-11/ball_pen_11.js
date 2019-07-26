'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initRadius = 30;
var initWallFriction = 0.075;
var initBallFriction = 0.05;
var initGravity = 0.45;
var initKineticLoss = 1 / 3;
var initKineticGain = 2 / 3;
var rectangleColor = "black";
function getRandomColor() {
	var red = Math.floor(Math.random() * 3) * 127;
	var green = Math.floor(Math.random() * 3) * 127;
	var blue = Math.floor(Math.random() * 3) * 127;
	var rc = "rgb(" + red + ", " + green + ", " + blue + ")";
	return rc;
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
			isLeavingTrails: false
		};
		_this.balls = [];
		_this.friction = initWallFriction;
		_this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
		_this.handleInputChange = _this.handleInputChange.bind(_this);
		return _this;
	}

	_createClass(BallPen, [{
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
					ball.accelerate(4 * initGravity, 20 * initGravity);
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
						color: getRandomColor(),
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
					ball.accelerate(4 * initGravity, 20 * initGravity);
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
			if (this.state.isLeavingTrails === true) {
				var canvas = this.canvasRef;
				var ctx = canvas.getContext('2d');
				// Init Canvas
				ctx.beginPath();
				ctx.rect(0, 0, this.state.width, this.state.height);
				ctx.fillStyle = rectangleColor;
				ctx.fill();
			}
			return;
		}
	}, {
		key: "updateCanvas",
		value: function updateCanvas() {
			var canvas = this.canvasRef;
			var ctx = canvas.getContext('2d');
			if (this.state.isLeavingTrails === false) {
				ctx.beginPath();
				ctx.rect(0, 0, this.state.width, this.state.height);
				ctx.fillStyle = rectangleColor;
				ctx.fill();
			}
			if (this.state.width !== 0) {
				if (this.balls.length === 0) {
					// Init Canvas
					ctx.beginPath();
					ctx.rect(0, 0, this.state.width, this.state.height);
					ctx.fillStyle = rectangleColor;
					ctx.fill();

					// Init first ball
					this.balls.push(new Ball({
						ballID: 0,
						color: "blue",
						xCord: 41,
						yCord: 41,
						radius: initRadius,
						dx: 2,
						dy: 2
					}));
				} // End first ball init;
				for (var i = 0; i < this.balls.length; i++) {
					var ball = this.balls[i];
					if (!this.state.hasWallFriction) this.friction = 0;else this.friction = initWallFriction;

					if (!this.state.hasBallFriction) ball.friction = 0;else ball.friction = initBallFriction;

					if (!this.state.hasKineticTransfer) {
						ball.kineticGain = 1;
						ball.kineticLoss = 0;
					} else {
						ball.kineticLoss = initKineticLoss;
						ball.kineticGain = initKineticGain;
					}
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

					ball.handleMovement(this.friction);

					ball.updateCoordinates();
					if (this.state.hasGravity) {
						ball.gravity = initGravity;
						ball.applyGravity();
					} else {
						ball.gravity = 0;
					}

					ball.draw(ctx);
					ball.label(ctx);
				} //end i-for
			} //end if state.width clarity check;
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var penStyle = {
				border: "1px solid #000000"
			};
			return React.createElement(
				"div",
				null,
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
					"label",
					null,
					"Has Gravity:\xA0\xA0",
					React.createElement("input", {
						name: "hasGravity",
						type: "checkbox",
						checked: this.state.hasGravity,
						onChange: this.handleInputChange })
				),
				React.createElement("br", null),
				React.createElement(
					"label",
					null,
					"Has Wall Friction:\xA0\xA0",
					React.createElement("input", {
						name: "hasWallFriction",
						type: "checkbox",
						checked: this.state.hasWallFriction,
						onChange: this.handleInputChange })
				),
				React.createElement("br", null),
				React.createElement(
					"label",
					null,
					"Has Ball Friction:\xA0\xA0",
					React.createElement("input", {
						name: "hasBallFriction",
						type: "checkbox",
						checked: this.state.hasBallFriction,
						onChange: this.handleInputChange })
				),
				React.createElement("br", null),
				React.createElement(
					"label",
					null,
					"Has Kinetic Transfer:\xA0\xA0",
					React.createElement("input", {
						name: "hasKineticTransfer",
						type: "checkbox",
						checked: this.state.hasKineticTransfer,
						onChange: this.handleInputChange })
				),
				React.createElement("br", null),
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
			);
		}
	}]);

	return BallPen;
}(React.Component);

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('ball-pen-11'));