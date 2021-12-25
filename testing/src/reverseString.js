const reverseString = (str) => {
  if (str.length === 0) { return ''; }
  return str.split('').reverse().join('');
};

export default reverseString;