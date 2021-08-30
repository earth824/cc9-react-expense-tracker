function RadioButton({ id, name, children, color, radius, value, defaultChecked, onChange }) {
  const radiusClass = radius ? ` rounded-${radius}` : '';
  // const colors = ['success', 'info'];
  // const colorClass = colors.includes(color) ? `btn-outline-${color}` : 'btn-outline-secondary';
  return (
    <>
      <input
        type="radio"
        className="btn-check"
        id={id}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <label className={`btn btn-outline-${color ?? 'secondary'} rounded-0${radiusClass}`} htmlFor={id}>
        {children}
      </label>
    </>
  );
}

export default RadioButton;
