import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const Input = (props) => {
  const [value, setValue] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const calculatePriority = () => {
    let priority = 0;
    if (isImportant) priority += 1;
    if (isUrgent) priority += 2;
    return priority;
  };

  const handleSubmit = (props, value, setValue) => {
    if (!value) return;

    const priority = calculatePriority();
    props.onSubmit(value.trimEnd(), priority);
    setValue("");
    setIsImportant(false);
    setIsUrgent(false);
  };

  const handleImportantClick = () => {
    setIsImportant(!isImportant);
  };

  const handleUrgentClick = () => {
    setIsUrgent(!isUrgent);
  };

  const handleBothPriorities = () => {
    if (!isImportant || !isUrgent) {
      setIsImportant(true);
      setIsUrgent(true);
      return;
    }

    setIsImportant(false);
    setIsUrgent(false);
  };

  // Hotkey definitions
  useHotkeys(
    "ctrl+i",
    (event) => {
      event.preventDefault();
      handleImportantClick();
    },
    { enableOnFormTags: ["INPUT"] }
  );

  useHotkeys(
    "ctrl+u",
    (event) => {
      event.preventDefault();
      handleUrgentClick();
    },
    { enableOnFormTags: ["INPUT"] }
  );

  useHotkeys(
    "ctrl+m",
    (event) => {
      event.preventDefault();
      handleBothPriorities();
    },
    { enableOnFormTags: ["INPUT"] }
  );

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
      <div className="priority-controls">
        <button
          type="button"
          className={`priority-btn priority-btn-important ${
            isImportant ? "active" : ""
          }`}
          onClick={handleImportantClick}
        >
          imp
        </button>
        <button
          type="button"
          className={`priority-btn priority-btn-urgent ${
            isUrgent ? "active" : ""
          }`}
          onClick={handleUrgentClick}
        >
          urg
        </button>
      </div>
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
