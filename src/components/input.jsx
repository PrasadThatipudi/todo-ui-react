import { useState } from "react";

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
    // If both are selected, deselect both
    if (isImportant && isUrgent) {
      setIsImportant(false);
      setIsUrgent(false);
    }
    // If only one is selected, select the other one too
    else if (isImportant || isUrgent) {
      setIsImportant(true);
      setIsUrgent(true);
    }
    // If none are selected, select both
    else {
      setIsImportant(true);
      setIsUrgent(true);
    }
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
          // Ctrl+i for important
          if (event.ctrlKey && event.key === "i") {
            event.preventDefault();
            handleImportantClick();
          }
          // Ctrl+u for urgent
          if (event.ctrlKey && event.key === "u") {
            event.preventDefault();
            handleUrgentClick();
          }
          // Ctrl+m for both priorities (smart toggle)
          if (event.ctrlKey && event.key === "m") {
            event.preventDefault();
            handleBothPriorities();
          }
        }}
        onChange={props.onChange || ((e) => setValue(trim(e.target.value)))}
      />
      <div className="priority-controls">
        <button
          type="button"
          className={`priority-btn priority-btn-important ${isImportant ? 'active' : ''}`}
          onClick={handleImportantClick}
        >
          imp
        </button>
        <button
          type="button"
          className={`priority-btn priority-btn-urgent ${isUrgent ? 'active' : ''}`}
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
