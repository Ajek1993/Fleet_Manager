import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ServiceInfo from "./ServiceInfo";

export default function ServiceListItem({ plate }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <ListItem
        sx={{
          p: 0,
          margin: "10px auto",
          border: "2px solid #1976d2",
          borderRadius: "5px",
          width: "auto",
          backgroundColor: "#fff",
        }}
        onClick={handleClick}
      >
        <ListItemText>
          <ListItemButton
            sx={{
              fontWeight: 700,
              fontSize: "1.4em",
              justifyContent: "center",
            }}
          >
            {plate}
          </ListItemButton>
        </ListItemText>
      </ListItem>
      {open && <ServiceInfo plate={plate} />}
    </>
  );
}
