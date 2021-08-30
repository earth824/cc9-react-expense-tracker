function TextInput({ label, type, value, onChange, name }) {
  return (
    <>
      <label className="form-label">{label}</label>
      <input type={type ?? 'text'} className="form-control" value={value} onChange={onChange} name={name} />
    </>
  );
}

export default TextInput;
