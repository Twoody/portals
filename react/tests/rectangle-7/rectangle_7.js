'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BACKGROUND_COLOR = "black";
var WALL_FRICTION = 0.075;
var RECTANGLE_WIDTH = 110;
var RECTANGLE_HEIGHT = 30;
var RECTANGLE_FRICTION = 0.075;
var MIN_RADIUS = 1;
var MAX_RADIUS = 3.00;
var MAX_SPEED = 5;
var BALL_FRICTION = 0.05;
var GRAVITY = 0.45;
var KINETIC_LOSS = 0.15;
var KINETIC_KEEP = 0.85;
var INIT_BALL_CNT = 185;

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
			yClick: 0,
			ballCnt: 0,
			hasGravity: false,
			hasWallFriction: false,
			hasBallFriction: false,
			hasInertia: false,
			isLeavingTrails: false
		};
		_this.movableRectangle = null;
		_this.balls = [];
		_this.friction = WALL_FRICTION;
		_this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
		_this.handleKeydown = _this.handleKeydown.bind(_this);
		_this.handleKeyup = _this.handleKeyup.bind(_this);
		_this.handleCanvasMouseDown = _this.handleCanvasMouseDown.bind(_this);
		_this.handleCanvasMouseMove = _this.handleCanvasMouseMove.bind(_this);
		_this.handleCanvasMouseUp = _this.handleCanvasMouseUp.bind(_this);
		_this.handleInputChange = _this.handleInputChange.bind(_this);
		_this.resetBalls = _this.resetBalls.bind(_this);
		return _this;
	}

	_createClass(BallPen, [{
		key: 'didClickBall',
		value: function didClickBall(xCanvasPos, yCanvasPos) {
			/*	Go through balls and see if clicked position is in ball or not;
   	Inpus:
   		x click position relative to canvase
   		y click position relative to canvase
   	Output:
   		If true, clicked ball;
   		Else, NULL
   	@ utils.js
   */
			for (var i = 0; i < this.balls.length; i++) {
				var ball = this.balls[i];
				var isClicked = isOverLapping(xCanvasPos, yCanvasPos, ball.xCord, ball.yCord, ball.radius);
				if (isClicked) return ball;
			} //end i-for
			return null;
		} //end didClickBall()

	}, {
		key: 'drawBackground',
		value: function drawBackground() {
			if (this.state.width === 0) return false;
			if (this.state.isLeavingTrails) return false;
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
			var clickedBall = this.didClickBall(xCanvasPos, yCanvasPos);
			if (clickedBall !== null) {
				return clickedBall.handleClick();;
			}
			//No ball was clicked; Is user trying to make a new ball?
			var newBall = makeRandomBall(this.state.width, this.state.height, this.balls.length, MIN_RADIUS, MAX_RADIUS, MAX_SPEED);
			newBall.xCord = xCanvasPos;
			newBall.yCord = yCanvasPos;
			newBall.nextX = xCanvasPos;
			newBall.nextY = yCanvasPos;
			var isLegal = isLegalBall(newBall, this.state.width, this.state.height, this.balls, [this.movableRectangle]);
			if (isLegal === true) {
				this.setNewBallDirection(newBall);
				console.log('making new ball' + newBall.ballID);
				this.balls.push(newBall);
				this.setState({ ballCnt: this.state.ballCnt + 1 });
				return true;
			}
			return false;
		} //end handleCanvasClick

	}, {
		key: 'handleInputChange',
		value: function handleInputChange(event) {
			var target = event.target;
			var value = target.type === 'checkbox' ? target.checked : target.value;
			var name = target.name;
			this.setState(_defineProperty({}, name, value));
		} //end handleInputChange()

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
				this.setState({
					clickTimer: new Date(), //Start timer
					xClick: Math.round(event.changedTouches[0].clientX),
					yClick: Math.round(event.changedTouches[0].clientY)
				});
			} else if (event) {
				hireMeCanvas.addEventListener('mousemove', this.handleCanvasMouseMove);
				hireMeCanvas.addEventListener('mouseup', this.handleCanvasMouseUp);
				this.setState({
					clickTimer: new Date() //Start timer
				});
			} else {
				console.log('input not understood');
			}
		} //end handleCanvasMouseDown

	}, {
		key: 'handleCanvasMouseUp',
		value: function handleCanvasMouseUp(event) {
			/* If elapsed time is less than half a second, user just clicked;
   	Else, user is long pressing and moving the rectangle;
   */
			hireMeCanvas.removeEventListener('mousedown', this.handleCanvasMouseDown);
			hireMeCanvas.removeEventListener('mouseup', this.handleCanvasMouseUp);
			hireMeCanvas.removeEventListener('mousemove', this.handleCanvasMouseMove);
			var endTime = new Date(); //End time of screen click;
			var elapsedTime = endTime - this.state.clickTimer; //In Milliseconds;
			if (elapsedTime < 250) {
				//User just clicked screen
				this.setState({
					xClick: event.clientX,
					yClick: event.clientY
				});
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
			//Make clickTimer unassigned;
			this.setState({
				clickTimer: null //Start timer
			});
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
			var isLegalDrag = this.handleRectangleDrag();
			if (isLegalDrag) this.updateRectangle();
		} //end handleCanvasMouseMove()

	}, {
		key: 'handleRectangleDrag',
		value: function handleRectangleDrag() {
			var canvas = this.canvasRef;
			var rect = canvas.getBoundingClientRect();
			var clientX = this.state.xClick - rect.left;
			var clientY = this.state.yClick - rect.top;
			var isDragging = this.movableRectangle.processDrag(clientX, clientY, this.balls);
			if (!isDragging) return false;
			this.movableRectangle.handleMove(this.state.width, this.state.height, this.balls);
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
			this.movableRectangle.resetMovement();

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
				this.movableRectangle.isGoingLeft = true;
			}
			if (event.keyCode === 38) {
				event.preventDefault();
				nextY -= speed;
				this.movableRectangle.isGoingUp = true;
			}
			if (event.keyCode === 39) {
				event.preventDefault();
				nextX += speed;
				this.movableRectangle.isGoingRight = true;
			}
			if (event.keyCode === 40) {
				event.preventDefault();
				nextY += speed;
				this.movableRectangle.isGoingDown = true;
			}

			var isMovable = this.movableRectangle.isLegalMovement(nextX, nextY, this.balls);
			if (isMovable === false) {
				this.movableRectangle.nextX = this.movableRectangle.xLeft;
				this.movableRectangle.nextY = this.movableRectangle.yTop;
				this.movableRectangle.resetMovement();
				return false;
			} else {
				this.movableRectangle.nextX = nextX;
				this.movableRectangle.nextY = nextY;
				this.movableRectangle.handleMove(this.state.width, this.state.height, this.balls);
				this.updateRectangle();
			}
			return true;
		} //end handleKeydown()

	}, {
		key: 'handleKeyup',
		value: function handleKeyup() {
			this.setState({
				isHeldDown: false,
				timePressed: null
			});
			console.log('key up');
		} //end handleKeyup()

	}, {
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
		key: 'initBalls',
		value: function initBalls() {

			var brandBalls = initClickables(this.state.width, this.state.height, 30, 30, MAX_SPEED, [this.movableRectangle]);
			for (var i = 0; i < brandBalls.length; i++) {
				this.balls.push(brandBalls[i]);
				this.setState({ ballCnt: this.state.ballCnt + 1 });
			} //end i-for
			for (var _i = this.state.ballCnt; _i < INIT_BALL_CNT; _i++) {
				var cnt = 0;
				var isLegal = false;
				var newBall = null;
				while (isLegal === false) {
					newBall = makeRandomBall(this.state.width, this.state.height, this.balls.length, MIN_RADIUS, MAX_RADIUS, MAX_SPEED);
					isLegal = isLegalBall(newBall, this.state.width, this.state.height, this.balls, [this.movableRectangle]);
					console.log('new ball attempt: ' + cnt);
					if (cnt === 500) {
						console.log('FAILED MAKING A WORKABLE BALL');
						break;
					}
					cnt += 1;
				} //end while
				if (newBall && cnt !== 500) {
					this.setNewBallDirection(newBall);
					this.balls.push(newBall);
					this.setState({ ballCnt: this.state.ballCnt + 1 });
				}
			} //end i-for
			return true;
		} //end initBalls()

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.updateWindowDimensions();
			this.drawBackground();
			this.initMiddleRectangle;
			this.rectangleTimerID = setInterval(function () {
				return _this2.updateRectangle();
			}, 25);
			this.ballTimerID = setInterval(function () {
				return _this2.updateBalls();
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
			hireMeCanvas.removeEventListener('mousemove', this.handleCanvasMouseMove);
			hireMeCanvas.removeEventListener('mouseup', this.handleCanvasMouseUp);
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

			this.drawBackground(); //Update/draw Background
			if (this.movableRectangle) {
				//Following hack to see if current coordinates are 
				//	colliding with wall or not;
				this.movableRectangle.handleMove(this.state.width, this.state.height, []);
				this.updateRectangle(); //Update/draw Rectangle
			}
			if (this.balls) {
				for (var i = 0; i < this.balls.length; i++) {
					this.balls[i].handleWindowResize(this.state.width, this.state.height, this.balls);
				} //end i-for
				this.updateBalls(); //Update/draw Balls;
			}
			return;
		} //end updateWindowDimenstions()

	}, {
		key: 'updateBalls',
		value: function updateBalls() {
			if (this.state.width === 0) return false;
			if (!this.movableRectangle) return false;
			if (this.balls.length === 0 && INIT_BALL_CNT !== 0) this.initBalls();
			var canvas = this.canvasRef;
			var ctx = canvas.getContext('2d');

			for (var i = 0; i < this.balls.length; i++) {
				var ball = this.balls[i];
				if (this.state.hasGravity === false) ball.gravity = 0;else ball.gravity = GRAVITY;
				if (this.state.hasInertia === false) {
					ball.kineticLoss = 0;
					ball.kineticGain = 1;
				} else {
					ball.kineticLoss = KINETIC_LOSS;
					ball.kineticGain = KINETIC_KEEP;
				}
				if (this.state.hasBallFriction === false) ball.friction = 0;else ball.friction = BALL_FRICTION;
				if (this.state.hasWallFriction === false) this.friction = 0;else this.friction = WALL_FRICTION;

				ball.move(this.state.width, this.state.height, this.friction, [this.movableRectangle], this.balls);
			} //end i-for

			//Update other objects 
			this.drawBackground(); //Redraw Background
			this.drawBalls(ctx);
			this.drawRectangle(ctx); //Update rectangle;
			return true;
		} //end updateBalls()

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
		key: 'drawBalls',
		value: function drawBalls(ctx) {
			for (var i = 0; i < this.balls.length; i++) {
				var ball = this.balls[i];
				ball.draw(ctx);
				ball.label(ctx);
			} //end i-for
		} //end drawBalls()

	}, {
		key: 'drawRectangle',
		value: function drawRectangle(ctx) {
			this.movableRectangle.draw(ctx);
			writeToScreen(ctx, "HIRE ME", this.movableRectangle.xCenter - 50, this.movableRectangle.yCenter + 7, getRandomColor());
		}
	}, {
		key: 'setNewBallDirection',
		value: function setNewBallDirection(ball) {
			var modGroup = this.balls.length % 4;
			if (modGroup === 0) {
				ball.isGoingDown = true;
				ball.isGoingUp = false;
				ball.isGoingRight = true;
				ball.isGoingLeft = false;
			} else if (modGroup === 1) {
				ball.isGoingDown = true;
				ball.isGoingUp = false;
				ball.isGoingRight = false;
				ball.isGoingLeft = true;
			} else if (modGroup === 2) {
				ball.isGoingDown = false;
				ball.isGoingUp = true;
				ball.isGoingRight = false;
				ball.isGoingLeft = true;
			} else if (modGroup === 3) {
				ball.isGoingDown = false;
				ball.isGoingUp = true;
				ball.isGoingRight = true;
				ball.isGoingLeft = false;
			}
		}
	}, {
		key: 'resetBalls',
		value: function resetBalls(event) {
			INIT_BALL_CNT = 0;
			this.balls = [];
			this.setState({ ballCnt: 0 });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var penStyle = {
				fontWeight: 400,
				border: "1px solid #000000",
				touchAction: "none"
			};
			var ballCntStyle = {
				textAlign: "right"
			};
			return React.createElement(
				'div',
				null,
				React.createElement(
					'p',
					{ style: ballCntStyle },
					'Ball Count: ',
					this.state.ballCnt
				),
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
				}),
				React.createElement(
					'table',
					{ width: this.state.width },
					React.createElement(
						'tbody',
						null,
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								React.createElement(
									'label',
									null,
									'Has Gravity:\xA0\xA0',
									React.createElement('input', {
										name: 'hasGravity',
										type: 'checkbox',
										checked: this.state.hasGravity,
										onChange: this.handleInputChange })
								)
							),
							React.createElement(
								'td',
								null,
								React.createElement(
									'label',
									null,
									'Has Wall Friction:\xA0\xA0',
									React.createElement('input', {
										name: 'hasWallFriction',
										type: 'checkbox',
										checked: this.state.hasWallFriction,
										onChange: this.handleInputChange })
								)
							),
							React.createElement(
								'td',
								null,
								React.createElement(
									'label',
									null,
									'Has Ball Friction:\xA0\xA0',
									React.createElement('input', {
										name: 'hasBallFriction',
										type: 'checkbox',
										checked: this.state.hasBallFriction,
										onChange: this.handleInputChange })
								)
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								React.createElement(
									'label',
									null,
									'Has Kinetic Transfer:\xA0\xA0',
									React.createElement('input', {
										name: 'hasInertia',
										type: 'checkbox',
										checked: this.state.hasInertia,
										onChange: this.handleInputChange })
								)
							),
							React.createElement(
								'td',
								null,
								React.createElement(
									'label',
									null,
									'Leave Trails:\xA0\xA0',
									React.createElement('input', {
										name: 'isLeavingTrails',
										type: 'checkbox',
										checked: this.state.isLeavingTrails,
										onChange: this.handleInputChange })
								)
							),
							React.createElement(
								'td',
								null,
								React.createElement(
									'button',
									{ onClick: this.resetBalls },
									'Reset Balls'
								)
							)
						),
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								React.createElement(
									'button',
									{ onClick: function onClick(e) {
											shrinkBalls(_this3.balls);
										} },
									'Shrink Some Balls'
								)
							),
							React.createElement(
								'td',
								null,
								React.createElement(
									'button',
									{ onClick: function onClick(e) {
											accelerateBalls(_this3.balls);
										} },
									'Accelerate Balls'
								)
							),
							React.createElement(
								'td',
								null,
								React.createElement(
									'button',
									{ onClick: function onClick(e) {
											decelerateBalls(_this3.balls);
										} },
									'Decelerate Balls'
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

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('rectangle-7'));