import analyzeArray from '../src/analyzeArray';

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