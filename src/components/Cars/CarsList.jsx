import React from "react";
import { cars } from "../../firebase";
import { useUser } from "../../providers/UserProvider";
import List from "@mui/material/List";
import CarsListItem from "./CarsListItem";
import { Container } from "@mui/material";

export default function CarsList() {
  const user = useUser();
  return (
    <Container maxWidth="md">
      {user && (
        <List>
          {cars.map(
            ({
              plate,
              brand,
              model,
              insurance,
              technicalExamination,
              oilChange,
              startMilage,
            }) => (
              <CarsListItem
                carInfo={{
                  plate,
                  brand,
                  model,
                  insurance,
                  technicalExamination,
                  oilChange,
                  startMilage,
                }}
                key={plate}
              />
            )
          )}
        </List>
      )}
    </Container>
  );
}
