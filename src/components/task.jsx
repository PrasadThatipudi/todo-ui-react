import "./../styles/task.css";

function Task(props) {
  const { done, description } = props;
  return (
    <div className="task">
      <p className={done ? "done" : "undone"}>{description}</p>
      <button>Delete</button>
    </div>
  );
}

export default Task;
