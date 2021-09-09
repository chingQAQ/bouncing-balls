// ball
export class Ball {
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
    this._velY = y
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

