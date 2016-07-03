var dev = true;
function gameCanvas() {
	this.fps = 30;
	this.canvas = document.getElementById('space-invaders');
	this.width = 660;
	this.height= 375;
	this.intervalId = 0;
  this.shipX = 300;
  this.shipY = 280;
}
var sI= document.createElement('img');
sI.src='http://cdn.wikimg.net/strategywiki/images/7/7a/Gorf_ship.png';

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
  ctx.drawImage(sI,this.shipY,this.shipX);
};
gameCanvas.prototype.start = function() {
	var self = this;
	//	Start the timer.
	this.intervalId = setInterval(function() {
    // console.log('redraw');
    // console.log(self.shipX);
		self.update();
		self.draw();	
	}, 1000 / this.fps);
};

gameCanvas.prototype.stop = function() {
  // console.log('stop');
	clearInterval(this.intervalId);
};

gameCanvas.prototype.update = function() {
    // console.log('update');
  var self = this;
  window.onkeyup = function(e) {
     var key = e.keyCode ? e.keyCode : e.which;
     if (key == 37 && self.shipY > 60) {
       self.shipY -= 60;
       console.log(e,self.shipY);
     }else if (key == 39 && self.shipY < 500) {
       self.shipY += 60;
       // console.log(e);
       console.log(e,self.shipY);
     }
  }
};

if(dev == true){
  var test = new gameCanvas();
    test.start();
  test.canvas.addEventListener('mouseover',function(e){
    // e.preventDefault();
    console.log(e);
    test.start();
  });
  test.canvas.addEventListener('mouseleave',function(e){
    e.preventDefault();
    test.stop();
  });

}
