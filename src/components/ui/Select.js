function Select({ label, children }) {
  return (
    <>
      <label className="form-label">{label}</label>
      <select className="form-select">{children}</select> {/* <Select><Option></Option><Option></Option></Select> */}
    </>
  );
}

export default Select;
