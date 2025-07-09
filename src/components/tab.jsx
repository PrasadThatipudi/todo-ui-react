function Tab(props) {
  const { title, isActive } = props;
  return <button className={`tab${isActive ? " active" : ""}`}>{title}</button>;
}

export default Tab;
