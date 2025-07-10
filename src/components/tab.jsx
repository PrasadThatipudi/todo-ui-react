const Tab = (props) => {
  const { title, isActive } = props;

  return (
    <button
      type="button"
      className={`tab ${isActive ? " active" : ""}`}
      onClick={props.onClick}
    >
      {title}
    </button>
  );
};

export default Tab;
