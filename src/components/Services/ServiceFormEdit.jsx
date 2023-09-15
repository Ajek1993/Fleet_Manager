import React, { useState } from "react";
import { Box, TextField, Container } from "@mui/material";
import { Button } from "@mui/material";
// import { doc, updateDoc, arrayUnion } from "firebase/firestore/lite";
// import { db } from "../../firebase";

export default function ServiceFormEdit({ servicesPerCar, handleClose }) {
  const [service, setService] = useState({
    carPlate: "",
    name: "",
    costNetto: "",
    costBrutto: "",
    invoiceNumber: "",
    dateOfService: "",
  });

  console.log("serviceInfo to:", servicesPerCar);

  const handleChange = ({ target: { name, value } }) => {
    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditService = async (e) => {
    e.preventDefault();

    // await updateDoc(doc(db, "cars", service.carPlate), {
    //   services: arrayUnion({
    //     name: service.name,
    //     costNetto: service.costNetto,
    //     costBrutto: service.costBrutto,
    //     invoiceNumber: service.invoiceNumber,
    //     dateOfService: service.dateOfService,
    //   }),
    // });
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
          required
          label="Zakres naprawy"
          variant="standard"
          value={service.name}
          name="name"
          type="text"
          onChange={handleChange}
        />
        <TextField
          required
          label="Koszt netto"
          variant="standard"
          value={service.costNetto}
          name="costNetto"
          type="number"
          onChange={handleChange}
        />
        <TextField
          required
          label="Koszt brutto"
          variant="standard"
          value={service.costBrutto}
          name="costBrutto"
          type="number"
          onChange={handleChange}
        />
        <TextField
          required
          label="Number faktury"
          variant="standard"
          value={service.invoiceNumber}
          name="invoiceNumber"
          type="text"
          onChange={handleChange}
        />
        <TextField
          required
          label="Data wykonania usługi"
          variant="standard"
          value={service.dateOfService}
          name="dateOfService"
          type="date"
          onChange={handleChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleEditService}
        >
          Zapisz
        </Button>
      </Box>
    </Container>
  );
}
