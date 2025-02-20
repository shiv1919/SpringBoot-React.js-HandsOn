import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginRegister from "./pages/loginregister";
import ReadAllPage from "./pages/ReadPage";
import Sidebar from "./component/Sidebar";
import "./App.css";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuthStatus();
    
    window.addEventListener("storage", checkAuthStatus);
    
    window.addEventListener("authStateChange", checkAuthStatus);
    
    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("authStateChange", checkAuthStatus);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#80C2F1", minHeight: "100vh" }}>
      <Router>
        {isLoggedIn && <Sidebar />}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route 
            path="/login" 
            element={
              isLoggedIn ? 
                <Navigate to="/read-all" replace /> : 
                <LoginRegister onLoginSuccess={checkAuthStatus} />
            } 
          />
          
          {/* Protected routes */}
          <Route
            path="/read-all"
            element={
              <ProtectedRoute>
                <ReadAllPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
