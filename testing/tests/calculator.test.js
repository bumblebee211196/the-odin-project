import Calculator from '../src/calculator';

test('Test - Calculator', () => {
  expect(Calculator).toBeDefined();
  expect(Calculator.add).toBeDefined();
  expect(Calculator.subtract).toBeDefined();
  expect(Calculator.divide).toBeDefined();
  expect(Calculator.multiply).toBeDefined();
});

test('Test- Calculator - Add', () => {
  expect(Calculator.add(1, 2)).toBe(3);
  expect(Calculator.add(-1, -2)).toBe(-3);
  expect(Calculator.add(-1, 2)).toBe(1);
  expect(Calculator.add(1, -2)).toBe(-1);
});

test('Test- Calculator - Subtract', () => {
  expect(Calculator.subtract(1, 2)).toBe(-1);
  expect(Calculator.subtract(-1, -2)).toBe(1);
  expect(Calculator.subtract(-1, 2)).toBe(-3);
  expect(Calculator.subtract(1, -2)).toBe(3);
});

test('Test- Calculator - Multiply', () => {
  expect(Calculator.multiply(1, 2)).toBe(2);
  expect(Calculator.multiply(-1, -2)).toBe(2);
  expect(Calculator.multiply(-1, 2)).toBe(-2);
  expect(Calculator.multiply(1, -2)).toBe(-2);
  expect(Calculator.multiply(1, 0)).toBe(0);
  expect(Calculator.multiply(-1, 0)).toBe(0);
});

test('Test- Calculator - Divide', () => {
  expect(Calculator.divide(1, 2)).toBe(0.5);
  expect(Calculator.divide(-1, -2)).toBe(0.5);
  expect(Calculator.divide(-1, 2)).toBe(-0.5);
  expect(Calculator.divide(1, -2)).toBe(-0.5);
  expect(Calculator.divide(0, -2)).toBe(0);
  expect(() => Calculator.divide(1, 0)).toThrow('Cannot divide by zero.');
});