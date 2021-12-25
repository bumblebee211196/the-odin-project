const capitalize = (str) => {
  if (str.length === 0) { return ''; }
  const strLower = str.toLowerCase();
  return `${strLower[0].toUpperCase()}${strLower.slice(1)}`;
};

export default capitalize;