// ball
class Ball {
  constructor() {
    const context = arguments[0];
    this._x = context.x;
    this._y = context.y;
    this._velX = context.velX;
    this._velY = context.velY;
    this.size = context.size;
    this.color = context.color;
  }

  get position () {
    return {
      x: this._x,
      y: this._y,
    };
  }

  get velocity() {
    return {
      x: this._velX,
      y: this._velY,
    };
  }

  set position({x, y}) {
    this._x = x;
    this._y = y;
  }

  set velocity({ x, y }) {
    this._velX = x,
    this._velY = y;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  update() {
  
  }
}

function random (min, max) {
  const isNaN = (...arg) => arg.every(i => Number.isNaN(i));
  const isInt = (...arg) => arg.every(i => Number.isInteger(i));
  const isPositive = (...arg) => arg.every(i => i >= 0);

  return (min > max || !isPositive(min, max) || !isInt(min, max) || isNaN(min, max))
    ? 0
    : Math.floor(Math.random() * (max - min + 1)) + min;
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
      velX: 1,
      velY: 1,
      size,
      color: 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    });
    ball.ctx = ctx;
    balls.push(ball);
  } while (balls.length < ballCount)
}

function loop() {

  const amount = balls.length;

  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < amount; i++) {
    balls[i].draw();
  }

  requestAnimationFrame(loop);
}

init();

loop();
