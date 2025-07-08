function Task(props) {
  return (
    <div className="task">
      <p>{props.description}</p>
      <button>Delete</button>
    </div>
  );
}

export default Task;
