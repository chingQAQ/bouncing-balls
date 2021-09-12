class Circle {
  constructor(context) {
    this._x = context.x;
    this._y = context.y;
    this.size = context.size;
    this.color = context.color;
  }

  get position() {
    return {
      x: this._x,
      y: this._y,
    };
  }

  set position({ x, y }) {
    this._x = x;
    this._y = y;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  collisionDetect(items) {
    const balls = items;
    const length = balls.length;

    for (let i = 0; i < length; i++) {
      const dx = this.position.x - balls[i].position.x;
      const dy = this.position.y - balls[i].position.y;
      const distance = Math.sqrt((dx * dx) + (dy * dy));

      if (distance < this.size + balls[i].size) {
        balls[i].velX *= -1;
        balls[i].velY *= -1;
      }
    }
  }
}

function random (min, max) {
  const isNaN = (...arg) => arg.every(i => Number.isNaN(i));
  const isInt = (...arg) => arg.every(i => Number.isInteger(i));

  return (min > max || !isInt(min, max) || isNaN(min, max))
    ? 0
    : Math.floor(Math.random() * (max - min + 1)) + min;
}

class Ball extends Circle {
  constructor(context) {
    super(context);
    this.velX = context.velX;
    this.velY = context.velY;
  }

  update() {
    if (this.position.x + this.size >= window.innerWidth || this.position.x - this.size <= 0) {
      this.velX *= -1;
    }

    if (this.position.y + this.size >= window.innerHeight || this.position.y - this.size <= 0) {
      this.velY *= -1;
    }

    this.position = { x: this.position.x += this.velX, y: this.position.y += this.velY};
  }

  collisionDetect(items) {
    const length = items.length;
    
    for(let i = 0; i < length; i++) {
      const dx = items[i].position.x - this.position.x;
      const dy = items[i].position.y - this.position.y;
      const distance = Math.sqrt((dx * dx) + (dy * dy));

      if (this !== items[i] && distance < this.size + items[i].size) {
        this.velX += 0.1 * (this.velX < 0 ? -1 : 1);
        this.velY += 0.1 * (this.velY < 0 ? -1 : 1);
        items[i].color = this.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
      }
    }
  }
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const ballCount = random(10, 20);
const balls = [];

const obstacleCount = random(1, 4);
const obstacles = [];

const circleSize = random(12, 30);

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

function init () {
  const size = circleSize;

  do {
    const ball = new Ball({
      x: random(0 + size, width - size),
      y: random(0 + size, height - size),
      velX: random(-7, 7),
      velY: random(-7, 7),
      size,
      color: 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')'
    });

    ball.ctx = ctx;
    balls.push(ball);
  } while (balls.length < ballCount);

  do {
    const obstacle = new Circle({
      x: random(0 + size, width - size),
      y: random(0 + size, height - size),
      size,
      color: 'rgb(255, 255, 255)'
    });

    obstacle.ctx = ctx;
    obstacles.push(obstacle);
  } while (obstacles.length < obstacleCount);
}

function loop() {
  const amount = balls.length;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < amount; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect(balls);
  }

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].draw();
    obstacles[i].collisionDetect(balls);
  }

  requestAnimationFrame(loop);
}

init();

loop();
