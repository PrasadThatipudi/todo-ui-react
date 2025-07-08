import TabBar from "./components/tab-bar.jsx";
import TaskContainer from "./components/task-container";
import { useState } from "react";

function App() {
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
    <div>
      <h1>Todo App</h1>
      <TabBar allTitles={todos.map((todo) => todo.title)} />
      <TaskContainer tasks={todos[activeTab].tasks} />
    </div>
  );
}

export default App;
