import "./styles/App.css";
import Todo from "./components/todo.jsx";

function App() {
  const tasks = [
    { description: "Learn React", done: false },
    { description: "Build a Todo App", done: false },
  ];

  return <Todo tasks={tasks} />;
}

export default App;
