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
            onDeleteTodo={() => {
              // Handle active tab update before deletion
              const currentActiveTab = activeTabIndex;
              const deletedTabIndex = index;

              // Calculate new active tab index after deletion
              let newActiveTab = currentActiveTab;

              if (deletedTabIndex < currentActiveTab) {
                // Deleted tab is before active tab, shift active tab index down
                newActiveTab = currentActiveTab - 1;
              } else if (deletedTabIndex === currentActiveTab) {
                // Deleted tab is the active tab
                if (titles.length === 1) {
                  // This is the last tab, no tabs will remain
                  newActiveTab = -1;
                } else if (deletedTabIndex === titles.length - 1) {
                  // Deleted tab is the last tab, move to previous tab
                  newActiveTab = deletedTabIndex - 1;
                } else {
                  // Move to the next tab (which will slide into current position)
                  newActiveTab = deletedTabIndex;
                }
              }

              // Update active tab before dispatching delete
              if (newActiveTab !== currentActiveTab && newActiveTab >= 0) {
                setActiveTab(newActiveTab);
              }

              // Dispatch the delete action
              dispatch({
                type: "DELETE-TODO",
                payload: { todoId: todo_id },
              });
            }}
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
