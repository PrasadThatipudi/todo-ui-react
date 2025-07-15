import TabBar from "./tab-bar.jsx";
import TaskContainer from "./task-container.jsx";
import { useState, useEffect } from "react";
import { reducer } from "../reducer.jsx";
import "../styles/index.css";
import { useThunkReducer } from "../useThunkReducer.jsx";

const TodoApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [todos, controlledDispatch] = useThunkReducer(reducer, []);

  useEffect(() => {
    controlledDispatch({ type: "LOAD-TODOS" });
  }, []);

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
              todoId={activeTab}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
