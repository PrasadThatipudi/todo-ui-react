import { useState } from "react";
import "../styles/input.css";

function Input(props) {
  const [value, setValue] = useState("");

  return (
    <div className="input-row">
      <input
        className="input"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoFocus={true}
      />
      <button
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
}

export default Input;
