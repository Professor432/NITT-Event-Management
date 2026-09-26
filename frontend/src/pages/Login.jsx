import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary login logic
    // We will replace this with real authentication later.

    if (email === "admin@nitt.edu" && password === "admin123") {
      navigate("/admin/dashboard");
    } else if (email === "user@nitt.edu" && password === "user123") {
      navigate("/user/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-header">
          <h1>NITT</h1>
          <h2>Event Management System</h2>
          <p>Welcome back! Please login to continue.</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

        </form>

        <div className="demo-credentials">
          <p><strong>Demo User:</strong> user@nitt.edu / user123</p>
          <p><strong>Demo Admin:</strong> admin@nitt.edu / admin123</p>
        </div>

      </div>
    </div>
  );
}

export default Login;