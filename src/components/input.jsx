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
    const trimmedValue = value.trimStart().replace(/\s+/g, " ").trimEnd();
    props.onSubmit(trimmedValue, priority);
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

  return (
    <div className="input-row">
      <input
        className="input"
        type="text"
        value={value}
        autoFocus={true}
        onKeyDown={(event) => {
          // Handle auto-completion for brackets and quotes
          const closingChars = {
            "(": ")",
            "[": "]",
            "{": "}",
            "'": "'",
            '"': '"',
          };

          const openChar = event.key;
          const closeChar = closingChars[openChar];

          if (closeChar) {
            event.preventDefault();

            const input = event.target;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const currentValue = input.value;

            // Insert both opening and closing characters
            const newValue =
              currentValue.slice(0, start) +
              openChar +
              closeChar +
              currentValue.slice(end);

            // Update the input value
            setValue(newValue);

            // Position cursor after the opening character
            setTimeout(() => {
              input.setSelectionRange(start + 1, start + 1);
            }, 0);

            return; // Don't process other key handlers
          }

          // Handle Enter key
          if (event.key === "Enter") {
            handleSubmit(props, value, setValue);
          }
        }}
        onChange={
          props.onChange ||
          ((e) => {
            // Apply trimming: remove leading spaces and replace multiple spaces with single space
            const trimmed = e.target.value.trimStart().replace(/\s+/g, " ");
            setValue(trimmed);
          })
        }
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
