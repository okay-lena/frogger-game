// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = speed;

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + this.speed * dt;

        // bring enemy back to canvas && change speed
        if (this.x > 600) {
            this.x = -100;
            this.speed = 100 + Math.floor(Math.random() * 300);
        }

        // check for collision with player
        if (this.x > player.x - 50 &&
            this.x < player.x + 50 &&
            this.y > player.y - 50 &&
            this.y < player.y + 50) {
            // return player to start
            player.x = 202;
            player.y = 400;
        }
    }

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/char-boy.png';
    }

    update(dt) {
        // keep player within canvas
        if (this.y > 380) {
            this.y = 380;
        }

        if (this.x > 400) {
            this.x = 400;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.y < 0) {
            this.x = 202;
            this.y = 400;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPressed) {
        if (keyPressed === 'left' && this.x > 0) {
            this.x = this.x - 101;
        }

        if (keyPressed === 'up' && this.y > 0) {
            this.y = this.y - 83;
        }

        if (keyPressed === 'right' && this.x < 404) {
            this.x = this.x + 101;
        }

        if (keyPressed === 'down' && this.y < 374) {
            this.y = this.y + 83;
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player(202, 400, 50);

// Setup swimlanes to place enemies there
let enemyPlace = [60, 145, 225];
let enemy;

enemyPlace.forEach(function(y) {
    enemy = new Enemy(0, y, 100 + Math.floor(Math.random() * 300));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
