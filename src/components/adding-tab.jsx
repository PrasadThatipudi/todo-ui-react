import { useState } from "react";

const AddingTab = (props) => {
  const [title, setTitle] = useState("");

  return (
    <input
      className="tab"
      type="text"
      placeholder={props.placeholder || "New Tab"}
      onKeyDown={(event) => {
        if (event.key === "Enter" && title.trim()) {
          props.addTab(title.trim());
          props.onCloseAddingTab();
        } else if (event.key === "Escape") {
          props.onCloseAddingTab();
        }
      }}
      onChange={(e) => setTitle(e.target.value)}
      value={title}
      autoFocus={true}
    />
  );
};

export default AddingTab;
