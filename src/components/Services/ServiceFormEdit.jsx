import React, { useState } from "react";
import { Box, TextField, Container } from "@mui/material";
import { Button } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../firebase";
import { useUser } from "../../providers/UserProvider";

export default function ServiceFormEdit({ servicePerCar, handleClose, plate }) {
  const { name, costNetto, costBrutto, invoiceNumber, dateOfService, ID } =
    servicePerCar;

  console.log(servicePerCar);
  const { setServices } = useUser();
  const [service, setService] = useState({
    carPlate: plate,
    name,
    costNetto,
    costBrutto,
    invoiceNumber,
    dateOfService,
    ID,
  });

  const handleChange = ({ target: { name, value } }) => {
    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditService = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "services", service.ID), service, { merge: true });
    setServices((prev) => [
      service,
      ...prev.filter(({ ID }) => ID !== service.ID),
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
          min="1"
          max="99999"
          onChange={handleChange}
        />
        <TextField
          required
          label="Koszt brutto"
          variant="standard"
          value={service.costBrutto}
          name="costBrutto"
          type="number"
          min="1"
          max="99999"
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
