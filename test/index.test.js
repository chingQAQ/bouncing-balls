import { random } from '../src/helpers/index';
import { Ball } from '../src/module/ball';

describe('Is random function be alright', () => {
  const num = [
    { min: 10, max: 20 },
    { min: -7, max: 7 },
    { min: 44, max: 64 },
    { min: 50, max: 1024 }
  ];

  const exceptionNum = [
    { min: 5, max: 1 },
    { min: 60, max: 40 },
    { min: 'min', max: 64 },
    { min: 50, max: null },
    { min: '123', max: 555 }
  ];

  for (let i = 0; i < num.length; i++) {
    const { min, max } = num[i];
    const rat = random(min, max);

    test('Is random result are number', () => {
      expect(rat).toEqual(expect.any(Number));
    });
    
    test('Is random result are between min and max', () => {
      expect(rat).toBeGreaterThanOrEqual(min);
      expect(rat).toBeLessThanOrEqual(max);
    });
  }

  for (let i = 0; i < exceptionNum.length; i++) {
    const { min, max } = exceptionNum[i];
    const rat = random(min, max);

    test('Is random props not expect params', () => {
      expect(rat).toEqual(0);
    });
  }
});

describe('Is ball object be alright', () => {
  const option = {
    x: 0,
    y: 0,
    velX: 1,
    velY: 1,
    size: 16,
    color: 'rgba(255,255,255,1)'
  };
  const ball = new Ball(option);

  test('Is ball property all match with option', () => {
    expect(ball.position.x).toEqual(option.x);
    expect(ball.position.y).toEqual(option.y);
    expect(ball.velX).toEqual(option.velX);
    expect(ball.velY).toEqual(option.velY);
    expect(ball.size).toEqual(option.size);
    expect(ball.color).toEqual(option.color);
  });

  test('Is ball position setter ok', () => {
    const position = {
      x: random(11, 49),
      y: random(51, 64),
    }

    ball.position = position;

    expect(ball.position.x).toEqual(position.x);
    expect(ball.position.y).toEqual(position.y);
  });
})
