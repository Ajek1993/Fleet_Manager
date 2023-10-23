import React from "react";
import List from "@mui/material/List";
import CarsListItem from "./CarsListItem";
import { Container } from "@mui/material";
import { useUser } from "../../providers/UserProvider";

export default function CarsList() {
  const { cars, user } = useUser();
  return (
    <Container maxWidth="md" sx={{ p: 0 }}>
      <List>
        {cars
          .filter(({ userID }) => userID === user.uid)
          .map(
            ({
              plate,
              brand,
              model,
              insurance,
              technicalExamination,
              oilChange,
              actualMilage,
              userID,
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
                  userID,
                }}
                key={plate}
              />
            )
          )}
      </List>
    </Container>
  );
}
