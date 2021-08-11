import { formatThaiCurrency } from '../services/currencyService';
import { formatShortMonthShortYear } from '../services/dateService';

// const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// console.log(new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(new Date()));

function TransactionCard({ transaction: { date, category, amount, payee } }) {
  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center bd-callout bd-callout-${
        category.type === 'Income' ? 'success' : 'danger'
      }`}
    >
      <div className="transaction-detail d-flex flex-fill me-4">
        <div className="transaction-date-card border border-1 border-dark rounded-2 bg-warning p-2 text-center">
          <p className="p-0 m-0 fs-7 text-black-50">
            {/* {date.toString().slice(4, 7)} {`${date.getFullYear()}`.slice(2)} */}
            {/* {MONTHS[date.getMonth()]} {`${date.getFullYear()}`.slice(2)} */}
            {formatShortMonthShortYear(date)}
          </p>
          <p className="p-0 m-0">{date.getDate()}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-fill ps-4">
          <div>
            <p className="mb-1 f-5 fw-bold">{payee}</p>
            <p className="mb-0 text-black-50 fs-7">{category.name}</p>
          </div>
          <span className={`badge bg-${category.type === 'Income' ? 'success' : 'danger'}`}>
            {formatThaiCurrency(amount)}
          </span>
        </div>
      </div>
      <button className="btn btn-link text-secondary p-0 border-0">
        <i className="bi-x-circle" />
      </button>
    </li>
  );
}

export default TransactionCard;
