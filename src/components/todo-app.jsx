import TabBar from "./tab-bar.jsx";
import TaskContainer from "./task-container.jsx";
import { useState, useReducer } from "react";
import "../styles/index.css";
import reducer from "../reducer.jsx";

const TodoApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [todos, dispatch] = useReducer(reducer, [
    {
      id: 0,
      title: "Shopping",
      tasks: [{ id: 0, description: "Buy a jeans", done: false }],
    },
    { id: 1, title: "Work", tasks: [] },
  ]);

  return (
    <div className="app-layout">
      <div className="app-shell">
        <div className="app-tabs">
          <TabBar
            titles={todos.map((todo) => todo.title)}
            setActiveTab={(index) => setActiveTab(index)}
            dispatch={dispatch}
          />
        </div>
        <div className="app-tasks">
          <TaskContainer tasks={todos[activeTab].tasks} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
