// import validator from "validator";
import { isEmpty, isNumeric } from 'validator';

// const result = validator.isEmail('abcdef')
// const isNumeric = validator.isNumeric('2345afd6')

// const isEmpt = isEmpty('   ');
// isNumeric('')

const validateTransaction = (value, name) => {
  const error = {};
  if (name === 'amount') {
    if (isEmpty(value)) {
      error.amount = 'Amount is required';
    }
  }
  return error;
};
