import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const AddingTab = (props) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title) {
      props.addTab(title.trimEnd());
      props.onCloseAddingTab();
      setTitle("");
    }
  };

  const handleCancel = () => {
    props.onCloseAddingTab();
    setTitle("");
  };

  // Hotkey definitions
  useHotkeys("enter", handleSubmit, {
    enableOnFormTags: ["input"],
  });

  useHotkeys("escape", handleCancel, {
    enableOnFormTags: ["input"],
  });

  const trim = (str) => str.trimStart().replace(/\s+/g, " ");

  return (
    <input
      className="tab"
      type="text"
      placeholder={props.placeholder || "New Tab"}
      onChange={(e) => setTitle(trim(e.target.value))}
      value={title}
      autoFocus={true}
    />
  );
};

export default AddingTab;
