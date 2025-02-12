import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    
    const requestData = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.firstName,  
            lastName: formData.lastName, 
            email: formData.email,
            password: formData.password
        };

    const url = isLogin
        ? "http://localhost:8080/api/auth/login"
        : "http://localhost:8080/api/auth/register";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        });

        let data;
        try {
            data = await response.json();  
        } catch {
            data = { message: await response.text() };
        }

        if (response.ok) {
            localStorage.setItem("token", data.token);
            alert(isLogin ? "Login Successful!" : "Registration Successful!");
            console.log("JWT Token:", data.token);
            navigate("/");
        } else {
            alert(`Error: ${data.message || "Something went wrong"}`);
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        alert("Network error. Please try again.");
    }
  };
  
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#7ca0e9"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        width: "400px",
        textAlign: "center"
      }}>
        <h2 style={{ color: "black" }}>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
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
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px"
                }}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px"
                }}
              />
            </>
          )}
          <button type="submit" style={{
            width: "100%",
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease"
          }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div style={{
          marginTop: "10px",
          color: "#007bff",
          cursor: "pointer",
          textDecoration: "underline"
        }} onClick={toggleForm}>
          {isLogin ? "New user? Register here" : "Already have an account? Login"}
        </div>
        <Link to="/Home" style={{
          marginTop: "15px",
          display: "block",
          color: "#555",
          textDecoration: "underline"
        }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default LoginRegister;
