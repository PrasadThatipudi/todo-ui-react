import "../styles/task.css";

const Task = (props) => {
  const { done, description, priority, toggleTask, deleteTask } = props;

  const renderPriorityBadges = (priority) => {
    if (!priority || priority === 0) return null;
    
    const badges = [];
    if (priority & 1) { // Check if important (priority includes 1)
      badges.push(
        <span key="imp" className="priority-badge priority-important">
          imp
        </span>
      );
    }
    if (priority & 2) { // Check if urgent (priority includes 2)
      badges.push(
        <span key="urg" className="priority-badge priority-urgent">
          urg
        </span>
      );
    }
    return badges;
  };

  return (
    <div className="task" onClick={() => toggleTask()}>
      <span className={`task-desc ${done ? "done" : "undone"}`}>
        {description}
      </span>
      <div className="task-priority">
        {renderPriorityBadges(priority)}
      </div>
      <button type="button" className="task-delete-btn" onClick={deleteTask}>
        Delete
      </button>
    </div>
  );
};

export default Task;
