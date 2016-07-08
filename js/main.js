var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 375;
var SHIP= new Image();
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var SHOOT_KEY = 32;
var canvas, ctx, ship, shipSrc, shipX, shipY,invaderSrc,invaders,invaderImg,shipImg;
shipY=300;
shipX=300;
var initCanvas = function() {
  canvas = document.getElementById('gameCanvas');
  canvas.width = 640;
  canvas.height= 375;
  ctx = canvas.getContext('2d');
  ctx.fillStyle='#000';
  draw(CANVAS_WIDTH,CANVAS_HEIGHT,drawBG);
  shipImg= new Image();
  shipImg.src = 'img/ship.png';
  invaderImg=new Image();
  invaderImg.src = 'img/invader.gif';
  setImages();
  window.onkeydown=function(e){
    switch(e.keyCode){
      case 37: // left

      break;
      case 39: // left
      break;

    }
  }
}
var setImages = function() {
  var self = this;
  canvas = draw(2, 2, function(ctx) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
    bulletImg = new Image();
    bulletImg.src = canvas.toDataURL();
}
var drawBG = function (ctx){
  var self = this;
  this.canvas = canvas;
	ctx = this.canvas.getContext('2d');
	this.width = 600;
	this.height = 275;
  canvas.width = this.width;
  canvas.height = this.height;
	ctx.fillStyle='#000';
  ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fill();
  centerText('Space Invaders',CANVAS_WIDTH/2,CANVAS_HEIGHT/2.5,'#fff',28);
  //print('space invaders')
  return canvas;
}
// function for drawing things on canvas
var draw = function (width, height, draw) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  draw(ctx);
  return canvas;
}
var print = function (text,x,y,color,size){
  // console.log(ctx.font);
  if (typeof color !== 'undefined') ctx.fillStyle = color;
  ctx.font = size + "px Megrim";
  ctx.fillText(text,x,y);
}
var centerText = function (text, x, y, color, fs) {
   var textWidth= ctx.measureText(text);
  print(text, x - textWidth.width, y, color, fs);
}
// window.onKeyDown =
// console.log(c);

function p(x){
  console.log(x);
}
$(document).ready(function(){
// ctx = canvas.getContext("2d");
// p(createCanvas());
window.onkeydown=function(e){
  switch(e.keyCode){
    case 37: // left
    break;
    case 39: // left
    break;
  }
}
  initCanvas();
  setImages();
// window.onload=function(){
//   // var x = createCanvas();
//   initCanvas();
//   setImages();
//   // document.body.appendChild(x);
// // }
// // document.body.append(createCanvas());
//
// }
})
