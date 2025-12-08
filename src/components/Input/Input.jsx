import "./Input.scss";

function Input({
  label,
  type,
  customClass,
  name,
  handleChange,
  defaultValue,
  disabled,
  maxLength,
}) {
  return (
    <section className="input">
      {/* Åtgärd: Label och Input var inte länkade (saknade id/for). 
          Lade till htmlFor och id för att RTL ska kunna hitta fältet med getByLabelText(). */}
      <label className="input__label" htmlFor={name}> 
        {label}
      </label>
      <input
        id={name}
        type={type}
        className={`input__field ${customClass ? customClass : ""}`}
        name={name}
        onChange={handleChange}
        defaultValue={defaultValue ? defaultValue : ""}
        maxLength={maxLength}
        disabled={disabled}
      />
    </section>
  );
}

export default Input;