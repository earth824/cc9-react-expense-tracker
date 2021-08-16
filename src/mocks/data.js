import { v4 as uuidv4 } from 'uuid';

const EXPENSES = [
  { id: uuidv4(), name: 'Food', type: 'Expense' },
  { id: uuidv4(), name: 'Shopping', type: 'Expense' },
  { id: uuidv4(), name: 'Transport', type: 'Expense' },
  { id: uuidv4(), name: 'Utilities', type: 'Expense' }
];

const INCOMES = [
  { id: uuidv4(), name: 'Interest', type: 'Income' },
  { id: uuidv4(), name: 'Investment', type: 'Income' },
  { id: uuidv4(), name: 'Salary', type: 'Income' }
];

const INITIAL_TRANSACTIONS = [
  {
    id: uuidv4(),
    payee: '7-11',
    amount: 50,
    date: new Date('2021-06-12'),
    category: EXPENSES[0],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'Tesco Lotus',
    amount: 299,
    date: new Date('2019-11-28'),
    category: EXPENSES[1],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'True Corp.',
    amount: 20000,
    date: new Date('2020-02-28'),
    category: INCOMES[2],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: '7-11',
    amount: 509,
    date: new Date('2021-04-11'),
    category: EXPENSES[0],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'BigC',
    amount: 721,
    date: new Date('2021-04-25'),
    category: EXPENSES[1],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'BTS',
    amount: 1040,
    date: new Date('2021-01-27'),
    category: EXPENSES[2],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'Makro',
    amount: 345,
    date: new Date('2021-03-14'),
    category: EXPENSES[0],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'Tops',
    amount: 799,
    date: new Date('2021-05-03'),
    category: EXPENSES[1],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'Pizza Hut',
    amount: 659,
    date: new Date('2021-04-17'),
    category: EXPENSES[0],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'KFC',
    amount: 315,
    date: new Date('2021-08-11'),
    category: EXPENSES[0],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'B2S',
    amount: 199,
    date: new Date('2021-06-11'),
    category: EXPENSES[1],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'BTS',
    amount: 52,
    date: new Date('2021-07-17'),
    category: EXPENSES[2],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'MEA',
    amount: 1159,
    date: new Date('2021-01-23'),
    category: EXPENSES[3],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'PTT',
    amount: 2690.5,
    date: new Date('2021-03-30'),
    category: INCOMES[1],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: '3BB',
    amount: 643.17,
    date: new Date('2021-07-19'),
    category: EXPENSES[3],
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'Family Mart',
    amount: 101,
    date: new Date('2021-05-09'),
    category: EXPENSES[0],
    comment: ''
  }
];

export { EXPENSES, INCOMES, INITIAL_TRANSACTIONS };
