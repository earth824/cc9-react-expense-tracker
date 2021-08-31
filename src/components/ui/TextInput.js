function TextInput({ label, type, value, onChange, name, error }) {
  return (
    <>
      <label className="form-label">{label}</label>
      <input
        type={type ?? 'text'}
        className={`form-control${error ? ' is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  );
}

export default TextInput;
