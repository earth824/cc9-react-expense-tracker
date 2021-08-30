function Option({ children, value }) {
  return (
    <option value={value}>
      {/* <option style={dense ? { margin: '1px', padding: '1px' } : {}} value={value}></option> */}
      {children}
    </option>
  ); // <Option value="">Shopping</Option>
}

export default Option;
