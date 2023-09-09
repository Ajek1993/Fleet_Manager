import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { doc, setDoc } from "firebase/firestore/lite";
import { db } from "../../firebase";

export default function CarsForm({ handleFormOpen }) {
  const [car, setCar] = useState({
    plate: "",
    brand: "",
    model: "",
    insurance: "",
    technicalExamination: "",
    oilChange: "",
    startMilage: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setCar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "cars", car.plate), car);

    setCar({
      plate: "",
      brand: "",
      model: "",
      insurance: "",
      technicalExamination: "",
      oilChange: "",
      startMilage: "",
    });
    handleFormOpen();
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1.5, width: "100%" },
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        label="nr rejestracyjny"
        variant="standard"
        value={car.plate}
        name="plate"
        onChange={handleChange}
      />
      <TextField
        required
        label="marka"
        variant="standard"
        value={car.brand}
        name="brand"
        onChange={handleChange}
      />
      <TextField
        required
        label="model"
        variant="standard"
        value={car.model}
        name="model"
        onChange={handleChange}
      />
      <TextField
        required
        label="data ważności polisy OC"
        variant="standard"
        value={car.insurance}
        name="insurance"
        onChange={handleChange}
      />
      <TextField
        required
        label="data kolejnego badania technicznego"
        variant="standard"
        value={car.technicalExamination}
        name="technicalExamination"
        onChange={handleChange}
      />
      <TextField
        required
        label="data kolejnej wymiany oleju"
        variant="standard"
        value={car.oilChange}
        name="oilChange"
        onChange={handleChange}
      />
      <TextField
        required
        label="aktualny przebieg"
        variant="standard"
        value={car.startMilage}
        name="startMilage"
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleAddCar}
      >
        Zapisz
      </Button>
    </Box>
  );
}
