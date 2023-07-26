import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { TextField } from "@mui/material";
import "./Base.css";
import { decodeToken } from "react-jwt";

const settings = ["Profile", "Orders", "Review", "Address", "Logout"];

const Base = ({ children }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [UserToken, setUserToken] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("usertoken");
    if (!user) return setUserToken(false);
    // verify token
    const token = decodeToken(user);
    if (!token) {
      setUserToken(false);
      return localStorage.removeItem("usertoken");
    } 
      setUserToken(true);
    
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutFunction = () => {
    localStorage.removeItem("usertoken");
    setUserToken(false)
  }

  return (
    <div>
      <AppBar position="fixed" sx={{ padding: 0, height: "60px" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            LOGO
          </Typography>
          <div
            style={{ flexGrow: 4, display: "flex", justifyContent: "center" }}
          >
            <TextField
              placeholder="Search"
              InputProps={{
                endAdornment: <SearchIcon color="primary" />,
                style: {
                  backgroundColor: "white",
                  width: "calc(5rem + 30vw)",
                  height: "2rem",
                },
                autoComplete: "off",
              }}
            />
          </div>
          {UserToken ? (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <ShoppingCartIcon style={{ color: "white", cursor: "pointer" }} />
              </div>
              <div>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              </div>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <div key={setting}>
                    {setting === "Logout" ? (
                      <Button
                        style={{
                          width: "calc(70px + 5vw)",
                          padding: "5px",
                          fontSize: "calc(7px + 0.3vw)",
                        }}
                        onClick={()=>{handleCloseUserMenu();logoutFunction()}}
                      >
                        {setting}
                      </Button>
                    ) : (
                      <Typography
                        textAlign="center"
                        style={{
                          width: "calc(70px + 5vw)",
                          padding: "5px",
                          fontSize: "calc(10px + 0.3vw)",
                          cursor: "pointer",
                        }}
                        onClick={handleCloseUserMenu}
                      >
                        {setting}
                      </Typography>
                    )}
                  </div>
                ))}
              </Menu>
            </Box>
          ) : (
            <div style={{ flexGrow: 1, textAlign: "center" }}>
              <Button variant="contained" style={{ backgroundColor: "#64B5F6", fontWeight: 700 }}>
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "60px" }}>{children}</div>
    </div>
  );
};

export default Base;
