import Task from "./task";

function TaskContainer(props) {
  return (
    <div>
      {props.tasks.map((task, index) => (
        <Task key={index} description={task.description} done={task.done} />
      ))}
    </div>
  );
}

export default TaskContainer;
