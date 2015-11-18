// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 1;
    this.y = getRandom(1,3) * 75;
    this.speed = getRandom(1,3) * 150;
    console.log(this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //this.x = (this.x + 5);
    //this.y = (this.y) + dt;
    if (this.x > 505) {
        this.y = getRandom(1,3) * 75;
        this.x = 1;
    }
    else {
        this.x += (this.speed * dt);
    }
    //console.log("update::" + dt + this.x + " " + this.y);
    this.detectCollision();
};

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //console.log("enemy::" + this.x +  this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 257;
    this.y = 415;
    this.speed = 50;
    this.score = 0;
}

Player.prototype.update = function(dt) {
    //this.x += this.speed * dt;
    //this.y += this.speed * dt;
    //console.log(this.x);
    
};

Player.prototype.render = function() {
    //console.log(Resources.get(this.sprite));
    //console.log("player::" + this.x + this.y);
    //var img = new Image();
    //img.src = 'images/char-horn-girl.png';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keypress) {
    //console.log(keypress);
    switch(keypress) {
        case "left":
            this.x -= this.speed;
            break;
        case "up":
            this.y -= this.speed;
            break;
        case "right":
            this.x += this.speed;
            break;
        case "down":
            this.y += this.speed;
            break;
    }
};

Player.prototype.resetPlayer = function () {
    //console.log("reset player");
    this.x = 257;
    this.y = 415;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();

var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();

Enemy.prototype.detectCollision = function() {
    //allEnemies.forEach(function(enemy) {
        if (mod(player.x - this.x) <= 30 && mod(player.y - this.y) <= 30) {
            player.resetPlayer();
        }
    //});
}

function mod(val) {
    if (val < 0) {
        return val * -1;
    }
    return val;
}

Player.prototype.incrementScore = function () {
    this.score = this.score + 10;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    //console.log("x::" + player.x + "y::" + player.y);
    if ((player.x < 0 && player.x > 408) || (player.y < 0 && player.y > 460)) {
        //console.log("x::" + player.x + "y::" + player.y);
        player.resetPlayer();
    }
    if (player.y <= 0) {
        alert("You won!!!" + player.score);
        player.resetPlayer();
        //console.log("incr score");
        player.incrementScore();
    }
    
});
