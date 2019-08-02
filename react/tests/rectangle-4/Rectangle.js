var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = function () {
	function Rectangle(properties) {
		_classCallCheck(this, Rectangle);

		this.type = 'rectangle';
		this.rectID = properties.rectID;
		this.color = properties.color;
		this.width = properties.width;
		this.height = properties.height;
		this.xLeft = properties.xLeft;
		this.yTop = properties.yTop;
		this.xRight = this.xLeft + this.width;
		this.yBottom = this.yTop + this.height;
		this.xCenter = Math.abs(this.xRight - this.width / 2);
		this.yCenter = Math.abs(this.yBottom - this.height / 2);
		this.nextX = this.xLeft;
		this.nextY = this.yTop;
		this.gravity = 0;
		this.friction = 0.05;
	}

	_createClass(Rectangle, [{
		key: 'draw',
		value: function draw(ctx) {
			ctx.beginPath();
			ctx.rect(this.xLeft, this.yTop, this.width, this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		} //end draw()

	}, {
		key: 'handleMove',
		value: function handleMove(sWidth, sHeight) {
			var entities = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

			//Handle rectangle movement:

			this.handleWallInteractions(sWidth, sHeight);
			this.handleEntityInteractions(sWidth, sHeight, entities);
			this.updateCoordinates();
		} //end handleMove

	}, {
		key: 'handleBallInteractions',
		value: function handleBallInteractions(sWidth, sHeight, entity) {
			/*	Find out what way rectangle is moving;
   	If we encounter a ball, move that ball IFF that ball can move in the other direction;
   */
			console.log('rectangle interacting with ball');
		}
	}, {
		key: 'handleEntityInteractions',
		value: function handleEntityInteractions(sWidth, sHeight) {
			var entities = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

			for (var i = 0; i < entities.length; i++) {
				var entity = entities[i];
				if (entity.type === 'rectangle') this.handleRectangleInteractions(sWidth, sHeight, entity);else if (entity.type === 'ball') this.handleBallInteractions(sWidth, sHeight, entity);else {
					//type not found
				}
			} //end i-for
		}
	}, {
		key: 'handleRectangleInteractions',
		value: function handleRectangleInteractions(sWidth, sHeight, entity) {
			//Encountered other rectangle; Can we move that rectangle, too?
		}
	}, {
		key: 'handleWallInteractions',
		value: function handleWallInteractions(sWidth, sHeight) {
			//Find out what item is out of bounds and fix accordingly;
			if (this.nextX < 0) this.nextX = 0;
			if (this.nextX + this.width > sWidth) this.nextX = sWidth - this.width;
			if (this.nextY < 0) this.nextY = 0;
			if (this.nextY + this.height > sHeight) this.nextY = sHeight - this.height;
			return true;
		}
	}, {
		key: 'isOverLappingBall',
		value: function isOverLappingBall(ball) {
			/* Is rectangle intersecting/overlapping ball;
   	Input:
   		Ball() object
   	Output:
   		Boolean
   */
			var ballDistanceX = Math.abs(ball.xCord - this.xCenter);
			var ballDistanceY = Math.abs(ball.yCord - this.yCenter);
			if (ballDistanceX > this.width / 2 + ball.radius) return false;
			if (ballDistanceY > this.height / 2 + ball.radius) return false;
			if (ballDistanceX <= this.width / 2) return true;
			if (ballDistanceY <= this.height / 2) return true;

			//Corners
			var areCornersTouching = isOverLapping(ballDistanceX, ballDistanceY, this.width / 2, this.height / 2, ball.radius);
			if (areCornersTouching) return true;
			return false;
		}
	}, {
		key: 'isInBounds',
		value: function isInBounds(width, height) {
			//Determine if rectangle fits the screen width and screen height;
			if (this.xLeft < 0) return false;
			if (this.xRight > width) return false;
			if (this.yTop < 0) return false;
			if (this.yBottom > height) return false;
			return true;
		} //end isInBounds();

	}, {
		key: 'updateCoordinates',
		value: function updateCoordinates() {
			this.xLeft = this.nextX;
			this.yTop = this.nextY;
			this.xRight = this.xLeft + this.width;
			this.yBottom = this.yTop + this.height;
			this.xCenter = Math.abs(this.xRight - this.width / 2);
			this.yCenter = Math.abs(this.yBottom - this.height / 2);
			this.nextX = this.xLeft;
			this.nextY = this.yTop;
		} //end updateCoordinates()

	}]);

	return Rectangle;
}(); //End Rectangle Class