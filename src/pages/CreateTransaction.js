import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import TextInput from '../components/ui/TextInput';
import Select from '../components/ui/Select';
import Option from '../components/ui/Option';
import TextArea from '../components/ui/TextArea';
import RadioButton from '../components/ui/RadioButton';
import Col from '../components/ui/Col';
import Form from '../components/ui/Form';
import { validateTransactionField, validateTransactionObject } from '../services/validate';
import { TransactionContext } from '../contexts/transactionContext';

function CreateTransaction(props) {
  const [input, setInput] = useState({
    type: 'EXPENSE',
    payee: '',
    categoryId: '',
    amount: '',
    date: '',
    comment: ''
  });
  const [optionExpenses, setOptionExpenses] = useState([]);
  const [optionIncomes, setOptionIncomes] = useState([]);
  const [error, setError] = useState({});

  const { transactions, setTransactions } = useContext(TransactionContext);

  const history = useHistory();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get('http://localhost:8080/categories');
        const expenses = res.data.categories.filter(item => item.type === 'EXPENSE');
        setOptionExpenses(expenses);
        setInput(current => ({ ...current, categoryId: expenses[0].id }));
        setOptionIncomes(res.data.categories.filter(item => item.type === 'INCOME'));
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategory();
  }, []);

  // const handleChangePayee = e => {
  //   setInput({ ...input, payee: e.target.value });
  // };

  // const handleChangeAmount = e => {
  //   setInput({ ...input, amount: e.target.value });
  // };

  const handleChangeInput = e => {
    const validateFields = ['amount', 'payee', 'date'];
    // if (e.target.name === 'amount' || e.target.name === 'payee' || e.target.name === 'date') {
    if (validateFields.includes(e.target.name)) {
      const error = validateTransactionField(e.target.value, e.target.name);
      setError(current => ({ ...current, [e.target.name]: error }));
    }

    if (e.target.name === 'type') {
      setInput(current => ({
        ...current,
        categoryId: e.target.value === 'EXPENSE' ? optionExpenses[0].id : optionIncomes[0].id
      }));
    }
    setInput(current => ({ ...current, [e.target.name]: e.target.value }));
  };

  const handleSubmitForm = async e => {
    e.preventDefault();
    const error = validateTransactionObject(input);
    setError(error);

    // const keys = Object.keys(error);
    // let hasError = false;
    // for (let i = 0; i < keys.length; i++) {
    //   if (error[keys] !== '') {
    //     hasError = true;
    //     break;
    //   }
    // }
    // if (!hasError) {
    //   // save to api
    // }

    // error { payee: 'Payee error', amount: 'Amount error' }
    // Object.keys(error) => ['payee', 'amount']
    // Object.values(error) => ['Payee error', 'Amount error']
    // Object.entries(error) => [['payee', 'Payee error'], ['amount', 'Amount error']]

    if (Object.keys(error).length === 0) {
      // save to api
      try {
        const res = await axios.post('http://localhost:8080/transactions', {
          payee: input.payee,
          amount: +input.amount,
          date: input.date,
          categoryId: input.categoryId,
          comment: input.comment
        });

        // Method#1 update by calling api
        // const res1 = await axios.get('http://localhost:8080/transactions');
        // setTransactions(res1.data.transactions.map(item => ({ ...item, date: new Date(item.date) })));

        // Method#2 update by pure javascript
        const newTransactions = [...transactions];
        const newItem = res.data.transaction;
        newTransactions.push({ ...newItem, date: new Date(newItem.date) });
        newTransactions.sort((a, b) => {
          if (a.date < b.date) {
            return 1;
          }
          return -1;
        });
        // [3, 7, 1].sort((a, b) => { // [1, 7, 3]
        //   if (a > b) {
        //     return 1;
        //   } else {
        //     return -1
        //   }
        // })
        setTransactions(newTransactions);

        // Method#1 Redirect using props
        // props.history.push('/');

        // Method#2 Redirect using history object from useHistory
        history.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const { type, payee, categoryId, amount, date, comment } = input;

  const shownOptions = type === 'EXPENSE' ? [...optionExpenses] : [...optionIncomes];

  return (
    <div className="border bg-white rounded-2 p-3">
      <Form className="row g-3" onSubmit={handleSubmitForm}>
        <Col>
          <RadioButton
            id="cbx-expense"
            name="type"
            color="danger"
            radius="start"
            value="EXPENSE"
            onChange={handleChangeInput}
            defaultChecked={type === 'EXPENSE'}
          >
            Expense
          </RadioButton>
          <RadioButton
            id="cbx-income"
            name="type"
            color="success"
            radius="end"
            value="INCOME"
            onChange={handleChangeInput}
            defaultChecked={type === 'INCOME'}
          >
            Income
          </RadioButton>
        </Col>
        <Col sm={6}>
          <TextInput label="Payee" value={payee} onChange={handleChangeInput} name="payee" error={error.payee} />
        </Col>
        <Col sm={6}>
          <Select label="Category" value={categoryId} onChange={handleChangeInput} name="categoryId">
            {shownOptions.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
            {/* <Option value="Food">Food</Option>
            <Option value="Shopping">Shopping</Option>
            <Option value="Transport">Transaport</Option> */}
          </Select>
        </Col>
        <Col sm={6}>
          <TextInput label="Amount" value={amount} onChange={handleChangeInput} name="amount" error={error.amount} />
        </Col>
        <Col sm={6}>
          <TextInput
            label="Date"
            type="date"
            value={date}
            onChange={handleChangeInput}
            name="date"
            error={error.date}
          />
        </Col>
        <Col>
          <TextArea label="Comment" value={comment} onChange={handleChangeInput} name="comment" />
        </Col>
        <Col>
          <div className="d-grid mt-3">
            <button className="btn btn-primary">Save</button>
          </div>
        </Col>
      </Form>
    </div>
  );
}

export default CreateTransaction;
