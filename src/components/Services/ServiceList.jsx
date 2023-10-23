import React from "react";
import List from "@mui/material/List";
import ServiceListItem from "./ServiceListItem";
import { Container } from "@mui/material";
import { useUser } from "../../providers/UserProvider";

export default function ServiceList() {
  const { cars, user } = useUser();

  return (
    <Container maxWidth="md" sx={{ p: 0 }}>
      <List>
        {cars
          .filter(({ userID }) => userID === user.uid)
          .map(({ plate }) => (
            <ServiceListItem plate={plate} key={plate} />
          ))}
      </List>
    </Container>
  );
}
