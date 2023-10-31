import React, { useState } from "react";
import { Box, TextField, Container } from "@mui/material";
import { Button } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../firebase";
import { useUser } from "../../providers/UserProvider";

export default function CarsFormEdit({
  carInfo: {
    plate,
    brand,
    model,
    insurance,
    technicalExamination,
    oilChange,
    actualMilage,
  },
  handleClose,
}) {
  const { setCars, user } = useUser();
  const [car, setCar] = useState({
    plate,
    brand,
    model,
    insurance,
    technicalExamination,
    oilChange,
    actualMilage,
    userID: user.uid,
  });

  const [errors, setErrors] = useState({
    brand: "",
    model: "",
    insurance: "",
    technicalExamination: "",
    oilChange: "",
    actualMilage: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setCar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditCar = async (e) => {
    e.preventDefault();

    let errorsCounter = 0;

    //Validation

    if (!car.brand || car.plate.length < 2) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        brand: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        brand: "",
      }));
    }

    if (!car.model || car.model.length < 2) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        model: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        model: "",
      }));
    }

    if (!car.insurance) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        insurance: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        insurance: "",
      }));
    }

    if (!car.technicalExamination) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        technicalExamination: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        technicalExamination: "",
      }));
    }

    if (!car.oilChange) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        oilChange: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        oilChange: "",
      }));
    }

    if (
      !car.actualMilage ||
      car.actualMilage < 0 ||
      car.actualMilage > 9999999 ||
      !Number.isInteger(+car.actualMilage)
    ) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        actualMilage: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        actualMilage: "",
      }));
    }

    if (errorsCounter > 0) return;

    await updateDoc(doc(db, "cars", car.plate), car, { merge: true });
    setCars((prev) => [
      car,
      ...prev.filter(({ plate }) => plate !== car.plate),
    ]);
    handleClose();
  };
  return (
    <Container maxWidth="md">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1.5, width: "100%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          disabled
          label="nr rejestracyjny"
          variant="standard"
          value={car.plate}
          name="plate"
          type="text"
          onChange={handleChange}
        />
        {!errors.brand ? (
          <TextField
            required
            label="marka"
            variant="standard"
            value={car.brand}
            name="brand"
            type="text"
            onChange={handleChange}
          />
        ) : (
          <TextField
            error
            helperText="Marka powinna składać się z min. 2 znaków"
            required
            label="marka"
            variant="standard"
            value={car.brand}
            name="brand"
            type="text"
            onChange={handleChange}
          />
        )}
        {!errors.model ? (
          <TextField
            required
            label="model"
            variant="standard"
            value={car.model}
            name="model"
            type="text"
            onChange={handleChange}
          />
        ) : (
          <TextField
            error
            helperText="Model powinien składać się z min. 2 znaków"
            required
            label="model"
            variant="standard"
            value={car.model}
            name="model"
            type="text"
            onChange={handleChange}
          />
        )}
        {!errors.insurance ? (
          <TextField
            required
            label="data ważności polisy OC"
            variant="standard"
            value={car.insurance}
            name="insurance"
            type="date"
            onChange={handleChange}
          />
        ) : (
          <TextField
            error
            helperText="Błędna data"
            required
            label="data ważności polisy OC"
            variant="standard"
            value={car.insurance}
            name="insurance"
            type="date"
            onChange={handleChange}
          />
        )}
        {!errors.technicalExamination ? (
          <TextField
            required
            label="data kolejnego badania technicznego"
            variant="standard"
            value={car.technicalExamination}
            name="technicalExamination"
            type="date"
            onChange={handleChange}
          />
        ) : (
          <TextField
            error
            helperText="Błędna data"
            required
            label="data kolejnego badania technicznego"
            variant="standard"
            value={car.technicalExamination}
            name="technicalExamination"
            type="date"
            onChange={handleChange}
          />
        )}
        {!errors.oilChange ? (
          <TextField
            required
            label="data kolejnej wymiany oleju"
            variant="standard"
            value={car.oilChange}
            name="oilChange"
            type="date"
            onChange={handleChange}
          />
        ) : (
          <TextField
            error
            helperText="Błędna data"
            required
            label="data kolejnej wymiany oleju"
            variant="standard"
            value={car.oilChange}
            name="oilChange"
            type="date"
            onChange={handleChange}
          />
        )}
        {!errors.actualMilage ? (
          <TextField
            required
            label="aktualny przebieg"
            variant="standard"
            value={car.actualMilage}
            name="actualMilage"
            type="number"
            min="1"
            max="1000000"
            onChange={handleChange}
          />
        ) : (
          <TextField
            error
            helperText="Wartość powinna być liczbą z zakresu 0-9999999"
            required
            label="aktualny przebieg"
            variant="standard"
            value={car.actualMilage}
            name="actualMilage"
            type="number"
            min="1"
            max="1000000"
            onChange={handleChange}
          />
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleEditCar}
        >
          Zapisz
        </Button>
      </Box>
    </Container>
  );
}
