import "./../styles/task.css";

function Task(props) {
  return (
    <div className="task">
      <p className={props.done ? "done" : "undone"}>{props.description}</p>
      <button>Delete</button>
    </div>
  );
}

export default Task;
