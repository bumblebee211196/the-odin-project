const Calculator = (() => {
  const add = (x, y) => { return x + y; };
  const subtract = (x, y) => { return x - y; };
  const multiply = (x, y) => {
    if (x === 0 || y === 0) { return 0; }
    return x * y;
  };
  const divide = (x, y) => {
    if (x === 0) { return 0; }
    if (y === 0) { throw new Error('Cannot divide by zero.'); }
    return x / y;
  };
  return {
    add,
    subtract,
    multiply,
    divide
  };
})();

export default Calculator;