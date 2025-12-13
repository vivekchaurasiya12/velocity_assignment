import "./Login.css";
import LoginImage from "../assets/login.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }


      localStorage.setItem("token", data.token);

      alert("Login successful");
      navigate("/dashboard");
     

      // redirect example
      // navigate("/dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Section */}
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Login</h2>
        <p className="login-subtitle">
          Enter your details to login into the system.
        </p>

        <label>Email / Username</label>
        <input
          type="email"
          placeholder="Enter your email / username"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <a href="#" className="forgot">Forgot Password?</a>

        {error && <p className="error-text">{error}</p>}

        <button className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      
      <div className="login-image">
        <img src={LoginImage} width="80%" alt="Login Illustration" />
      </div>
    </div>
  );
}
