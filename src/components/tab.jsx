const Tab = (props) => {
  const { title, isActive, onClick, onDoubleClick } = props;

  return (
    <button
      type="button"
      className={`tab ${isActive ? " active" : ""}`}
      onDoubleClick={onDoubleClick}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Tab;
