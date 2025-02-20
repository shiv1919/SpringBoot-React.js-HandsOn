import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Drawer, List, ListItemText, IconButton, ListItemButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setOpen(!open);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authStateChange")); // Trigger re-render
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Button to open/close the sidebar */}
      <IconButton
        aria-label="open drawer"
        onClick={toggleSidebar}
        sx={{ position: "absolute", top: 20, left: 20, color: "white" }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: "#f4f4f4",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "space-between", // Pushes logout button to bottom
          },
        }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItemButton component={Link} to="/read-all" onClick={toggleSidebar}>
              <ListItemText primary="All Records" />
            </ListItemButton>
            {/* Add more navigation links if needed */}
          </List>
        </Box>

        {/* Logout Button at Bottom */}
        <Box sx={{ padding: 2 }}>
          <Button 
            variant="contained" 
            color="error" 
            fullWidth 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
