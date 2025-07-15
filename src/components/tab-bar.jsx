import AddingTab from "./adding-tab.jsx";
import Tab from "./tab.jsx";
import { useState } from "react";

const TabBar = (props) => {
  const { titles, addTab, setActiveTab, placeholder } = props;
  const [isAddingNewTab, setIsAddingNewTab] = useState(false);

  return (
    <div className="tab-bar">
      {titles.map((title, index) => (
        <Tab key={index} title={title} onClick={() => setActiveTab(index)}>
          {title}
        </Tab>
      ))}
      {isAddingNewTab && (
        <AddingTab
          onCloseAddingTab={() => setIsAddingNewTab(false)}
          addTab={addTab}
          placeholder={placeholder}
        />
      )}
      <button
        type="button"
        className="tab-bar__add-btn"
        onClick={() => setIsAddingNewTab(true)}
      >
        +
      </button>
    </div>
  );
};

export default TabBar;
