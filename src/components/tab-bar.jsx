import AddingTab from "./adding-tab.jsx";
import Tab from "./tab.jsx";
import { useState } from "react";

const TabBar = (props) => {
  const {
    titles,
    addTab,
    activeTabIndex,
    setActiveTab,
    placeholder,
    pendingTasksCounts,
  } = props;
  const [isAddingNewTab, setIsAddingNewTab] = useState(false);

  return (
    <div className="tab-bar">
      {titles.map((title, index) => (
        <Tab
          key={index}
          title={title}
          isActive={index === activeTabIndex}
          onClick={() => setActiveTab(index)}
          pendingTasksCount={pendingTasksCounts[index]}
          onEditTitle={(title) => alert(`Edit title: ${title}`)}
        />
      ))}
      {isAddingNewTab && (
        <AddingTab
          onCloseAddingTab={() => {
            setIsAddingNewTab(false);
            setActiveTab(titles.length);
          }}
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
