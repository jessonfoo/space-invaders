function gameCanvas() {
	this.fps = 30;
	this.canvas = document.getElementById('space-invaders');
	this.width = 600;
	this.height= 375;
	this.intervalId = 0;
}


gameCanvas.prototype.initialise = function(div) {
	var self = this;

	//	Store the div.
	this.containerDiv = div;
	self.width = window.innerWidth;
	self.height = window.innerHeight;

	window.onresize = function(event) {
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.height;
		self.draw();
 	}

	//	Create the canvas.
	var canvas = document.createElement('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
};
gameCanvas.prototype.draw = function() {
	var ctx = this.canvas.getContext("2d");
	//	Draw the background.
 	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, this.width, this.height);
};
var test = new gameCanvas();

