var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 375;
var canvas, ctx;
canvas = document.createElement('canvas');
ctx = canvas.getContext("2d");

function createCanvas(){
  var self = this;
  self.canvas = canvas;
	this.ctx = this.canvas.getContext('2d');
	this.width = 600;
	this.height = 275;
  canvas.width = this.width;
  canvas.height = this.height;
	ctx.fillStyle='#000';
  ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fill();
  centerText('Space Invaders',CANVAS_WIDTH/2,CANVAS_HEIGHT/2.5,'#fff',20);
  //print('space invaders')
  return canvas;
}
function print(text,x,y,color,size){
  if (typeof size !== 'undefined') ctx.font = size + "px Megrim";
  if (typeof color !== 'undefined') ctx.fillStyle = color;
  ctx.fillText(text,x,y);
}
function centerText(text, x, y, color, fs) {
   var textWidth= ctx.measureText(text);
  print(text, x - textWidth.width, y, color, fs);
}
// window.onKeyDown =
// console.log(c);

function p(x){
  console.log(x);
}
// p(createCanvas());
var x = createCanvas();

document.body.appendChild(x);
p(canvas);
// document.body.append(createCanvas());
