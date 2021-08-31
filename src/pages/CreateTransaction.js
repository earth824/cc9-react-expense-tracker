import { useEffect, useState } from 'react';
import axios from 'axios';
import TextInput from '../components/ui/TextInput';
import Select from '../components/ui/Select';
import Option from '../components/ui/Option';
import TextArea from '../components/ui/TextArea';
import RadioButton from '../components/ui/RadioButton';
import Col from '../components/ui/Col';
import Form from '../components/ui/Form';

function CreateTransaction() {
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

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get('http://localhost:8080/categories');
        setOptionExpenses(res.data.categories.filter(item => item.type === 'EXPENSE'));
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
    if (e.target.name === 'type') {
      setInput(current => ({
        ...current,
        categoryId: e.target.value === 'EXPENSE' ? optionExpenses[0].id : optionIncomes[0].id
      }));
    }
    setInput(current => ({ ...current, [e.target.name]: e.target.value }));
  };

  const { type, payee, categoryId, amount, date, comment } = input;

  const shownOptions = type === 'EXPENSE' ? [...optionExpenses] : [...optionIncomes];

  return (
    <div className="border bg-white rounded-2 p-3">
      <Form className="row g-3">
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
          <TextInput label="Payee" value={payee} onChange={handleChangeInput} name="payee" />
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
          <TextInput label="Amount" value={amount} onChange={handleChangeInput} name="amount" />
        </Col>
        <Col sm={6}>
          <TextInput label="Date" type="date" value={date} onChange={handleChangeInput} name="date" />
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
