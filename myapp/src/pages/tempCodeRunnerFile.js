import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Loginregister.css";  // Import the CSS file

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", firstName: "", lastName: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:8080/api/auth/login"
      : "http://localhost:8080/api/auth/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Store JWT Token
        alert(isLogin ? "Login Successful!" : "Registration Successful!");
        console.log("JWT Token:", data.token);
        navigate("/"); // Redirect to home page after login/register
      } else {
        alert(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="login-register-container">
      <div className="login-register-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </>
          )}
          <button>{isLogin ? "Login" : "Register"}</button>
        </form>
        <div className="toggle-form" onClick={toggleForm}>
          {isLogin ? "New user? Register here" : "Already have an account? Login"}
        </div>
        <Link to="/" className="home-link">Back to Home</Link>
      </div>
    </div>
  );
}

export default LoginRegister;