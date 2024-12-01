/*!
* Snow.js v1.0.0
* https://github.com/zmfe/snow.js
*
* Copyright (c) 2018 undefined
* Released under the MIT license
*
* Date: 2018-01-16T11:55:01.675Z
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Snow = factory());
}(this, (function () { 'use strict';

var _window = window;
var document = _window.document;
var DEFAULT_OPTIONS = {};
var DEFAULT_SNOWPARTICLE_OPTIONS = {
	index: 0,
	x: 0,
	y: 0,
	context: '',
	color: 'rgb(255, 255, 255)',
	r: 1
};
function DEG(deg) {
	return Math.PI * (deg / 180);
}
function SINDEG(deg) {
	if (deg > DEG(165)) {
		deg -= Math.PI / 4;
	} else if (deg < DEG(15)) {
		deg += Math.PI / 4;
	}
	return deg;
}
function COSDEG(deg) {
	if (deg > DEG(15) && deg <= DEG(90)) {
		deg -= Math.PI / 6;
	} else if (deg > DEG(90) && deg <= DEG(165)) {
		deg += Math.PI / 6;
	}
	return deg;
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var SnowParticle = function () {
	/**
  * Creates an instance of SnowParticle.
  * @param {Object} option content, x, y, color
  * @memberof Snow
  */
	function SnowParticle() {
		var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		classCallCheck(this, SnowParticle);

		this.option = Object.assign({}, DEFAULT_SNOWPARTICLE_OPTIONS, option);
		var _option = this.option,
		    content = _option.content,
		    color = _option.color,
		    x = _option.x,
		    y = _option.y,
		    r = _option.r,
		    v = _option.v;

		this.color = color.replace('rgb', 'rgba').split(')')[0] + ',' + (Math.floor(Math.random() * 50) + 50) / 100 + ')';
		this.content = content;
		this.r = r * (Math.random() * 0.4 + 0.6);
		this.x = x;
		this.y = y;
		this.v = v;
		this.angle = Math.PI * Math.random();
		// this.init();
	}
	// init() {
	// }


	createClass(SnowParticle, [{
		key: 'draw',
		value: function draw() {
			var content = this.content,
			    color = this.color,
			    x = this.x,
			    y = this.y,
			    r = this.r;

			content.beginPath();
			content.arc(Math.floor(x), Math.floor(y), r, 0, 2 * Math.PI, true);
			content.closePath();
			content.fillStyle = color;
			content.fill();
		}
	}, {
		key: 'move',
		value: function move() {
			var _option2 = this.option,
			    width = _option2.width,
			    height = _option2.height;

			this.x += this.v * Math.cos(COSDEG(this.angle)) * 0.3;
			this.y += this.v * Math.sin(SINDEG(this.angle));
			if (this.y > height || this.x > width || this.x < 0) {
				this.y = 0;
				this.x = Math.random() * width;
				this.angle = Math.PI * Math.random();
			}
		}
	}]);
	return SnowParticle;
}();

var Snow = function () {
	/**
  * Creates an instance of Snow.
  * @param {Element} element target
  * @param {Object} [option={}] options
  * @memberof Snow
  */
	function Snow(element) {
		var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		classCallCheck(this, Snow);

		this.element = document.querySelector(element);
		this.canvas = '';
		this.ctx = '';
		this.width = 0;
		this.height = 0;
		this.option = Object.assign({}, DEFAULT_OPTIONS, option);
		this.number = this.option.number;
		this.partiles = [];
		this.init();
	}

	createClass(Snow, [{
		key: 'init',
		value: function init() {
			var element = this.element;

			var width = element.clientWidth;
			var height = element.clientHeight;
			this.width = width;
			this.height = height;
			this.createCanvas();
			this.createParticle();
		}
	}, {
		key: 'createCanvas',
		value: function createCanvas() {
			var element = this.element,
			    width = this.width,
			    height = this.height;

			var canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			canvas.style.cssText = 'position:absolute;top:0;left:0;background:rgba(0,0,0,0);pointer-events:none;z-index:1;';
			element.appendChild(canvas);
			this.canvas = canvas;
			this.ctx = canvas.getContext('2d');
		}
	}, {
		key: 'createParticle',
		value: function createParticle() {
			var _option3 = this.option,
			    r = _option3.r,
			    v = _option3.v;
			var ctx = this.ctx,
			    width = this.width,
			    height = this.height,
			    number = this.number,
			    partiles = this.partiles;

			for (var i = 0; i < number; i += 1) {
				var particle = new SnowParticle({
					color: 'rgb(255,255,255)',
					content: ctx,
					y: Math.floor(Math.random() * height),
					x: Math.floor(Math.random() * width),
					r: r,
					v: v,
					width: this.width,
					height: this.height
					// angle: Math.PI,
				});
				partiles.push(particle);
				particle.draw();
			}
			function animate() {
				ctx.clearRect(0, 0, width, height);
				partiles.forEach(function (item) {
					item.move();
					item.draw();
				});
				requestAnimationFrame(animate);
			}
			animate();
		}
	}]);
	return Snow;
}();

return Snow;

})));
