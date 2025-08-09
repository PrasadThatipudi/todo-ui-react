import TabBar from "./tab-bar.jsx";
import TaskContainer from "./task-container.jsx";
import { useState, useEffect } from "react";
import { reducer } from "../reducer.jsx";
import "../styles/index.css";
import { useThunkReducer } from "../useThunkReducer.jsx";
import { useHotkeys } from "react-hotkeys-hook";

const TodoApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [todos, controlledDispatch] = useThunkReducer(reducer, []);

  useEffect(() => {
    controlledDispatch({ type: "LOAD-TODOS" });
  }, []);

  // Shortcut: Ctrl+N -> New todo (simulate clicking + button)
  useHotkeys("ctrl+n", () => {
    const addButton = document.querySelector(".tab-bar__add-btn");
    if (addButton) {
      addButton.click();
    }
  }, { enableOnFormTags: ["INPUT", "TEXTAREA"] });

  // Shortcut: k -> Focus on task input field
  useHotkeys("k", (event) => {
    event.preventDefault(); // Prevent the 'k' from being typed
    const taskInput = document.querySelector(".task-container .input");
    if (taskInput) {
      taskInput.focus();
    }
  });

  // Shortcut: Escape -> Remove focus from any input field
  useHotkeys("Escape", () => {
    if (document.activeElement && 
        (document.activeElement.tagName === 'INPUT' || 
         document.activeElement.tagName === 'TEXTAREA')) {
      document.activeElement.blur();
    }
  }, { enableOnFormTags: ["INPUT", "TEXTAREA"] });

  // Shortcut: h -> Go to left tab (previous tab, wraps to last tab)
  const nextLeftTab = (activeTabIndex, totalTabs) =>
    (activeTabIndex - 1 + totalTabs) % totalTabs;

  useHotkeys(
    "h,ArrowLeft,BracketLeft",
    (event) => {
      event.preventDefault();
      if (todos.length > 0) {
        setActiveTab(nextLeftTab(activeTab, todos.length));
      }
    },
    { enableOnFormTags: ["INPUT", "TEXTAREA"] }
  );

  // Shortcut: l -> Go to right tab (next tab, wraps to first tab)
  const nextRightTab = (activeTabIndex, totalTabs) =>
    (activeTabIndex + 1) % totalTabs;

  useHotkeys(
    "l,ArrowRight,BracketRight",
    (event) => {
      event.preventDefault();
      setActiveTab(nextRightTab(activeTab, todos.length));
    },
    { enableOnFormTags: ["INPUT", "TEXTAREA"] }
  );

  // Shortcut: 1,2,3,4,5,6,7,8 -> Go to respective tab (index + 1)
  const goToTabByNumber = (keyNumber, totalTabs) => {
    const tabIndex = keyNumber - 1; // Convert 1-based to 0-based index
    return tabIndex < totalTabs ? tabIndex : null; // Return null if tab doesn't exist
  };

  useHotkeys(
    "1,2,3,4,5,6,7,8",
    (event) => {
      event.preventDefault();
      const keyNumber = parseInt(event.key);
      const targetTab = goToTabByNumber(keyNumber, todos.length);
      if (targetTab !== null) {
        setActiveTab(targetTab);
      }
    },
    { enableOnFormTags: ["INPUT", "TEXTAREA"] }
  );

  // Shortcut: 9 -> Go to last tab
  const getLastTabIndex = (totalTabs) => totalTabs - 1;

  useHotkeys(
    "9",
    (event) => {
      event.preventDefault();
      if (todos.length > 0) {
        setActiveTab(getLastTabIndex(todos.length));
      }
    },
    { enableOnFormTags: ["INPUT", "TEXTAREA"] }
  );

  // Shortcut: Left Arrow -> Navigate to previous tab, Right Arrow -> Navigate to next tab

  return (
    <div className="app-layout">
      <div className="app-shell">
        <div className="app-tabs">
          <TabBar
            titles={todos.map(({ title, todo_id }) => ({ title, todo_id }))}
            pendingTasksCounts={todos.map(
              (todo) => todo.tasks.filter((task) => !task.done).length
            )}
            setActiveTab={(index) => setActiveTab(index)}
            activeTabIndex={activeTab}
            placeholder="New Todo"
            addTab={(title) =>
              controlledDispatch({ type: "ADD-TODO", payload: { title } })
            }
            todos={todos}
            dispatch={controlledDispatch}
          />
        </div>
        <div className="app-tasks">
          {todos.length === 0 ? (
            <div className="no-todos">No Todos Available!</div>
          ) : (
            <TaskContainer
              tasks={todos[activeTab]?.tasks || []}
              dispatch={controlledDispatch}
              todoId={todos[activeTab]?.todo_id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
