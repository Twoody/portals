'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BACKGROUND_COLOR = "black";
var RECTANGLE_WIDTH = 110;
var RECTANGLE_HEIGHT = 30;
var WALL_FRICTION = 0.075;

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
		_this.movableRectangle = null;
		_this.ball = null;
		_this.friction = WALL_FRICTION;
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
			//Initialize a middle rectangle;
			//Rectangle is going to have draggable properties;
			var middleCords = getMiddleOfCanvas(this.state.width, this.state.height);
			var width = RECTANGLE_WIDTH;
			var height = RECTANGLE_HEIGHT;
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
			this.movableRectangle = rectangle;
		} //end updateMiddleRectangle()

	}, {
		key: 'initBall',
		value: function initBall() {
			if (!this.ball) {
				var newBall = makeRandomBall(this.state.width, this.state.height, 0, 30, 30, 30);
				var cnt = 1;
				while (this.isLegalBall(newBall) === false) {
					cnt += 1;
					newBall = makeRandomBall(this.state.width, this.state.height, 0, 30, 30, 30);
					console.log('new ball attempt: ' + cnt);
					if (cnt > 500) {
						console.log('FAILED MAKING A WORKABLE BALL');
						break;
					}
				} //end while
				newBall.maxSpeed = newBall.radius / 2;
				this.ball = newBall;
			}
		} //end initBall()

	}, {
		key: 'isLegalBall',
		value: function isLegalBall(ball) {
			/*Ball is legal if it: 
   	1. is in bounds <-- Checked in makeRandomBall()
   	2. is not overlapping the rectangle
   */
			if (this.movableRectangle.isOverLappingBall(ball)) return false;
			return true;
		} //end isLegalBall()

	}, {
		key: 'drawBackground',
		value: function drawBackground() {
			if (this.state.width === 0) return false;
			var canvas = this.canvasRef;
			var ctx = canvas.getContext('2d');
			ctx.beginPath();
			ctx.fillStyle = BACKGROUND_COLOR;
			ctx.fillRect(0, 0, this.state.width, this.state.height);
			ctx.closePath();
			return true;
		} //end drawBackground();

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
			if (event.changedTouches && event.changedTouches.length) {
				//Touch event: Mobile + touch screen laptops;
				hireMeCanvas.addEventListener('touchmove', function (ev) {
					ev.preventDefault();
					ev.stopImmediatePropagation;
				}, { passive: false });
				hireMeCanvas.addEventListener('touchmove', this.handleCanvasMouseMove);
				hireMeCanvas.addEventListener('touchend', this.handleCanvasMouseUp);
				//event.preventDefault();
				this.setState({
					clickTimer: new Date(), //Start timer
					xClick: Math.round(event.changedTouches[0].clientX),
					yClick: Math.round(event.changedTouches[0].clientY)
				});
			} else {
				document.body.addEventListener('mousemove', this.handleCanvasMouseMove);
				document.body.addEventListener('mouseup', this.handleCanvasMouseUp);
				this.setState({
					clickTimer: new Date(), //Start timer
					xClick: event.xClick,
					yClick: event.yClick
				});
			}
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
				var xMid = this.movableRectangle.xCenter;
				var yMid = this.movableRectangle.yCenter;
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
			if (!this.movableRectangle) {
				console.log("WARNING: Rectangle not initialized yet;");
				return false;
			}
			if (event.changedTouches && event.changedTouches.length) {
				//event.preventDefault();
				this.setState({
					xClick: Math.round(event.changedTouches[0].clientX),
					yClick: Math.round(event.changedTouches[0].clientY)
				});
			} else {
				this.setState({
					xClick: event.clientX,
					yClick: event.clientY
				});
			}
			if (this.handleRectangleDrag()) this.updateRectangle();
		} //end handleCanvasMouseMove()

	}, {
		key: 'handleRectangleDrag',
		value: function handleRectangleDrag() {
			var canvas = this.canvasRef;
			var rect = canvas.getBoundingClientRect();
			var clientX = this.state.xClick - rect.left;
			var clientY = this.state.yClick - rect.top;
			var isDragging = this.movableRectangle.processDrag(clientX, clientY, [this.ball]);
			if (!isDragging) return false;
			this.movableRectangle.handleMove(this.state.width, this.state.height, [this.ball]);
			return true;
		} //end handleRectangleDrag();

	}, {
		key: 'handleKeydown',
		value: function handleKeydown(event) {
			if (!event && !event.key) {
				console.log("WARNING: KEYBOARD INPUT NOT UNDERSTOOD");
				return false;
			}
			if (!this.movableRectangle) {
				console.log("WARNING: Rectangle not initialized yet;");
				return false;
			}
			var goodCodes = [37, 38, 39, 40];
			var speed = 2;
			var nextX = this.movableRectangle.xLeft;
			var nextY = this.movableRectangle.yTop;

			if (!goodCodes.includes(event.keyCode)) return false;

			//Figure out speed
			if (this.state.isHeldDown) {
				var currTime = new Date();
				var elapsedTime = currTime - this.state.timePressed;
				speed += elapsedTime / 100;
				if (speed > this.movableRectangle.width) speed = this.movableRectangle.width / 2 - 0.01; //Buffer
			} else {
				this.setState({
					isHeldDown: true,
					timePressed: new Date()
				});
			}
			if (event.keyCode === 37) {
				event.preventDefault();
				nextX -= speed;
				console.log("moved left");
			}
			if (event.keyCode === 38) {
				event.preventDefault();
				nextY -= speed;
				console.log("moved up");
			}
			if (event.keyCode === 39) {
				event.preventDefault();
				nextX += speed;
				console.log("moved right");
			}
			if (event.keyCode === 40) {
				event.preventDefault();
				nextY += speed;
				console.log("moved down");
			}

			this.movableRectangle.nextX = nextX;
			this.movableRectangle.nextY = nextY;
			this.movableRectangle.handleMove(this.state.width, this.state.height, [this.ball]);
			this.updateRectangle();
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
			this.drawBackground();
			this.initMiddleRectangle;
			this.rectangleTimerID = setInterval(function () {
				return _this2.updateRectangle();
			}, 225);
			this.ballTimerID = setInterval(function () {
				return _this2.updateBall();
			}, 25);
			window.addEventListener('resize', this.updateWindowDimensions);
			document.body.addEventListener('keydown', this.handleKeydown);
			document.body.addEventListener('keyup', this.handleKeyup);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearInterval(this.rectangleTimerID);
			clearInterval(this.ballTimerID);
			window.removeEventListener('resize', this.updateWindowDimensions);
			document.body.removeEventListener('keydown', this.handleKeydown);
			document.body.removeEventListener('keyup', this.handleKeyup);
			document.body.removeEventListener('mousemove', this.handleCanvasMouseMove);
			document.body.removeEventListener('mouseup', this.handleCanvasMouseUp);
			hireMeCanvas.removeEventListener('touchstart', this.handleCanvasMouseDown);
			hireMeCanvas.removeEventListener('touchmove', this.handleCanvasMouseMove);
			hireMeCanvas.removeEventListener('touchend', this.handleCanvasMouseUp);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			//Going to handle updates as we go to enhance efficiency;
		}
	}, {
		key: 'updateWindowDimensions',
		value: function updateWindowDimensions() {
			var width = window.innerWidth;
			var height = window.innerHeight;
			if (width && width > 575) width -= 320; //Buffer for not x-small
			else {
					width -= 120; //Buffer for x-small
					height = 500;
				}
			height -= 280; //Buffer...
			if (height < 0) height = 0;
			if (width < 0) width = 0;
			this.setState({
				width: width,
				height: height
			});

			this.drawBackground();
			if (this.movableRectangle) {
				//Following hack to see if current coordinates are 
				//	colliding with wall or not;
				this.movableRectangle.handleMove(this.state.width, this.state.height, []);
				this.updateRectangle();
			}
			if (this.ball) {
				this.ball.handleWindowResize(this.state.width, this.state.height, []);
			}
			//Update objects on screen;
			return;
		} //end updateWindowDimenstions()

	}, {
		key: 'updateBall',
		value: function updateBall() {
			if (this.state.width === 0) return false;
			if (!this.movableRectangle) return false;
			if (!this.ball) this.initBall();
			var canvas = this.canvasRef;
			var ctx = canvas.getContext('2d');

			this.ball.move(this.state.width, this.state.height, this.friction, [this.movableRectangle], [] //other balls
			);
			//Update other objects 
			this.drawBackground(); //Redraw Background
			this.drawBall(ctx);
			this.drawRectangle(ctx); //Update rectangle;

			return true;
		}
	}, {
		key: 'updateRectangle',
		value: function updateRectangle() {
			if (this.state.width === 0) return;
			if (!this.movableRectangle) this.initMiddleRectangle();

			var canvas = this.canvasRef;
			var ctx = canvas.getContext('2d');
			this.drawRectangle(ctx);
		} //End updateRectangle()

	}, {
		key: 'drawBall',
		value: function drawBall(ctx) {
			this.ball.draw(ctx);
			this.ball.label(ctx);
		}
	}, {
		key: 'drawRectangle',
		value: function drawRectangle(ctx) {
			this.movableRectangle.draw(ctx);
			writeToScreen(ctx, "HIRE ME", this.movableRectangle.xCenter - 50, this.movableRectangle.yCenter + 7, getRandomColor());
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var penStyle = {
				border: "1px solid #000000",
				touchAction: "none"
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
					onMouseDown: this.handleCanvasMouseDown,
					onTouchStart: this.handleCanvasMouseDown
				})
			);
		}
	}]);

	return BallPen;
}(React.Component);

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('rectangle-5'));