var canvas,
    ctx,
    width = 600,
    height = 600,
    enemy,
    enemyTotal = 5,
    enemies = [],
    enemy_x = 100,
    enemy_y = -45,
    enemy_w = 32,
    enemy_h = 32,
    speed = 3,
    rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false,
    ship,
    ship_x = (width / 2) - 16, ship_y = height - 48, ship_w = 32, ship_h = 32,
    laserTotal = 2,
    lasers = [];

for (var i = 0; i < enemyTotal; i++) {
    enemies.push([enemy_x, enemy_y, enemy_w, enemy_h, speed]);
    enemy_x += enemy_w + 64;
}

function clearCanvas() {
    ctx.clearRect(0,0,width,height);
}

function drawShip() {
    if (rightKey) ship_x += 5;
    else if (leftKey) ship_x -= 5;
    if (upKey) ship_y -= 5;
    else if (downKey) ship_y += 5;
    if (ship_x <= 0) ship_x = 0;
    if ((ship_x + ship_w) >= width) ship_x = width - ship_w;
    if (ship_y <= 0) ship_y = 0;
    if ((ship_y + ship_h) >= height) ship_y = height - ship_h;
    ctx.drawImage(ship, ship_x, ship_y); 
}

function drawLaser() {
    if (lasers.length) {
        for (var i=0; i<lasers.length; i++) {
            ctx.fillStyle = '#f00';
            ctx.fillRect(lasers[i][0], lasers[i][1], lasers[i][2], lasers[i][3]);
        }
    }
}

function moveLaser() {
    for (var i=0; i<lasers.length; i++) {
        if (lasers[i][1] > -11) {
            lasers[i][1] -= 10;
        } else if (lasers[i][1] < -10) {
            lasers.splice(i, 1);
        }
    }
}

function drawEnemies() {
    for (var i=0; i < enemies.length; i++) {
        ctx.drawImage(enemy, enemies[i][0], enemies[i][1]);
    }
}

function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i][1] < height) {
            enemies[i][1] += enemies[i][4];
        } else if (enemies[i][1] > height - 1) {
            enemies[i][1] = -45;
        }
    }
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    enemy = new Image();
    enemy.src = 'img/enemy-32x32.png';
    ship = new Image();
    ship.src = 'img/ship-32x32.png';
    setInterval(gameLoop, 25);
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
}

function gameLoop() {
    clearCanvas();
    moveEnemies();
    moveLaser();
    drawEnemies();
    drawShip();
    drawLaser();
}

function keyDown(e) {
    if (e.keyCode == 39) rightKey = true;
    else if (e.keyCode == 37) leftKey = true;
    if (e.keyCode == 38) upKey = true;
    else if (e.keyCode == 40) downKey = true;
    if (e.keyCode == 88 && lasers.length <= laserTotal) lasers.push([ship_x + 16, ship_y - 20, 4, 20]);
}

function keyUp(e) {
    if (e.keyCode == 39) rightKey = false;
    else if (e.keyCode == 37) leftKey = false;
    if (e.keyCode == 38) upKey = false;
    else if (e.keyCode == 40) downKey = false;
}

window.onload = init;


