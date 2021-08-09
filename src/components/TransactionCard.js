const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function TransactionCard(props) {
  console.log(props.transaction.date.toString());
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center bd-callout bd-callout-danger">
      <div className="transaction-detail d-flex flex-fill me-4">
        <div className="transaction-date-card border border-1 border-dark rounded-2 bg-warning p-2 text-center">
          <p className="p-0 m-0 fs-7 text-black-50">
            {/* {props.transaction.date.toString().slice(4, 7)} {`${props.transaction.date.getFullYear()}`.slice(2)} */}
            {MONTHS[props.transaction.date.getMonth()]} {`${props.transaction.date.getFullYear()}`.slice(2)}
          </p>
          <p className="p-0 m-0">{props.transaction.date.getDate()}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-fill ps-4">
          <div>
            <p className="mb-1 f-5 fw-bold">{props.transaction.payee}</p>
            <p className="mb-0 text-black-50 fs-7">{props.transaction.category.name}</p>
          </div>
          <span className="badge bg-danger">฿17.00</span>
        </div>
      </div>
      <button className="btn btn-link text-secondary p-0 border-0">
        <i className="bi-x-circle" />
      </button>
    </li>
  );
}

export default TransactionCard;
