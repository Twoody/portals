'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
   function Ball(properties) {
      _classCallCheck(this, Ball);

      this.canvas = properties.canvas;
      this.ballId = properties.ballID;
      this.x = properties.x;
      this.y = properties.y;
      this.radius = properties.radius;
      this.color = "blue";
      this.speed = 5;
      this.angle = 45;
      this.radians = this.angle * Math.PI / 180;
      this.dx = Math.cos(this.radians) * this.speed; //The change in our x coordinate
      this.dy = Math.sin(this.radians) * this.speed; //The change in our y coordinate
   }

   _createClass(Ball, [{
      key: 'draw',
      value: function draw() {
         var ctx = this.canvas.getContext('2d');
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, //Start angle in radians
         0 //End angle in radians
         );
         ctx.fillStyle = this.color;
         ctx.fill();
      }
   }, {
      key: 'updateBall',
      value: function updateBall(maxWidth, maxHeight) {
         this.handleWallCollisions(maxWidth, maxHeight);
         this.radians = this.angle * Math.PI / 180;
         this.dx = Math.cos(this.radians) * this.speed; //The change in our x coordinate
         this.dy = Math.sin(this.radians) * this.speed; //The change in our y coordinate
         this.x += this.dx;
         this.y += this.dy;
      }
   }, {
      key: 'handleWallCollisions',
      value: function handleWallCollisions(maxWidth, maxHeight) {
         if (this.x > maxWidth - this.radius || this.x < this.radius) {
            this.angle = 180 - this.angle; //Angle of reflection
         } else if (this.y > maxHeight - this.radius || this.y < this.radius) {
            this.angle = 360 - this.angle; //Angle of reflection
         }
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
         if (this.state.width !== 0) {
            if (this.balls.length === 0) {
               // Init first ball
               this.balls.push(new Ball({
                  canvas: canvas,
                  ballId: 0,
                  x: 41,
                  y: 41,
                  radius: 30
               }));
            } // End first ball init;
            for (var i = 0; i < this.balls.length; i++) {
               var ball = this.balls[i];
               ball.updateBall(this.state.width, this.state.height);
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

ReactDOM.render(React.createElement(BallPen, null), document.getElementById('ball-pen-8'));