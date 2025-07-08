import { useState } from "react";

function Input(props) {
  const [value, setValue] = useState("");

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoFocus={true}
      />
      <button
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
