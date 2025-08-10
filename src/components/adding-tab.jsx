import { useState } from "react";

const AddingTab = (props) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      props.addTab(title.trim());
      props.onCloseAddingTab();
      setTitle("");
    }
  };

  const handleCancel = () => {
    props.onCloseAddingTab();
    setTitle("");
  };

  const handleKeyDown = (event) => {
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
      setTitle(newValue);

      // Position cursor after the opening character
      setTimeout(() => {
        input.setSelectionRange(start + 1, start + 1);
      }, 0);
      
      return; // Don't process other key handlers
    }

    // Handle Enter and Escape
    if (event.key === "Enter") {
      handleSubmit();
    } else if (event.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <input
      className="tab"
      type="text"
      placeholder={props.placeholder || "New Tab"}
      onChange={(e) => {
        // Apply trimming: remove leading spaces and replace multiple spaces with single space
        const trimmed = e.target.value.trimStart().replace(/\s+/g, " ");
        setTitle(trimmed);
      }}
      onKeyDown={handleKeyDown}
      value={title}
      autoFocus={true}
    />
  );
};

export default AddingTab;
