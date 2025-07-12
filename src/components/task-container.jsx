import Task from "./task";
import Input from "./input";

const TaskContainer = (props) => {
  const { todoId, dispatch, tasks } = props;
  return (
    <div className="task-container">
      <Input
        className="input-row"
        onSubmit={(description) => {
          dispatch({
            type: "ADD-TASK",
            payload: { description, todoId },
          });
        }}
      />
      <div className="task-list">
        {tasks.map((task, index) => (
          <Task
            key={index}
            className="task"
            description={task.description}
            done={task.done}
            toggleTask={() =>
              dispatch({
                type: "TOGGLE-TASK",
                payload: { todoId, taskId: task.task_id },
              })
            }
            deleteTask={() =>
              dispatch({
                type: "DELETE-TASK",
                payload: { todoId, taskId: task.task_id },
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default TaskContainer;
