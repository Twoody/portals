var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = function () {
	function Rectangle(properties) {
		_classCallCheck(this, Rectangle);

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
		this.gravity = 0;
		this.friction = 0.05;
	}

	_createClass(Rectangle, [{
		key: 'updateCoordinates',
		value: function updateCoordinates(nextX, nextY) {
			this.xLeft = nextX;
			this.yTop = nextY;
			this.xRight = this.xLeft + this.width;
			this.yBottom = this.yTop + this.height;
			this.xCenter = Math.abs(this.xRight - this.width / 2);
			this.yCenter = Math.abs(this.yBottom - this.height / 2);
		} //end updateCoordinates()

	}, {
		key: 'draw',
		value: function draw(ctx) {
			ctx.beginPath();
			ctx.rect(this.xLeft, this.yTop, this.width, this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		} //end draw()

	}, {
		key: 'handleRectangleMove',
		value: function handleRectangleMove(nextX, nextY, sWidth, sHeight) {
			//Handle rectangle movement:
			//Find out what item is out of bounds and fix accordingly;
			if (nextX < 0) nextX = 0;
			if (nextX + this.width > sWidth) nextX = sWidth - this.width;
			if (nextY < 0) nextY = 0;
			if (nextY + this.height > sHeight) nextY = sHeight - this.height;
			this.updateCoordinates(nextX, nextY);
		} //end handleRectangleMove

	}, {
		key: 'isOverLappingBall',
		value: function isOverLappingBall(ball) {
			/*Get X and Y range and see if balls coords fall in that range or not;
   	Input:
   		Ball() object
   	Output:
   		Boolean
   	@ ./src/utils.js
   */
			var bottomAreaAllowed = this.yBottom + ball.radius;
			var topAreaAllowed = this.yTop - ball.radius;
			var rightDistanceAllowed = this.xRight + ball.radius;
			var leftDistanceAllowed = this.xLeft - ball.radius;
			var yIsInRange = isInRange(ball.nextY, topAreaAllowed, bottomAreaAllowed);
			var xIsInRange = isInRange(ball.nextX, leftDistanceAllowed, rightDistanceAllowed);
			if (yIsInRange) {
				if (xIsInRange) {
					console.log('rectangle Y Range: ' + topAreaAllowed + ' - ' + bottomAreaAllowed);
					console.log('rectangle X range: ' + leftDistanceAllowed + ' - ' + rightDistanceAllowed);
					console.log('analyzed Y: ' + ball.nextY);
					console.log('analyzed X: ' + ball.nextX);
					return true;
				} else return false;
			}
			return false;
		} //end isOverLappingBall()

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

	}]);

	return Rectangle;
}(); //End Rectangle Class