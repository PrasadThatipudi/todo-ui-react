import { useState, useRef, useEffect, forwardRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const Tab = forwardRef((props, ref) => {
  const {
    title,
    isActive,
    onClick,
    pendingTasksCount,
    onEditTitle,
    onDeleteTodo,
  } = props;
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const inputRef = useRef(null);

  const capitalize = (title) =>
    title
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleInputBlur = () => {
    setEditing(false);
    if (inputValue !== title && inputValue.trim() && onEditTitle) {
      onEditTitle(inputValue);
    }
  };

  const handleInputSubmit = () => {
    inputRef.current.blur();
  };

  const handleInputCancel = () => {
    setInputValue(title);
    setEditing(false);
  };

  // Auto-closing brackets/quotes handler
  const handleAutoComplete = (event) => {
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

      // Update the input value with capitalization
      setInputValue(capitalize(newValue));

      // Position cursor after the opening character
      setTimeout(() => {
        input.setSelectionRange(start + 1, start + 1);
      }, 0);
    }
    // For all other keys (including Enter/Escape), let useHotkeys handle them
  };

  // Hotkeys for editing mode - only active when editing
  useHotkeys("enter", handleInputSubmit, {
    enableOnFormTags: ["input"],
    enabled: editing,
  });

  useHotkeys("escape", handleInputCancel, {
    enableOnFormTags: ["input"],
    enabled: editing,
  });

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDeleteTodo) {
      onDeleteTodo();
    }
  };

  return editing ? (
    <input
      ref={inputRef}
      className={`tab tab-edit-input${isActive ? " active" : ""}`}
      value={inputValue}
      onChange={(event) => {
        // Apply trimming and capitalization
        const trimmed = event.target.value.trimStart().replace(/\s+/g, " ");
        setInputValue(capitalize(trimmed));
      }}
      onKeyDown={handleAutoComplete}
      onBlur={handleInputBlur}
      style={{ position: "relative" }}
    />
  ) : (
    <button
      ref={ref}
      type="button"
      className={`tab${isActive ? " active" : ""}`}
      onDoubleClick={handleDoubleClick}
      onClick={onClick}
      style={{ position: "relative" }}
    >
      {title}
      {typeof pendingTasksCount === "number" && (pendingTasksCount || "") && (
        <span className="tab-pending-count">{pendingTasksCount}</span>
      )}
      {onDeleteTodo && (
        <button
          type="button"
          className="tab-delete-btn"
          onClick={handleDeleteClick}
          title="Close tab"
        >
          ✕
        </button>
      )}
    </button>
  );
});

export default Tab;
