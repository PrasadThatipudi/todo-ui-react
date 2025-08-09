import { useState, useEffect } from "react";
import "../styles/login.css";
import API from "../api.jsx";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [],
    isValid: false,
  });

  // Add body class when login component mounts, remove when unmounts
  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  // Password strength validation
  const validatePassword = (password) => {
    const requirements = [
      { test: password.length >= 8, text: "At least 8 characters" },
      { test: /[A-Z]/.test(password), text: "At least one uppercase letter" },
      { test: /[a-z]/.test(password), text: "At least one lowercase letter" },
      { test: /\d/.test(password), text: "At least one number" },
      {
        test: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        text: "At least one special character",
      },
    ];

    const passedTests = requirements.filter((req) => req.test);
    const failedTests = requirements.filter((req) => !req.test);

    // Show only the first unmet requirement
    const nextRequirement = failedTests.length > 0 ? [failedTests[0].text] : [];

    return {
      score: passedTests.length,
      feedback: nextRequirement,
      isValid: passedTests.length === requirements.length,
    };
  };

  // Get strength label from score
  const getStrengthLabel = (score) => {
    switch (score) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      case 5:
        return "Very Strong";
      default:
        return "Weak";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    // Validate password strength for signup
    if (mode === "signup") {
      const strength = validatePassword(password);
      if (!strength.isValid) {
        setError("Password requirements not met.");
        return;
      }
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
        setPasswordStrength({ score: 0, feedback: [], isValid: false });
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
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            const newPassword = e.target.value.trim();
            setPassword(newPassword);
            if (mode === "signup") {
              setPasswordStrength(validatePassword(newPassword));
            }
          }}
        />

        {/* Password strength indicator for signup */}
        {mode === "signup" && password && (
          <>
            {passwordStrength.feedback.length > 0 && (
              <div className="password-feedback-simple">
                {passwordStrength.feedback[0]}
                <span
                  className={`strength-indicator strength-${passwordStrength.score}`}
                >
                  {getStrengthLabel(passwordStrength.score)}
                </span>
              </div>
            )}
            {passwordStrength.isValid && (
              <div className="password-valid-simple">
                ✓ Password meets all requirements
                <span className="strength-indicator strength-5">
                  Very Strong
                </span>
              </div>
            )}
          </>
        )}
        {error && <div className="login-error">{error}</div>}
        {signupSuccess && mode === "login" && (
          <div className="login-success">Signup successful! Please log in.</div>
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
