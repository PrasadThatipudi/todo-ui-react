import { useState } from "react";

const Input = (props) => {
  const [value, setValue] = useState("");

  return (
    <div className="input-row">
      <input
        className="input"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        type="submit"
        className="add-btn"
        onClick={() => {
          props.onSubmit(value);
          setValue("");
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Input;
