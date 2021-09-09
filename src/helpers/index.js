export function random (min, max) {
  const isNaN = (...arg) => arg.every(i => Number.isNaN(i));
  const isInt = (...arg) => arg.every(i => Number.isInteger(i));

  return (min > max || !isInt(min, max) || isNaN(min, max))
    ? 0
    : Math.floor(Math.random() * (max - min + 1)) + min;
}
