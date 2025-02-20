import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Paper, Typography, Box, Stack } from "@mui/material";


interface LoginRegisterProps {
  onLoginSuccess: () => void;
}

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginResponse {
  token: string;
  message?: string;
}

interface ErrorResponse {
  message: string;
}

function LoginRegister({ onLoginSuccess }: LoginRegisterProps) {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleForm = (): void => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", firstName: "", lastName: "" });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const requestData = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          name: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        };

    const url = isLogin
      ? "http://localhost:8080/api/auth/login"
      : "http://localhost:8080/api/auth/register";

    try {
      const response = await axios.post<LoginResponse>(url, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("token", response.data.token);

      window.dispatchEvent(new Event("authStateChange"));

      alert(isLogin ? "Login Successful!" : "Registration Successful!");
      onLoginSuccess();
      navigate("/read-all", { replace: true });
    } catch (error: any) {
      if (error.response) {
        alert(`Error: ${error.response.data?.message || "Something went wrong"}`);
      } else if (error.request) {
        alert("No response from server. Please try again.");
      } else {
        alert("Network error. Please try again.");
      }
      console.error("Error during authentication:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#80C2F1",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          width: { xs: "100%", sm: "400px" },
          textAlign: "center",
          bgcolor: "white",
          maxWidth: "90vw",
        }}
      >
        <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
          {isLogin ? "Login" : "Register"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
            />

            {!isLogin && (
              <>
                <TextField
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Login" : "Register"}
            </Button>

            <Typography
              variant="body2"
              sx={{
                mt: 2,
                color: "primary.main",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={toggleForm}
            >
              {isLogin ? "New user? Register here" : "Already have an account? Login"}
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginRegister;
