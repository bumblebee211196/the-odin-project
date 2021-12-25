const capitalize = (str) => {
  if (str.length === 0) { return ''; }
  const strLower = str.toLowerCase();
  return `${strLower[0].toUpperCase()}${strLower.slice(1)}`;
};

const reverseString = (str) => {
  if (str.length === 0) { return ''; }
  return str.split('').reverse().join('');
};

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

const charToAscii = (char) => {
  const charToNumMapper = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'h': 7,
    'i': 8,
    'j': 9,
    'k': 10,
    'l': 11,
    'm': 12,
    'n': 13,
    'o': 14,
    'p': 15,
    'q': 16,
    'r': 17,
    's': 18,
    't': 19,
    'u': 20,
    'v': 21,
    'w': 22,
    'x': 23,
    'y': 24,
    'z': 25,
  };
  if (charToNumMapper.hasOwnProperty(char)) {
    return charToNumMapper[char];
  }
  return null;
};

const asciiToChar = (num) => {
  const numToCharMapper = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h',
    8: 'i',
    9: 'j',
    10: 'k',
    11: 'l',
    12: 'm',
    13: 'n',
    14: 'o',
    15: 'p',
    16: 'q',
    17: 'r',
    18: 's',
    19: 't',
    20: 'u',
    21: 'v',
    22: 'w',
    23: 'x',
    24: 'y',
    25: 'z'
  };
  return numToCharMapper[num];
};

const caesarCipher = (message, shifts) => {
  shifts = shifts % 26;
  if (shifts === 0) { return message; }
  const result = [];
  for (let char of message) {
    let toUpper = false;
    if (char === char.toUpperCase()) {
      char = char.toLowerCase();
      toUpper = true;
    }
    let charAscii = charToAscii(char);
    if (charAscii !== null) {
      charAscii = (charAscii + shifts) % 26;
      char = asciiToChar(charAscii);
    }
    if (toUpper) {
      char = char.toUpperCase();
    }
    result.push(char);
  }
  return result.join('');
};

const arrayUtils = (() => {
  const average = (array) => {
    return array.reduce((res, value) => res + value, 0) / array.length;
  };

  const min = (array) => {
    return array.reduce((res, value) => res < value ? res : value, Infinity);
  };

  const max = (array) => {
    return array.reduce((res, value) => res > value ? res : value, -Infinity);
  };

  return { average, min, max };
})();

const analyzeArray = (array) => {
  return {
    average: arrayUtils.average(array),
    min: arrayUtils.min(array),
    max: arrayUtils.max(array),
    length: array.length
  };
};

export { capitalize, reverseString, Calculator, caesarCipher, analyzeArray };
