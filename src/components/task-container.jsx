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

  // Notify parent about input focus state
  const { onInputFocusStateChange } = props;

  // Navigation functions
  const navigateUp = () => {
    if (tasks.length === 0) return;

    // Check and store if input was focused before navigation
    const isInputFocused =
      document.activeElement &&
      (document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA");

    if (isInputFocused) {
      // Notify parent about input focus state change
      if (onInputFocusStateChange) {
        onInputFocusStateChange(true);
      }
      document.activeElement.blur();
    }

    const newIndex =
      focusedTaskIndex <= 0 ? tasks.length - 1 : focusedTaskIndex - 1;
    updateFocusedTaskIndex(newIndex);
  };

  const navigateDown = () => {
    if (tasks.length === 0) return;

    // Check and store if input was focused before navigation
    const isInputFocused =
      document.activeElement &&
      (document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA");

    if (isInputFocused) {
      // Notify parent about input focus state change
      if (onInputFocusStateChange) {
        onInputFocusStateChange(true);
      }
      document.activeElement.blur();
    }

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

  // Delete focused task
  const handleDeleteFocusedTask = (event) => {
    event.preventDefault();

    // Only delete if there's a focused task
    if (
      focusedTaskIndex !== -1 &&
      tasks.length > 0 &&
      tasks[focusedTaskIndex]
    ) {
      const taskToDelete = tasks[focusedTaskIndex];

      // Delete the task
      dispatch({
        type: "DELETE-TASK",
        payload: { todoId, taskId: taskToDelete.task_id },
      });

      // Adjust focus after deletion
      const newTaskCount = tasks.length - 1;
      if (newTaskCount === 0) {
        // No tasks left, clear focus
        updateFocusedTaskIndex(-1);
      } else if (focusedTaskIndex >= newTaskCount) {
        // If we deleted the last task, focus on the new last task
        updateFocusedTaskIndex(newTaskCount - 1);
      }
      // If we deleted a task in the middle, keep the same index (next task will slide up)
    }
  };

  useHotkeys(
    "Backspace,Delete,fn+delete,fn+backspace",
    handleDeleteFocusedTask,
    {
      enableOnFormTags: ["INPUT", "TEXTAREA"],
    }
  );

  // Toggle focused task
  const handleToggleFocusedTask = (event) => {
    event.preventDefault();
    
    console.log("Toggle key pressed!");
    console.log("focusedTaskIndex:", focusedTaskIndex);
    console.log("tasks.length:", tasks.length);
    
    // Only toggle if there's a focused task
    if (focusedTaskIndex !== -1 && tasks.length > 0 && tasks[focusedTaskIndex]) {
      const taskToToggle = tasks[focusedTaskIndex];
      console.log("Toggling task:", taskToToggle);
      
      // Toggle the task
      dispatch({
        type: "TOGGLE-TASK",
        payload: { todoId, taskId: taskToToggle.task_id },
      });
    } else {
      console.log("Cannot toggle - conditions not met:");
      console.log("focusedTaskIndex !== -1:", focusedTaskIndex !== -1);
      console.log("tasks.length > 0:", tasks.length > 0);
      console.log("tasks[focusedTaskIndex] exists:", !!tasks[focusedTaskIndex]);
    }
  };

  useHotkeys("d", handleToggleFocusedTask, {
    enableOnFormTags: ["INPUT", "TEXTAREA"],
  });

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
