import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser } from "../../providers/UserProvider";
import { handleLogout } from "../Signin/Signin";
import SideMenu from "./SideMenu";

export default function MenuAppBar() {
  const [menuDisplay, setMenuDisplay] = React.useState(false);
  const showMenu = () => {
    setMenuDisplay(true);
  };
  const user = useUser();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={showMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user ? `Witaj, ${user.email}` : ""}
          </Typography>
          {!user && (
            <Button href="/login" color="inherit">
              Zaloguj
            </Button>
          )}
          {user && (
            <Button onClick={handleLogout} href="/login" color="inherit">
              Wyloguj
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {menuDisplay && <SideMenu />}
    </Box>
  );
}
