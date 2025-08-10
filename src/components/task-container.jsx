import Task from "./task.jsx";
import Input from "./input.jsx";

const TaskContainer = (props) => {
  const { todoId, dispatch, tasks } = props;
  console.log(
    "TaskContainer rendered with todoId:",
    todoId,
    "and tasks:",
    tasks
  );
  return (
    <div className="task-container">
      <Input
        className="input-row"
        onSubmit={(description, priority) => {
          dispatch({
            type: "ADD-TASK",
            payload: { description, priority, todoId },
          });
        }}
      />
      <div className="task-list">
        {tasks.map((task) => (
          <Task
            key={task.task_id}
            className="task"
            description={task.description}
            done={task.done}
            priority={task.priority || 0}
            toggleTask={() =>
              dispatch({
                type: "TOGGLE-TASK",
                payload: { todoId, taskId: task.task_id },
              })
            }
            deleteTask={(event) => {
              event.stopPropagation();

              dispatch({
                type: "DELETE-TASK",
                payload: { todoId, taskId: task.task_id },
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskContainer;
