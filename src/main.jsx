import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./components/todo-app.jsx";
import Login from "./components/login.jsx";
import API from "./api.jsx";

function Root() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.fetchTodos()
      .then(() => setUser("session"))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  return user ? <App /> : <Login onLogin={setUser} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
