import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./components/todo-app.jsx";
import Login from "./components/login.jsx";

function Root() {
  const [user, setUser] = useState(null);
  return user ? <App /> : <Login onLogin={setUser} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
