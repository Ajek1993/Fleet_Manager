import React from "react";
import { cars } from "../../firebase";
import { useUser } from "../../providers/UserProvider";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function CarsList() {
  const user = useUser();
  return (
    <div>
      {user && (
        <List sx={{ m: 0, p: 0 }}>
          {cars.map(({ plate, brand, model }) => (
            <ListItem
              sx={{
                padding: 0,
              }}
              key={plate}
            >
              <ListItemText>
                <ListItemButton
                  sx={{
                    fontWeight: 700,
                    justifyContent: "center",
                    background: "red",
                  }}
                >
                  {plate}
                </ListItemButton>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
