import caesarCipher from '../src/caesarCipher';

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
