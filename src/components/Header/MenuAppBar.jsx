import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser } from "../../providers/UserProvider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import ConstructionIcon from "@mui/icons-material/Construction";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function MenuAppBar() {
  const navItems = [
    { name: "Pojazdy", path: "/cars" },
    { name: "Naprawy", path: "/services" },
    { name: "Paliwo", path: "/fuel" },
    { name: "Koszty", path: "/costs" },
  ];
  const navigate = useNavigate();
  const { user, handleLogout } = useUser();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (change) => (event) => {
    setState(change);
  };

  const getUser = () => {
    switch (user) {
      case false:
        return <CircularProgress color="secondary" />;
      case null:
        return (
          <Button href="/login" color="inherit">
            Zaloguj
          </Button>
        );

      default:
        return (
          <Typography component="p">
            Witaj, {user.displayName || user.email}
          </Typography>
        );
    }
  };

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
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {getUser()}
          </Typography>
          {user === null && (
            <Button component={Link} href="/login" color="inherit">
              Zaloguj
            </Button>
          )}
          {user && (
            <Button onClick={handleLogout} color="inherit">
              Wyloguj
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <ListItem onClick={() => navigate("/")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Strona główna"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <List>
            {navItems.map(({ name, path }, index) => (
              <ListItem
                key={name}
                onClick={() => navigate(path)}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? (
                      <TimeToLeaveIcon />
                    ) : index === 1 ? (
                      <ConstructionIcon />
                    ) : index === 2 ? (
                      <LocalGasStationIcon />
                    ) : (
                      <AttachMoneyIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem onClick={() => navigate("/user")} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={"Użytkownik"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
