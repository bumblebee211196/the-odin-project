import reverseString from '../src/reverseString';

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