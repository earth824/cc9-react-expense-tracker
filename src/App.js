import './App.css';

function App() {
  return (
    <div className="container">
      <div className="content">
        <div className="border bg-white rounded-2 p-3">
          <form className="row g-3">
            <div className="col-12">
              <input type="radio" className="btn-check" />
              <label className="btn btn-danger rounded-0 rounded-start">Expense</label>
              <input type="radio" className="btn-check" />
              <label className="btn btn-outline-success rounded-0 rounded-end">Income</label>
            </div>
            <div className="col-sm-6">
              <label className="form-label">Payee</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Category</label>
              <select className="form-select">
                <option>Food</option>
                <option>Shopping</option>
                <option>Transport</option>
                <option>Utilities</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label className="form-label">Amount</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-12">
              <label className="form-label">Comment</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-12 mt-4 d-grid">
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>

        <div className="row mt-4">
          <div className="col-sm-4">
            <div className="bg-info rounded-2 p-3">
              <p className="text-black-50">Net Worth</p>
              <h5 className="text-white">฿1,000,000.00</h5>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="bg-success rounded-2 p-3">
              <p className="text-black-50">Income</p>
              <h5 className="text-white">฿1,500,000.00</h5>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="bg-danger rounded-2 p-3">
              <p className="text-black-50">Expense</p>
              <h5 className="text-white">฿500,000.00</h5>
            </div>
          </div>
        </div>

        <ul className="list-group mt-4">
          <li className="list-group-item d-flex justify-content-between align-items-center bd-callout bd-callout-danger">
            <div className="transaction-detail d-flex flex-fill me-4">
              <div className="transaction-date-card border border-1 border-dark rounded-2 bg-warning p-2 text-center">
                <p className="p-0 m-0 fs-7 text-black-50">Jan 21</p>
                <p className="p-0 m-0">21</p>
              </div>
              <div className="d-flex justify-content-between align-items-center flex-fill ps-4">
                <div>
                  <p className="mb-1 f-5 fw-bold">7-11</p>
                  <p className="mb-0 text-black-50 fs-7">Food</p>
                </div>
                <span className="badge bg-danger">฿17.00</span>
              </div>
            </div>
            <button className="btn btn-link text-secondary p-0 border-0">
              <i className="bi-x-circle" />
            </button>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center bd-callout bd-callout-success">
            <div className="transaction-detail d-flex flex-fill me-4">
              <div className="transaction-date-card border border-1 border-dark rounded-2 bg-warning p-2 text-center">
                <p className="p-0 m-0 fs-7 text-black-50">Dec 30</p>
                <p className="p-0 m-0">30</p>
              </div>
              <div className="d-flex justify-content-between align-items-center flex-fill ps-4">
                <div>
                  <p className="mb-1 f-5 fw-bold">Monster Inc. Company</p>
                  <p className="mb-0 text-black-50 fs-7">Salary</p>
                </div>
                <span className="badge bg-success">฿5,200.00</span>
              </div>
            </div>
            <button className="btn btn-link text-secondary p-0 border-0">
              <i className="bi-x-circle" />
            </button>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center bd-callout bd-callout-danger">
            <div className="transaction-detail d-flex flex-fill me-4">
              <div className="transaction-date-card border border-1 border-dark rounded-2 bg-warning p-2 text-center">
                <p className="p-0 m-0 fs-7 text-black-50">Dec 20</p>
                <p className="p-0 m-0">25</p>
              </div>
              <div className="d-flex justify-content-between align-items-center flex-fill ps-4">
                <div>
                  <p className="mb-1 f-5 fw-bold">BTS</p>
                  <p className="mb-0 text-black-50 fs-7">Transport</p>
                </div>
                <span className="badge bg-danger">฿37.00</span>
              </div>
            </div>
            <button className="btn btn-link text-secondary p-0 border-0">
              <i className="bi-x-circle" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
