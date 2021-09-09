﻿import { Ball } from './ball';
import { random } from '../helpers/index';

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
    })

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
