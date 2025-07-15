import { useState, useRef, useEffect } from "react";

const Tab = (props) => {
  const { title, isActive, onClick, pendingTasksCount, onEditTitle } = props;
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

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef.current.blur();
    } else if (e.key === "Escape") {
      setInputValue(title);
      setEditing(false);
    }
  };

  return editing ? (
    <input
      ref={inputRef}
      className={`tab tab-edit-input${isActive ? " active" : ""}`}
      value={inputValue}
      onChange={(event) => setInputValue(capitalize(event.target.value))}
      onBlur={handleInputBlur}
      onKeyDown={handleInputKeyDown}
      style={{ position: "relative" }}
    />
  ) : (
    <button
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
    </button>
  );
};

export default Tab;
