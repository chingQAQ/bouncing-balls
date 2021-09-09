function random (min, max) {
  const isNaN = (...arg) => arg.every(i => Number.isNaN(i));
  const isInt = (...arg) => arg.every(i => Number.isInteger(i));

  return (min > max || !isInt(min, max) || isNaN(min, max))
    ? 0
    : Math.floor(Math.random() * (max - min + 1)) + min;
}

// ball
class Ball {
  constructor() {
    const context = arguments[0];
    this._x = context.x;
    this._y = context.y;
    this.velX = context.velX;
    this.velY = context.velY;
    this.size = context.size;
    this.color = context.color;
  }

  get position() {
    return {
      x: this._x,
      y: this._y,
    };
  }

  set position({x, y}) {
    this._x = x;
    this._y = y;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    this.ctx.fill();
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
        items[i].color = this.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
      }
    }
  }
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const ballCount = random(10, 20);
const balls = [];

function init () {
  do {
    const size = random(12, 30);
    const ball = new Ball({
      x: random(0 + size, width - size),
      y: random(0 + size, height - size),
      velX: random(-7, 7),
      velY: random(-7, 7),
      size,
      color: 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    });

    ball.ctx = ctx;
    balls.push(ball);
  } while (balls.length < ballCount)
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

  requestAnimationFrame(loop);
}

init();

loop();
