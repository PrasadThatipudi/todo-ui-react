import Tab from "./tab.jsx";

const TabBar = (props) => {
  return (
    <div className="tab-bar">
      {props.titles.map((title, index) => (
        <Tab
          key={index}
          title={title}
          onClick={() => props.setActiveTab(index)}
        >
          {title}
        </Tab>
      ))}
      <button
        className="tab-bar__add-btn"
        onClick={() =>
          props.dispatch({ type: "ADD-TODO", payload: { title: "New Tab" } })
        }
      >
        +
      </button>
    </div>
  );
};

export default TabBar;
