import React from "react";
import { useUser } from "../../providers/UserProvider";
import List from "@mui/material/List";
import CarsListItem from "./CarsListItem";
import { Container } from "@mui/material";
import { cars } from "../../providers/UserProvider";

export default function CarsList() {
  const user = useUser();

  return (
    <Container maxWidth="md" sx={{ p: 0 }}>
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
              actualMilage,
            }) => (
              <CarsListItem
                carInfo={{
                  plate,
                  brand,
                  model,
                  insurance,
                  technicalExamination,
                  oilChange,
                  actualMilage,
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
