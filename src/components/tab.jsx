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
      onChange={(event) => setInputValue(capitalize(event.target.value))}
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
