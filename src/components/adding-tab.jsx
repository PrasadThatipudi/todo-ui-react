import { useState } from "react";

const AddingTab = (props) => {
  const [title, setTitle] = useState("");

  const trim = (str) => str.trimStart().replace(/\s+/g, " ");

  return (
    <input
      className="tab"
      type="text"
      placeholder={props.placeholder || "New Tab"}
      onKeyDown={(event) => {
        if (event.key === "Enter" && title) {
          props.addTab(title.trimEnd());
          props.onCloseAddingTab();
          setTitle("");
        } else if (event.key === "Escape") {
          props.onCloseAddingTab();
          setTitle("");
        }
      }}
      onChange={(e) => setTitle(trim(e.target.value))}
      value={title}
      autoFocus={true}
    />
  );
};

export default AddingTab;
