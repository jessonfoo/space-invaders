var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 400;
var canvas, ctx;
canvas = document.createElement('canvas');
ctx = canvas.getContext("2d");

function createCanvas(){
  var self = this;
  self.canvas = canvas;
	this.ctx = this.canvas.getContext('2d');
	this.width = 900;
	this.height = 875;
  canvas.width = this.width;
  canvas.height = this.height;
	ctx.fillStyle='#000';
  ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fill();
  printCenteredText('space');
  return self.canvas;

}
function printCenteredText(text){
  ctx.font = "30px Arial";
  ctx.fillStyle="#fff";
  return ctx.fillText(text,CANVAS_WIDTH/2,CANVAS_HEIGHT/2);
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
