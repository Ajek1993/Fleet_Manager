import React from "react";
import { useUser } from "../../providers/UserProvider";
import List from "@mui/material/List";
import CarsListItem from "./CarsListItem";
import { Container } from "@mui/material";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../firebase";

const carsCollection = collection(db, "cars");
const querySnapshot = await getDocs(carsCollection);
const cars = [];

querySnapshot.forEach((car) => {
  const carInfo = car.data();
  cars.push(carInfo);
});

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
