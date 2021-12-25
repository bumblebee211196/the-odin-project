import {capitalize, reverseString, Calculator, caesarCipher, analyzeArray} from './testing';

// Testing capitalize
test('Test - Capitalize - lowercase to capitalized', () => {
  expect(capitalize('name1')).toBe('Name1');
});

test('Test - Capitalize - capitalized to capitalized', () => {
  expect(capitalize('Name2')).toBe('Name2');
});

test('Test - Capitalize - uppercase to capitalized', () => {
  expect(capitalize('NAME3')).toBe('Name3');
});

test('Test - Capitalize - empty to empty', () => {
  expect(capitalize('')).toBe('');
});

// Testing reverseString
test('Test - Reverse string - value1', () => {
  expect(reverseString('value1')).toBe('1eulav');
});

test('Test - Reverse string - value2', () => {
  expect(reverseString('value2')).toBe('2eulav');
});

test('Test - Reverse string - empty value', () => {
  expect(reverseString('')).toBe('');
});

test('Test - Reverse string - sentence', () => {
  expect(reverseString('I am a Developer')).toBe('repoleveD a ma I');
});

// Testing Calculator
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

// Testing caesarCipher
test('Test - CaesarCipher', () => {
  expect(caesarCipher).toBeDefined();
});

test('Test - CaesarCipher - shift by 1', () => {
  expect(caesarCipher('secret message', 1)).toBe('tfdsfu nfttbhf');
});

test('Test - CaesarCipher - shift by 2', () => {
  expect(caesarCipher('secret message', 2)).toBe('ugetgv oguucig');
});

test('Test - CaesarCipher - shift by 3', () => {
  expect(caesarCipher('secret message', 3)).toBe('vhfuhw phvvdjh');
});

test('Test - CaesarCipher - shift by 26', () => {
  expect(caesarCipher('secret message', 26)).toBe('secret message');
});

test('Test - CaesarCipher - shift by 1 - upper case', () => {
  expect(caesarCipher('SECRET MESSAGE', 1)).toBe('TFDSFU NFTTBHF');
});

test('Test - CaesarCipher - shift by 2 - punctuation', () => {
  expect(caesarCipher('Secret message!', 2)).toBe('Ugetgv oguucig!');
});

// Testing analyzeArray
test('Test - AnalyzeArray', () => {
  expect(analyzeArray([])).toBeDefined();
});

test('Test - AnalyzeArray - 1', () => {
  expect(analyzeArray([1,8,3,4,2,6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6
  });
});

test('Test - AnalyzeArray - 2', () => {
  expect(analyzeArray([1,8,3,4,2,-6])).toEqual({
    average: 2,
    min: -6,
    max: 8,
    length: 6
  });
});
