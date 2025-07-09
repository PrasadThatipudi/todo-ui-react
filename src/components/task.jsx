import "../styles/task.css";

function Task(props) {
  const { done, description } = props;
  return (
    <div className="task">
      <span className={`task-desc ${done ? "done" : "undone"}`}>
        {description}
      </span>
      <button className="task-delete-btn">Delete</button>
    </div>
  );
}

export default Task;
