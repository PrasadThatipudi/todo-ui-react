import { useState } from "react";
import "../styles/login.css";
import API from "../api.jsx";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await API.login(username, password);
        onLogin(username);
      } else {
        await API.signup(username, password);
        setSignupSuccess(true);
        setMode("login");
        setPassword("");
        setError("");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">
          {mode === "login" ? "Sign In" : "Sign Up"}
        </h2>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="login-error">{error}</div>}
        {signupSuccess && mode === "login" && (
          <div className="login-success">
            Signup successful! Please log in.
          </div>
        )}
        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
        </button>
        <div style={{ textAlign: "center", marginTop: "0.7em" }}>
          {mode === "login" ? (
            <span>
              Don't have an account?{" "}
              <button
                type="button"
                className="login-link"
                onClick={() => {
                  setMode("signup");
                  setSignupSuccess(false);
                  setError("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#222",
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: 0,
                }}
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                className="login-link"
                onClick={() => {
                  setMode("login");
                  setSignupSuccess(false);
                  setError("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#222",
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: 0,
                }}
              >
                Log in
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
