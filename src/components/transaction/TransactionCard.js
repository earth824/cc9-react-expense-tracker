import { formatThaiCurrency } from '../../services/currency';
import { formatShortMonthShortYear } from '../../services/date';

function TransactionCard({
  transaction: {
    payee,
    amount,
    date,
    category: { name, type }
  }
}) {
  const dateObj = new Date(date);
  const color = type === 'EXPENSE' ? 'danger' : 'success';

  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center bd-callout bd-callout-${color}`}>
      <div className="transaction-detail d-flex flex-fill me-4">
        <div className="transaction-date-card border border-1 border-dark rounded-2 bg-warning p-2 text-center">
          <p className="p-0 m-0 fs-7 text-black-50">{formatShortMonthShortYear(dateObj)}</p>
          <p className="p-0 m-0">{dateObj.getDate()}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-fill ps-4">
          <div>
            <p className="mb-1 f-5 fw-bold">{payee}</p>
            <p className="mb-0 text-black-50 fs-7">{name}</p>
          </div>
          <span className={`badge bg-${color}`}>{formatThaiCurrency(amount)}</span>
        </div>
      </div>
      <button className="btn btn-link text-secondary p-0 border-0">
        <i className="bi-x-circle" />
      </button>
    </li>
  );
}

export default TransactionCard;
