import AddingTab from "./adding-tab.jsx";
import Tab from "./tab.jsx";
import { useEffect, useRef, useState } from "react";

const TabBar = (props) => {
  const {
    titles,
    addTab,
    activeTabIndex,
    setActiveTab,
    placeholder,
    pendingTasksCounts,
    dispatch,
  } = props;
  const [isAddingNewTab, setIsAddingNewTab] = useState(false);
  const addTabButtonRef = useRef(null);
  const addingTabInputRef = useRef(null);

  useEffect(() => {
    if (!isAddingNewTab || !addTabButtonRef.current) return;

    addTabButtonRef.current.scrollLeft =
      addTabButtonRef.current.parentElement.scrollWidth;
  }, [isAddingNewTab]);

  useEffect(() => {
    const handleClickOutside = () => setIsAddingNewTab(false);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAddingNewTab]);

  return (
    <div className="tab-bar">
      {titles.map(({ title, todo_id }, index) => (
        <Tab
          key={index}
          title={title}
          isActive={index === activeTabIndex}
          onClick={() => setActiveTab(index)}
          pendingTasksCount={pendingTasksCounts[index]}
          onEditTitle={(newTodoTitle) =>
            dispatch({
              type: "EDIT-TODO-TITLE",
              payload: { todo_id, title: newTodoTitle },
            })
          }
        />
      ))}
      {isAddingNewTab && (
        <AddingTab
          ref={addingTabInputRef}
          onCloseAddingTab={() => {
            setIsAddingNewTab(false);
          }}
          addTab={(title) => {
            addTab(title);
            setActiveTab(titles.length);
          }}
          placeholder={placeholder}
        />
      )}
      <button
        ref={addTabButtonRef}
        type="button"
        className="tab-bar__add-btn"
        onClick={() => {
          setIsAddingNewTab(true);
        }}
      >
        +
      </button>
    </div>
  );
};

export default TabBar;
