import Input from "./components/input";
import "./styles/App.css";
import TaskContainer from "./components/task-container.jsx";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    { description: "Task 1", done: false },
    { description: "Task 2", done: true },
  ]);

  return (
    <div>
      <Input
        onSubmit={(description) =>
          setTasks((prev) => [...prev, { description, done: false }])
        }
      />

      <TaskContainer tasks={tasks} />
    </div>
  );
}

export default App;
