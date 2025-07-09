import Tab from "./tab.jsx";

const TabBar = (props) => {
  const { titles, addTab, setActiveTab } = props;
  return (
    <div className="tab-bar">
      {titles.map((title, index) => (
        <Tab key={index} title={title} onClick={() => setActiveTab(index)}>
          {title}
        </Tab>
      ))}
      <button
        className="tab-bar__add-btn"
        onClick={() => {
          const newTitle = prompt("Enter new tab title:");
          if (newTitle.trim() && !titles.includes(newTitle)) {
            addTab(newTitle);
          }
        }}
      >
        +
      </button>
    </div>
  );
};

export default TabBar;
