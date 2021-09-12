export default class Circle {
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
