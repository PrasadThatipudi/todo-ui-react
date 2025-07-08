import Tab from "./tab.jsx";

function TabBar(props) {
  return (
    <div>
      {props.allTitles.map((title) => (
        <Tab title={title} />
      ))}
      <button>+</button>
    </div>
  );
}

export default TabBar;
