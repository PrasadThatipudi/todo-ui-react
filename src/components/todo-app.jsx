import TabBar from "./tab-bar.jsx";
import TaskContainer from "./task-container.jsx";
import { useState } from "react";
import "../styles/index.css";

function TodoApp() {
  const [activeTab, setActiveTab] = useState(0);
  const [todos, setTodos] = useState([
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
          <TabBar allTitles={todos.map((todo) => todo.title)} />
        </div>
        <div className="app-tasks">
          <TaskContainer tasks={todos[activeTab].tasks} />
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
