import Circle from './circle';
import Ball from './ball';
import { random } from '../helpers/index';

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
})

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
    })

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
