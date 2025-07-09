import "../styles/task.css";

const Task = (props) => {
  const { done, description, toggleTask, deleteTask } = props;

  return (
    <div className="task" onClick={() => toggleTask()}>
      <span className={`task-desc ${done ? "done" : "undone"}`}>
        {description}
      </span>
      <button className="task-delete-btn" onClick={deleteTask}>
        Delete
      </button>
    </div>
  );
};

export default Task;
