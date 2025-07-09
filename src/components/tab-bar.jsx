import Tab from "./tab.jsx";
import "../styles/tab-bar.css";

function TabBar(props) {
  const { allTitles, activeTab, setActiveTab } = props;

  return (
    <div className="tab-bar">
      {allTitles.map((title, idx) => (
        <button
          key={idx}
          className={`tab${activeTab === idx ? " active" : ""}`}
          onClick={() => setActiveTab(idx)}
        >
          {title}
        </button>
      ))}
      <button className="tab-bar__add-btn">+</button>
    </div>
  );
}

export default TabBar;
