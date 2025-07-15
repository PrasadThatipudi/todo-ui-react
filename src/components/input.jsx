import { useState } from "react";

const Input = (props) => {
  const [value, setValue] = useState("");

  const handleSubmit = (props, value, setValue) => {
    if (!value.trim()) return;

    props.onSubmit(value.trim());
    setValue("");
  };

  return (
    <div className="input-row">
      <input
        className="input"
        type="text"
        value={value}
        autoFocus={true}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSubmit(props, value, setValue);
          }
        }}
        onChange={props.onChange || ((event) => setValue(event.target.value))}
      />
      <button
        type="submit"
        className="add-btn"
        onClick={() => {
          handleSubmit(props, value, setValue);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Input;
