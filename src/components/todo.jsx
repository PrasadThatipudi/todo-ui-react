import TaskContainer from "./task-container";
import Input from "./input";

const Todo = (props) => {
  return (
    <div>
      <Input onSubmit={props.addTask} />

      <TaskContainer tasks={props.tasks} />
    </div>
  );
};

export default Todo;
