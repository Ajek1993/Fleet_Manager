import React from "react";
import List from "@mui/material/List";
import ServiceListItem from "./ServiceListItem";
import { Container } from "@mui/material";
import { cars } from "../../providers/UserProvider";

export default function ServiceList() {
  return (
    <Container maxWidth="md" sx={{ p: 0 }}>
      <List>
        {cars.map(
          ({ plate, services }) => (
            <ServiceListItem plate={plate} key={plate} services={services} />
          )

          //   services.map((service) => {
          //     console.log(plate, service);
          //   })
        )}
      </List>
    </Container>
  );
}
