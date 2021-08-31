// import validator from "validator";
import { isEmpty, isNumeric } from 'validator';

// const result = validator.isEmail('abcdef')
// const isNumeric = validator.isNumeric('2345afd6')

// const isEmpt = isEmpty('   ');
// isNumeric('')

const validateTransactionField = (value, fieldName) => {
  switch (fieldName) {
    case 'payee': {
      if (isEmpty(value)) {
        return 'Payee is required';
      }
      return '';
    }
    case 'amount': {
      if (isEmpty(value)) {
        return 'Amount is required';
      }
      if (!isNumeric(value)) {
        return 'Amount must be numeric';
      }
      return '';
    }
    case 'date': {
      if (isEmpty(value)) {
        return 'Date is required';
      }
      return '';
    }
    default:
      return '';
  }
};

const validateTransactionObject = value => {
  // value =>  { payee: '', amount: '', date: '', type: '', comment: '', categoryId: '' }
  const errorPayee = validateTransactionField(value.payee, 'payee');
  const errorAmount = validateTransactionField(value.amount, 'amount');
  const errorDate = validateTransactionField(value.date, 'date');

  const error = {};

  if (errorPayee) error.payee = errorPayee;
  if (errorAmount) error.amount = errorAmount;
  if (errorDate) error.date = errorDate;

  return error; // no error return {}

  // const payee = validateTransactionField(value.payee, 'payee');
  // const amount = validateTransactionField(value.amount, 'amount');
  // const date = validateTransactionField(value.date, 'date');
  // return { payee, amount, date };
};

export { validateTransactionField, validateTransactionObject };
