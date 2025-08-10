import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Task from "./task.jsx";
import Input from "./input.jsx";

const TaskContainer = (props) => {
  const { todoId, dispatch, tasks, onTaskFocusChange } = props;
  const [focusedTaskIndex, setFocusedTaskIndex] = useState(-1); // -1 means no task focused

  // Notify parent when task focus changes
  const updateFocusedTaskIndex = (newIndex) => {
    setFocusedTaskIndex(newIndex);
    if (onTaskFocusChange) {
      onTaskFocusChange(newIndex !== -1);
    }
  };

  // Navigation functions
  const navigateUp = () => {
    if (tasks.length === 0) return;
    const newIndex =
      focusedTaskIndex <= 0 ? tasks.length - 1 : focusedTaskIndex - 1;
    updateFocusedTaskIndex(newIndex);
  };

  const navigateDown = () => {
    if (tasks.length === 0) return;
    const newIndex =
      focusedTaskIndex >= tasks.length - 1 ? 0 : focusedTaskIndex + 1;
    updateFocusedTaskIndex(newIndex);
  };

  // Expose clearTaskFocus to parent
  if (props.clearTaskFocusRef) {
    props.clearTaskFocusRef.current = () => updateFocusedTaskIndex(-1);
  }

  const handleNavigateDown = (event) => {
    event.preventDefault();
    navigateDown();
  };
  // Hotkeys for task navigation
  useHotkeys("j", handleNavigateDown);
  useHotkeys("ctrl+n,ArrowDown", handleNavigateDown, {
    enableOnFormTags: ["INPUT", "TEXTAREA"],
  });

  const handleNavigateUp = (event) => {
    event.preventDefault();
    navigateUp();
  };

  useHotkeys("k", handleNavigateUp);
  useHotkeys("ctrl+p,ArrowUp", handleNavigateUp, {
    enableOnFormTags: ["INPUT", "TEXTAREA"],
  });

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
        {tasks.map((task, index) => (
          <Task
            key={task.task_id}
            className="task"
            description={task.description}
            done={task.done}
            priority={task.priority || 0}
            isFocused={focusedTaskIndex === index}
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
