var Game = function(id){
  var canvas = document.getElementById(id);
  var ctx = canvas.getContext('2d');
  var canvasDimensions = {x: canvas.width, y: canvas.height};

  this.hitBox = createInvaders(this).concat([new Player(this, canvasDimensions)]);

  var self = this;
  var tick = function(){
    self.update();
    self.draw(ctx, canvasDimensions);
    requestAnimationFrame(tick);
  };
  tick();
};
