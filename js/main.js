var Game = function(id) {
  var canvas = document.getElementById(id);
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#e0e0e0';
  var canvasDimensions = {
    x: canvas.width,
    y: canvas.height
  };

  this.hitBox = createInvaders(this).concat([new Player(this, canvasDimensions)]);

// pointer
  var self = this;
  // the looping update fucntion
  var repeat = function() {
    // update values
    self.update();
    // redraw canvas
    // ctx.fillStyle="#fff";
    // ctx.fillRect(0,0,600,375);
    self.draw(ctx, canvasDimensions);
    // pass repeat as the callback
    requestAnimationFrame(repeat);
  };
  // invoke repeat
  repeat();
};




// Loop for creating "invaders"
// var createInvaders = function(game) {
//   var invaders = [];
//   for (var i = 0; i < 64; i++) {
//     var x = 30 + (i % 8) * 30;
//     var y = 30 + (i % 3) * 30;
//     invaders.push(new Invader(game, {
//       x: x,
//       y: y
//     }));
//   }
//   return invaders;
// };

Game.prototype = {
  update: function() {
    var hitBox = this.hitBox;
    // console.log(hitBox);
    var notCollidingWithAnything = function(b1) {
      return hitBox.filter(function(b2) {
        return colliding(b1, b2) &&
          (b1 instanceof Bullet && b2 instanceof Bullet) === false;
      }).length === 0;
    };
    // console.log(this.hitBox);
    this.hitBox = this.hitBox.filter(notCollidingWithAnything);

    for (var i = 0, length = this.hitBox.length; i < length; i++) {
      this.hitBox[i].update();
    }
  },

  draw: function(ctx, canvasDimensions) {
    ctx.clearRect(0, 0, canvasDimensions.x, canvasDimensions.y);
    for (var i = 0, length = this.hitBox.length; i < length; i++) {
      drawRect(ctx, this.hitBox[i]);
    }
  },

  addBody: function(body) {
    this.hitBox.push(body);
    // console.log(this);
  },

  invadersBelow: function(invader) {
    return this.hitBox.filter(function(b) {
      // if Invader has constructor then do...
      return b instanceof Invader &&
    // console.log(instanceof Invader);
        b.center.y > invader.center.y &&
        b.center.x - invader.center.x < invader.size.x;
    }).length > 0;
  },

  isGameOver: function() {
    return this.hitBox.filter(function(b) {
      return (b instanceof Player);
    }).length == 0;
    cancelAnimationFrame(repeat);
  },

  invadersNumber: function() {
    return this.hitBox.filter(function(b) {
      return (b instanceof Invader);
    }).length;
  }
};

var Player = function(game, canvasDimensions) {
  this.game = game;
  this.size = {
    x: 15,
    y: 15
  };
  this.center = {
    x: canvasDimensions.x / 2,
    y: canvasDimensions.y - 30
  };
  this.keyPress = new keyPress();
    // console.log(this.keyPress);
};

Player.prototype = {

  update: function() {
    if (this.keyPress.isDown(this.keyPress.KEYS.LEFT)) {
      this.center.x -= 2;
    } else if (this.keyPress.isDown(this.keyPress.KEYS.RIGHT)) {
      this.center.x += 2;
    }
    if (firstShoot == false) { var canShoot = canPlayerShoot(); }

    if (this.keyPress.isDown(this.keyPress.KEYS.SPACE)) {
      if (firstShoot) {
        this.shoot();
        firstShoot = false;
      }
      if (canShoot) {
        this.shoot();
        count = 0;
      }
    }
  },

  shoot: function() {
    var bullet = new Bullet({
      x: this.center.x,
      y: this.center.y - this.size.y / 2 - 2
    }, /* - 2 for colliding */ {
      x: 0,
      y: -6
    });
    this.game.addBody(bullet);
  }
};
// bullet constructor
var Bullet = function(center, velocity) {
  this.size = {
    x: 2,
    y: 2
  };
  this.center = center;
  this.velocity = velocity;
};
// update function for bullet
Bullet.prototype = {
  update: function() {
    this.center.x += this.velocity.x;
    this.center.y += this.velocity.y;
  }
};
// the invader constructor
var Invader = function(game, center) {
  this.game = game;
  this.size = {
    x: 4,
    y: 4
  };
  this.center = center;
  this.patrolX = 0;
  this.speedX = Math.random()*4;
  this.patrolY = 0;
  this.speedY = Math.random()*4;
};
// invader's update function
Invader.prototype = {
  update: function() {
    if (this.patrolX < 0 || this.patrolX > 40) {
      this.speedX = -this.speedX;
    }
    this.center.x += this.speedX;
    this.patrolX += this.speedX;
    if (this.patrolY < 0 || this.patrolY > 40) {
      this.speedY = -this.speedY;
    }
    this.center.y += this.speedY;
    this.patrolY += this.speedY;

    if (Math.random() > 0.895 && !this.game.invadersBelow(this)) {
      var bullet = new Bullet({
        x: this.center.x,
        y: this.center.y + this.size.y / 2 + 2
      }, {
        x: Math.random() - 0.5,
        y: 2
      });
      this.game.addBody(bullet);
    }
  }
};
 // factory function for creating array of invaders
var createInvaders = function(game) {
  var invaders = [];
  for (var i = 0; i < 90; i++) {
    var x = 50 + (i % 18) * 70;
    var y = 50 + (i % 5) * 50;
   invaders.push(new Invader(game, {
      x: x,
      y: y
    }));
  }
  return invaders;
};

// function for defining area.
var drawRect = function(ctx, body,color = '#000') {
  ctx.fillStyle='#ffffff';
  ctx.fillRect(
    body.center.x - body.size.x / 2,
    body.center.y - body.size.y / 2,
    body.size.x, body.size.y
  );
};
// event listeners
var keyPress = function() {
  var keyState = {};
  window.onkeydown = function(e) {
    keyState[e.keyCode] = true;
  };
  window.onkeyup = function(e) {
    keyState[e.keyCode] = false;
  };
  this.isDown = function(keyCode) {
    return keyState[keyCode] === true;
  };
  this.KEYS = {
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32
  };
};

// Check for collisions
var colliding = function(b1, b2) {
  // essentially you are checking for the size of the invader or player vs the bullet and comparing.
  return !(
    b1 === b2 ||
    b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
    b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
    b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2 ||
    b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2
  );
};

var firstShoot = true;
var count = 0;
var canPlayerShoot = function() {
  if (count == 20) {
    return true;
  } else {
    count++;
  }
};
var game = new Game('board');
