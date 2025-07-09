import Task from "./task";
import Input from "./input";

function TaskContainer(props) {
  return (
    <div className="task-container">
      <Input
        className="input-row"
        onSubmit={(...args) => console.log(...args)}
      />
      <div className="task-list">
        {props.tasks.map((task, index) => (
          <Task
            key={index}
            className="task"
            description={task.description}
            done={task.done}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskContainer;
