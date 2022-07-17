import React, { useEffect, useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { userContext } from "../../store/userContext";
import { usernameContext } from "../../store/usernameContext";

const Header = () => {
  const Navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const { user, setUser } = useContext(userContext);
  const { username, setUsername } = useContext(usernameContext);

  useEffect(() => {
    if (localStorage.getItem("AuthToken")) {
      const decodedToken = jwtDecode(localStorage.getItem("AuthToken"));
      setLogin(false);
      setUser(decodedToken.email);
      setUsername(decodedToken.name);
    }
  }, [user, username]);

  const logout = () => {
    localStorage.clear();
    Navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ boxShadow: "none", background: "#2E589C" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textTransform: "uppercase" }}
          >
            {username}
          </Typography>
          {login ? (
            <Button
              onClick={() => {
                Navigate("/signin");
              }}
              color="inherit"
            >
              Login
            </Button>
          ) : (
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
