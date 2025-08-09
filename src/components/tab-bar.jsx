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
  const tabBarRef = useRef(null);
  const activeTabRef = useRef(null);

  useEffect(() => {
    if (!isAddingNewTab || !addTabButtonRef.current) return;

    addTabButtonRef.current.scrollLeft =
      addTabButtonRef.current.parentElement.scrollWidth;
  }, [isAddingNewTab]);

  // Auto-scroll active tab into view when activeTabIndex changes
  useEffect(() => {
    if (activeTabRef.current && tabBarRef.current) {
      const tabElement = activeTabRef.current;
      const containerElement = tabBarRef.current;

      // Get element positions
      const tabRect = tabElement.getBoundingClientRect();
      const containerRect = containerElement.getBoundingClientRect();

      // Check if tab is fully visible
      const isTabFullyVisible =
        tabRect.left >= containerRect.left &&
        tabRect.right <= containerRect.right;

      // Only scroll if tab is not fully visible
      if (!isTabFullyVisible) {
        tabElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
  }, [activeTabIndex]);

  useEffect(() => {
    const handleClickOutside = () => setIsAddingNewTab(false);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAddingNewTab]);

  return (
    <div className="tab-bar-wrapper">
      <div className="tab-bar" ref={tabBarRef}>
        {titles.map(({ title, todo_id }, index) => (
          <Tab
            key={index}
            ref={index === activeTabIndex ? activeTabRef : null}
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
      </div>
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
