var dev = true;
function gameCanvas() {
	this.fps = 30;
	this.canvas = document.getElementById('space-invaders');
	this.width = 600;
	this.height= 375;
	this.minStarSpeed= 15;
	this.maxStarSpeed= 30;
	this.bgStars = 10;
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
gameCanvas.prototype.start = function() {
	var self = this;
	//	Start the timer.
	this.intervalId = setInterval(function() {
    console.log('redraw');
		self.update();
		self.draw();	
	}, 1000 / this.fps);
};

gameCanvas.prototype.stop = function() {
  console.log('stop');
	clearInterval(this.intervalId);
};

gameCanvas.prototype.update = function() {
  console.log('update');
};

if(dev == true){
  var test = new gameCanvas();
  test.canvas.addEventListener('mouseover',function(e){
    e.preventDefault();
    test.start();
  });
  test.canvas.addEventListener('mouseleave',function(e){
    e.preventDefault();
    test.stop();
  });

}
