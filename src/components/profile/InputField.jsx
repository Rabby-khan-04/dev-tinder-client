const InputField = ({ label, name, value, onChange }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="input input-bordered w-full"
    />
  </div>
);

export default InputField;
