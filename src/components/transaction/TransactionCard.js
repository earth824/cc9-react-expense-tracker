import axios from 'axios';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TransactionContext } from '../../contexts/transactionContext';
import { formatThaiCurrency } from '../../services/currency';
import { formatShortMonthShortYear } from '../../services/date';

function TransactionCard({ transaction }) {
  const {
    id,
    payee,
    amount,
    date,
    category: { name, type }
  } = transaction;

  const { transactions, setTransactions } = useContext(TransactionContext);

  const history = useHistory();

  const handleClickDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/transactions/${id}`);
      // const res = await axios.get('http://localhost:8080/transactions');
      // setTransactions(res.data.transactions.map(item => ({ ...item, date: new Date(item.date) })));

      const idx = transactions.findIndex(item => item.id === id);
      if (idx !== -1) {
        const newTransactions = [...transactions];
        newTransactions.splice(idx, 1);
        setTransactions(newTransactions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickEdit = () => {
    // history.push(`/edit-transaction/${id}`);
    history.push({ pathname: `/edit-transaction/${id}`, state: { transaction: transaction } });
  };

  const color = type === 'EXPENSE' ? 'danger' : 'success';

  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center bd-callout bd-callout-${color}`}>
      <div className="transaction-detail d-flex flex-fill me-4" onClick={handleClickEdit}>
        <div className="transaction-date-card border border-1 border-dark rounded-2 bg-warning p-2 text-center">
          <p className="p-0 m-0 fs-7 text-black-50">{formatShortMonthShortYear(date)}</p>
          <p className="p-0 m-0">{date.getDate()}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-fill ps-4">
          <div>
            <p className="mb-1 f-5 fw-bold">{payee}</p>
            <p className="mb-0 text-black-50 fs-7">{name}</p>
          </div>
          <span className={`badge bg-${color}`}>{formatThaiCurrency(amount)}</span>
        </div>
      </div>
      <button className="btn btn-link text-secondary p-0 border-0" onClick={handleClickDelete}>
        <i className="bi-x-circle" />
      </button>
    </li>
  );
}

export default TransactionCard;
