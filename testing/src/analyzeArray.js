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

export default analyzeArray;