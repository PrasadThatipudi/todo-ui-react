import Input from "./components/input";
import "./styles/App.css";
import Task from "./components/task.jsx";
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

      <div>
        {tasks.map((task, index) => (
          <Task key={index} description={task.description} done={task.done} />
        ))}
      </div>
    </div>
  );
}

export default App;
