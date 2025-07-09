import Tab from "./tab.jsx";

function TabBar(props) {
  const { allTitles, setActiveTab } = props;

  return (
    <div className="tab-bar">
      {allTitles.map((title, idx) => (
        <Tab key={idx} title={title} onClick={() => setActiveTab(idx)}>
          {title}
        </Tab>
      ))}
      <button className="tab-bar__add-btn">+</button>
    </div>
  );
}

export default TabBar;
