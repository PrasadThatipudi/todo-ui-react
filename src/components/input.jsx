import { useState } from "react";

const Input = (props) => {
  const [value, setValue] = useState("");

  const handleSubmit = (props, value, setValue) => {
    if (!value) return;

    props.onSubmit(value.trimEnd());
    setValue("");
  };

  const trim = (str) => str.trimStart().replace(/\s+/g, " ");

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
        onChange={props.onChange || ((e) => setValue(trim(e.target.value)))}
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
