import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EXPENSES, INCOMES } from '../mocks/data';
import { isEmpty } from '../services/validateService';

const validatePayee = value => {
  if (isEmpty(value)) {
    return 'Payee is required';
  }
  return '';
};

const validateAmount = value => {
  if (isEmpty(value)) {
    return 'Amount is required';
  } else if (isNaN(value)) {
    return 'Amount must be numeric';
  } else if (+value <= 0) {
    return 'Amount must be greater than zero';
  }
  return '';
};

const validateDate = value => {
  if (isEmpty(value)) {
    return 'Date is required or invalid format';
  }
  return '';
};

function TransactionForm({ addTransaction, closeAddForm }) {
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState(EXPENSES[0].id);
  const [payee, setPayee] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState({});

  const handleChangeType = e => {
    setType(e.target.value);
    if (e.target.value === 'Expense') {
      setCategory(EXPENSES[0].id);
    } else {
      setCategory(INCOMES[0].id);
    }
  };

  const handleChangePayee = e => {
    // if (isEmpty(e.target.value)) {
    //   // #1
    //   // const newError = { ...error };
    //   // newError.payee = 'Payee is required';
    //   // setError(newError);

    //   // #2
    //   setError(curErr => ({ ...curErr, payee: 'Payee is required' }));
    // } else {
    //   setError(curErr => ({ ...curErr, payee: '' }));
    // }
    setError(curErr => ({ ...curErr, payee: validatePayee(e.target.value) }));
    setPayee(e.target.value);
  };

  const handleChangeAmount = e => {
    // if (isEmpty(e.target.value)) {
    //   setError(curErr => ({ ...curErr, amount: 'Amount is required' }));
    // } else if (isNaN(e.target.value)) {
    //   setError(curErr => ({ ...curErr, amount: 'Amount must be numeric' }));
    // } else if (+e.target.value <= 0) {
    //   setError(curErr => ({ ...curErr, amount: 'Amount must be greater than zero' }));
    // } else {
    //   setError(curErr => ({ ...curErr, amount: '' }));
    // }
    setError(curErr => ({ ...curErr, amount: validateAmount(e.target.value) }));
    setAmount(e.target.value);
  };

  const handleChangeDate = e => {
    setError(curErr => ({ ...curErr, date: validateDate(e.target.value) }));
    setDate(e.target.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    const payeeError = validatePayee(payee);
    const amountError = validateAmount(amount);
    const dateError = validateDate(date);

    if (payeeError || amountError || dateError) {
      setError({ payee: payeeError, amount: amountError, date: dateError });
    } else {
      const newTransaction = {
        id: uuidv4(),
        payee: payee,
        amount: +amount,
        date: new Date(date),
        category:
          type === 'Expense' ? EXPENSES.find(item => item.id === category) : INCOMES.find(item => item.id === category),
        comment: comment
      };

      addTransaction(newTransaction);
      setError({});
      setPayee('');
      setAmount('');
      setComment('');
      setType('Expense');
      setDate('');
      setCategory(EXPENSES[0].id);
    }
  };

  const categoryOptions =
    type === 'Expense'
      ? EXPENSES.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))
      : INCOMES.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ));

  return (
    <div className="border bg-white rounded-2 p-3">
      <form className="row g-3" onSubmit={handleSubmitForm}>
        <div className="col-12 d-flex justify-content-between">
          <div>
            <input
              type="radio"
              className="btn-check"
              name="type"
              id="cbx-expense"
              value="Expense"
              defaultChecked
              onChange={handleChangeType}
            />
            <label className="btn btn-outline-danger rounded-0 rounded-start" htmlFor="cbx-expense">
              Expense
            </label>
            <input
              type="radio"
              className="btn-check"
              name="type"
              id="cbx-income"
              value="Income"
              onChange={handleChangeType}
            />
            <label className="btn btn-outline-success rounded-0 rounded-end" htmlFor="cbx-income">
              Income
            </label>
          </div>
          <button type="button" className="btn-close btn-sm" onClick={closeAddForm}></button>
        </div>
        <div className="col-sm-6">
          <label className="form-label">Payee</label>
          <input
            type="text"
            className={`form-control${error.payee ? ' is-invalid' : ''}`}
            value={payee}
            onChange={handleChangePayee}
          />
          <div className="invalid-feedback">{error.payee}</div>
        </div>
        <div className="col-sm-6">
          <label className="form-label">Category</label>
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
            {categoryOptions}
          </select>
        </div>
        <div className="col-sm-6">
          <label className="form-label">Amount</label>
          <input
            type="text"
            className={`form-control${error.amount ? ' is-invalid' : ''}`}
            value={amount}
            onChange={handleChangeAmount}
          />
          <div className="invalid-feedback">{error.amount}</div>
        </div>
        <div className="col-sm-6">
          <label className="form-label">Date</label>
          <input
            type="date"
            className={`form-control${error.date ? ' is-invalid' : ''}`}
            value={date}
            onChange={handleChangeDate}
          />
          <div className="invalid-feedback">{error.date}</div>
        </div>
        <div className="col-12">
          <label className="form-label">Comment</label>
          <input type="text" className="form-control" value={comment} onChange={e => setComment(e.target.value)} />
        </div>
        <div className="col-12 mt-4 d-grid">
          <button className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
