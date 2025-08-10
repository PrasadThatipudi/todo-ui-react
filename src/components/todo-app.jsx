import TabBar from "./tab-bar.jsx";
import TaskContainer from "./task-container.jsx";
import { useState, useEffect, useRef } from "react";
import { reducer } from "../reducer.jsx";
import "../styles/index.css";
import { useThunkReducer } from "../useThunkReducer.jsx";
import { useHotkeys } from "react-hotkeys-hook";

const TodoApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [todos, controlledDispatch] = useThunkReducer(reducer, []);
  const [hasTaskFocus, setHasTaskFocus] = useState(false);
  const [wasInputFocusedBeforeNavigation, setWasInputFocusedBeforeNavigation] = useState(false);
  const clearTaskFocusRef = useRef(null);

  useEffect(() => {
    controlledDispatch({ type: "LOAD-TODOS" });
  }, []);

  // Shortcut: Ctrl+T -> New todo (simulate clicking + button)
  useHotkeys(
    "ctrl+t",
    () => {
      const addButton = document.querySelector(".tab-bar__add-btn");
      if (addButton) {
        addButton.click();
      }
    },
    { enableOnFormTags: ["INPUT", "TEXTAREA"] }
  );

  // Shortcut: i -> Focus on task input field
  useHotkeys("i", (event) => {
    event.preventDefault(); // Prevent the 'i' from being typed
    const taskInput = document.querySelector(".task-container .input");
    if (taskInput) {
      taskInput.focus();
    }
  });

  // Shortcut: Escape -> Smart escape handling
  useHotkeys(
    "Escape",
    () => {
      const isInputFocused =
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA");

      if (isInputFocused && hasTaskFocus) {
        // If input is focused and task is focused, remove task focus only
        if (clearTaskFocusRef.current) {
          clearTaskFocusRef.current();
        }
      } else if (isInputFocused) {
        // If input is focused but no task focus, remove input focus
        document.activeElement.blur();
      } else if (hasTaskFocus) {
        // If not on input but task is focused, remove task focus
        if (clearTaskFocusRef.current) {
          clearTaskFocusRef.current();
        }
        
        // Restore input focus if it was focused before navigation
        if (wasInputFocusedBeforeNavigation) {
          const taskInput = document.querySelector(".task-container .input");
          if (taskInput) {
            taskInput.focus();
          }
          setWasInputFocusedBeforeNavigation(false); // Reset the flag
        }
      }
    },
    { enableOnFormTags: ["INPUT", "TEXTAREA"] }
  );

  // Shortcut: h -> Go to left tab (previous tab, wraps to last tab)
  const nextLeftTab = (activeTabIndex, totalTabs) =>
    (activeTabIndex - 1 + totalTabs) % totalTabs;

  useHotkeys("h,ArrowLeft,BracketLeft", (event) => {
    event.preventDefault();
    if (todos.length > 0) {
      setActiveTab(nextLeftTab(activeTab, todos.length));
    }
  });

  // Shortcut: l -> Go to right tab (next tab, wraps to first tab)
  const nextRightTab = (activeTabIndex, totalTabs) =>
    (activeTabIndex + 1) % totalTabs;

  useHotkeys("l,ArrowRight,BracketRight", (event) => {
    event.preventDefault();
    setActiveTab(nextRightTab(activeTab, todos.length));
  });

  // Shortcut: 1,2,3,4,5,6,7,8 -> Go to respective tab (index + 1)
  const goToTabByNumber = (keyNumber, totalTabs) => {
    const tabIndex = keyNumber - 1; // Convert 1-based to 0-based index
    return tabIndex < totalTabs ? tabIndex : null; // Return null if tab doesn't exist
  };

  useHotkeys("1,2,3,4,5,6,7,8", (event) => {
    event.preventDefault();
    const keyNumber = parseInt(event.key);
    const targetTab = goToTabByNumber(keyNumber, todos.length);
    if (targetTab !== null) {
      setActiveTab(targetTab);
    }
  });

  // Shortcut: 9 -> Go to last tab
  const getLastTabIndex = (totalTabs) => totalTabs - 1;

  useHotkeys("9", (event) => {
    event.preventDefault();
    if (todos.length > 0) {
      setActiveTab(getLastTabIndex(todos.length));
    }
  });

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
              onTaskFocusChange={setHasTaskFocus}
              clearTaskFocusRef={clearTaskFocusRef}
              onInputFocusStateChange={setWasInputFocusedBeforeNavigation}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
