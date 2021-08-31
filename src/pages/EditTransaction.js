import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { TransactionContext } from '../contexts/transactionContext';
import { validateTransactionField, validateTransactionObject } from '../services/validate';
import Form from '../components/ui/Form';
import Col from '../components/ui/Col';
import RadioButton from '../components/ui/RadioButton';
import TextInput from '../components/ui/TextInput';
import Select from '../components/ui/Select';
import Option from '../components/ui/Option';
import TextArea from '../components/ui/TextArea';

function EditTransaction() {
  const location = useLocation();

  const [input, setInput] = useState({
    type: location?.state?.transaction?.category?.type || 'EXPENSE',
    payee: location?.state?.transaction?.payee || '',
    categoryId: location?.state?.transaction?.category?.id || '',
    amount: location?.state?.transaction?.amount + '' || '',
    date: location?.state?.transaction?.date.toISOString().slice(0, 10) || '',
    comment: location?.state?.transaction?.comment || ''
  });

  const [optionExpenses, setOptionExpenses] = useState([]);
  const [optionIncomes, setOptionIncomes] = useState([]);
  const [error, setError] = useState({});

  const { transactions, setTransactions } = useContext(TransactionContext);

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get('http://localhost:8080/categories');
        const expenses = res.data.categories.filter(item => item.type === 'EXPENSE');
        setOptionExpenses(expenses);
        setOptionIncomes(res.data.categories.filter(item => item.type === 'INCOME'));
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/transactions/${params.id}`);
        const transaction = res.data.transaction;
        setInput({
          type: transaction.category.type,
          payee: transaction.payee,
          amount: transaction.amount + '',
          date: transaction.date.slice(0, 10),
          categoryId: transaction.category.id,
          comment: transaction.comment
        });
      } catch (err) {
        console.log(err);
      }
    };
    if (!location.state) fetchTransaction();
  }, []);

  const handleChangeInput = e => {
    const validateFields = ['amount', 'payee', 'date'];

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

    if (Object.keys(error).length === 0) {
      try {
        const res = await axios.put(`http://localhost:8080/transactions/${params.id}`, {
          payee: input.payee,
          amount: +input.amount,
          date: input.date,
          categoryId: input.categoryId,
          comment: input.comment
        });

        const newTransactions = [...transactions];
        const idx = newTransactions.findIndex(item => item.id === params.id);
        if (idx !== -1) {
          const updateItem = res.data.transaction;
          newTransactions[idx] = { ...updateItem, date: new Date(updateItem.date) };
          setTransactions(newTransactions);
        }

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

export default EditTransaction;
