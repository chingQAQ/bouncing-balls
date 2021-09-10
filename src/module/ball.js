import Circle from './circle';
import { random } from '../helpers/index';
export default class Ball extends Circle {
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

    this.position = { x: this.position.x += this.velX, y: this.position.y += this.velY}
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

