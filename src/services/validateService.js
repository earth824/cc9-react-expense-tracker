const isEmpty = value => {
  return !value || !value.trim(); // value === ''
};

const isNumeric = value => {
  return !isNaN(value);
};

export { isEmpty, isNumeric };
