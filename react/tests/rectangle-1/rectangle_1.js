'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BACKGROUND_COLOR = "black";

var BallPen = function (_React$Component) {
	_inherits(BallPen, _React$Component);

	function BallPen(props) {
		_classCallCheck(this, BallPen);

		var _this = _possibleConstructorReturn(this, (BallPen.__proto__ || Object.getPrototypeOf(BallPen)).call(this, props));

		_this.state = {
			height: 0,
			width: 0,
			clickTimer: 0,
			xClick: 0,
			yClick: 0
		};
		_this.middleRectangle = null;
		_this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
		_this.handleKeydown = _this.handleKeydown.bind(_this);
		_this.handleKeyup = _this.handleKeyup.bind(_this);
		_this.handleCanvasMouseDown = _this.handleCanvasMouseDown.bind(_this);
		_this.handleCanvasMouseMove = _this.handleCanvasMouseMove.bind(_this);
		_this.handleCanvasMouseUp = _this.handleCanvasMouseUp.bind(_this);
		return _this;
	}

	_createClass(BallPen, [{
		key: 'initMiddleRectangle',
		value: function initMiddleRectangle() {
			var middleCords = getMiddleOfCanvas(this.state.width, this.state.height);
			var width = 110;
			var height = 30;
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
			this.middleRectangle = rectangle;
		} //end updateMiddleRectangle()

	}, {
		key: 'updateBackground',
		value: function updateBackground() {
			var canvas = this.canvasRef;
			var ctx = canvas.getContext('2d');
			ctx.beginPath();
			ctx.fillStyle = BACKGROUND_COLOR;
			ctx.fillRect(0, 0, this.state.width, this.state.height);
			ctx.closePath();
		}
	}, {
		key: 'handleCanvasClick',
		value: function handleCanvasClick() {
			var canvas = this.canvasRef;
			var rect = canvas.getBoundingClientRect();
			var xCanvasPos = this.state.xClick - rect.left; //X cord of user click
			var yCanvasPos = this.state.yClick - rect.top; //Y cord of user click
		} //end handleCanvasClick

	}, {
		key: 'handleCanvasMouseDown',
		value: function handleCanvasMouseDown(event) {
			/* Determine if click is long press or just a click;
   	Will call functions on mouseup and mousemove;
   */
			document.body.addEventListener('mousemove', this.handleCanvasMouseMove);
			document.body.addEventListener('mouseup', this.handleCanvasMouseUp);
			this.setState({
				clickTimer: new Date(), //Start timer
				xClick: event.xClick,
				yClick: event.yClick
			});
		} //end handleCanvasMouseDown

	}, {
		key: 'handleCanvasMouseUp',
		value: function handleCanvasMouseUp() {
			/* If elapsed time is less than half a second, user just clicked;
   	Else, user is long pressing and moving the rectangle;
   */
			document.body.removeEventListener('mousedown', this.handleCanvasMouseDown);
			document.body.removeEventListener('mouseup', this.handleCanvasMouseUp);
			document.body.removeEventListener('mousemove', this.handleCanvasMouseMove);
			var endTime = new Date(); //End time of screen click;
			var elapsedTime = endTime - this.state.clickTimer; //In Milliseconds;
			if (elapsedTime < 500) {
				//User just clicked screen
				this.handleCanvasClick();
			} else {
				var isRectangleAtFinalDestination = false;
				var canvas = this.canvasRef;
				var rect = canvas.getBoundingClientRect();
				var xMid = this.middleRectangle.xCenter;
				var yMid = this.middleRectangle.yCenter;
				var xCanvasPos = this.state.xClick - rect.left; //X cord of user click
				var yCanvasPos = this.state.yClick - rect.top; //Y cord of user click
				var safetyNet = 0;

				console.log("DRAGGING FINSIHED");
			}
		} //end handleCanvasMouseUp()

	}, {
		key: 'handleCanvasMouseMove',
		value: function handleCanvasMouseMove(event) {
			//TODO: Get movement of mouse and move rectangle accordingly;
			if (!this.middleRectangle) {
				console.log("WARNING: Rectangle not initialized yet;");
				console.log(this);
				return false;
			}

			this.setState({
				xClick: event.clientX,
				yClick: event.clientY
			});
			this.handleRectangleMove();
		}
	}, {
		key: 'handleRectangleMove',
		value: function handleRectangleMove() {
			var canvas = this.canvasRef;
			var rect = canvas.getBoundingClientRect();
			var clientX = this.state.xClick - rect.left;
			var clientY = this.state.yClick - rect.top;
			var xMid = this.middleRectangle.xCenter;
			var yMid = this.middleRectangle.yCenter;
			var rectangleLeft = this.middleRectangle.xLeft;
			var rectangleTop = this.middleRectangle.yTop;

			if (clientX < xMid) {
				//Move left
				var nextX = clientX - this.middleRectangle.width / 2;
				this.middleRectangle.updateCoordinates(nextX, rectangleTop);
			}
			if (clientX > xMid) {
				//Move right
				var _nextX = clientX - this.middleRectangle.width / 2;
				this.middleRectangle.updateCoordinates(_nextX, rectangleTop);
			}
			if (clientY < yMid) {
				//Move Up
				var nextY = clientY - this.middleRectangle.height / 2;
				this.middleRectangle.updateCoordinates(rectangleLeft, nextY);
			}
			if (clientY > yMid) {
				//Move Down
				var _nextY = clientY - this.middleRectangle.height / 2;
				this.middleRectangle.updateCoordinates(rectangleLeft, _nextY);
			}
		}
	}, {
		key: 'handleKeydown',
		value: function handleKeydown(event) {
			if (!event && !event.key) {
				console.log("WARNING: KEYBOARD INPUT NOT UNDERSTOOD");
				return false;
			}
			if (!this.middleRectangle) {
				console.log("WARNING: Rectangle not initialized yet;");
				console.log(this);
				return false;
			}
			var speed = 2;
			if (this.state.isHeldDown) {
				var currTime = new Date();
				var elapsedTime = currTime - this.state.timePressed;
				speed *= elapsedTime / 1000;
			} else {
				this.setState({
					isHeldDown: true,
					timePressed: new Date()
				});
			}
			var rectangleLeft = this.middleRectangle.xLeft;
			var rectangleTop = this.middleRectangle.yTop;
			if (event.keyCode === 37) {
				event.preventDefault();
				this.middleRectangle.updateCoordinates(rectangleLeft - speed, rectangleTop);
				console.log("moved left");
			}
			if (event.keyCode === 38) {
				event.preventDefault();
				this.middleRectangle.updateCoordinates(rectangleLeft, rectangleTop - speed);
				console.log("moved up");
			}
			if (event.keyCode === 39) {
				event.preventDefault();
				this.middleRectangle.updateCoordinates(rectangleLeft + speed, rectangleTop);
				console.log("moved right");
			}
			if (event.keyCode === 40) {
				event.preventDefault();
				this.middleRectangle.updateCoordinates(rectangleLeft, rectangleTop + speed);
				console.log("moved down");
			}
			return true;
		}
	}, {
		key: 'handleKeyup',
		value: function handleKeyup() {
			this.setState({
				isHeldDown: false,
				timePressed: null
			});
			console.log('key up');
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.updateWindowDimensions();
			this.updateCanvas();
			this.timerID = setInterval(function () {
				return _this2.updateCanvas();
			}, 525);
			window.addEventListener('resize', this.updateWindowDimensions);
			document.body.addEventListener('keydown', this.handleKeydown);
			document.body.addEventListener('keyup', this.handleKeyup);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearInterval(this.timerID);
			window.removeEventListener('resize', this.updateWindowDimensions);
			document.body.removeEventListener('keydown', this.handleKeydown);
			document.body.removeEventListener('keyup', this.handleKeyup);
			document.body.removeEventListener('mousemove', this.handleCanvasMouseMove);
			document.body.removeEventListener('mouseup', this.handleCanvasMouseUp);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.updateCanvas();
		}
	}, {
		key: 'updateWindowDimensions',
		value: function updateWindowDimensions() {
			var canvas = this.canvasRef;
			var width = window.innerWidth;
			var height = window.innerHeight;
			var ctx = canvas.getContext('2d');
			if (width && width > 575) width -= 320; //Buffer for not x-small
			else {
					width -= 120; //Buffer for x-small
					height = 500;
				}
			height -= 280; //Buffer...
			if (height < 0) height = 0;
			this.setState({
				width: width,
				height: height
			});
			this.updateBackground();
			return;
		}
	}, {
		key: 'updateCanvas',
		value: function updateCanvas() {
			var canvas = this.canvasRef;
			var ctx = canvas.getContext('2d');
			if (this.state.width !== 0) {
				this.updateBackground();
				if (!this.middleRectangle) this.initMiddleRectangle();
			} //end if state.width clarity check;

			if (this.middleRectangle) {
				this.middleRectangle.draw(ctx);
				writeToScreen(ctx, "HIRE ME", this.middleRectangle.xCenter - 50, this.middleRectangle.yCenter + 7, getRandomColor());
			}
		} //End updateCanvas()

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
					id: 'hireMeCanvas',
					ref: function ref(canvas) {
						return _this3.canvasRef = canvas;
					},
					width: this.state.width,
					height: this.state.height,
					style: penStyle,
					onMouseDown: this.handleCanvasMouseDown
				})
			);
		}
	}]);

	return BallPen;
}(React.Component);

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('rectangle-1'));