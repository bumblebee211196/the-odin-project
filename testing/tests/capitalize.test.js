import capitalize from '../src/capitatlize';

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