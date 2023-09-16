import React from "react";
import List from "@mui/material/List";
import ServiceListItem from "./ServiceListItem";
import { Container } from "@mui/material";
import { useUser } from "../../providers/UserProvider";

export default function ServiceList() {
  const { cars } = useUser();

  return (
    <Container maxWidth="md" sx={{ p: 0 }}>
      <List>
        {cars.map(({ plate}) => (
          <ServiceListItem plate={plate} key={plate} />
        ))}
      </List>
    </Container>
  );
}
