import TabBar from "./tab-bar.jsx";
import TaskContainer from "./task-container.jsx";
import { useState, useEffect } from "react";
import { reducer } from "../reducer.jsx";
import "../styles/index.css";
import { useThunkReducer } from "../useThunkReducer.jsx";

const TodoApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [todos, dispatch] = useThunkReducer(reducer, []);

  useEffect(() => {
    dispatch({ type: "LOAD-TODOS" });
  }, []);

  return (
    <div className="app-layout">
      <div className="app-shell">
        <div className="app-tabs">
          <TabBar
            titles={todos.map((todo) => todo.title) || []}
            setActiveTab={(index) => setActiveTab(index)}
            addTab={(title) =>
              dispatch({ type: "ADD-TODO", payload: { title } })
            }
          />
        </div>
        <div className="app-tasks">
          <TaskContainer
            tasks={todos[activeTab]?.tasks || []}
            dispatch={dispatch}
            todoId={activeTab}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
