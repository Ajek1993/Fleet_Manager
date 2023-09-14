import React, { useState } from "react";
import { Box, TextField, Container } from "@mui/material";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { carsPlates } from "../../providers/UserProvider";
import { doc, updateDoc, arrayUnion } from "firebase/firestore/lite";
import { db } from "../../firebase";

export default function ServicesForm({ handleFormOpen }) {
  const today = new Date().toLocaleDateString("en-CA");

  const [service, setService] = useState({
    carPlate: "",
    name: "",
    costNetto: "",
    costBrutto: "",
    invoiceNumber: "",
    dateOfService: today,
  });

  const handleChange = ({ target: { name, value } }) => {
    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddService = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "cars", service.carPlate), {
      services: arrayUnion({
        name: service.name,
        costNetto: service.costNetto,
        costBrutto: service.costBrutto,
        invoiceNumber: service.invoiceNumber,
        dateOfService: service.dateOfService,
      }),
    });

    handleFormOpen();
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
          padding: "10px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Nr rejestracyjny
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="carPlate"
              value={service.carPlate}
              label="Nr rejestracyjny"
              onChange={handleChange}
            >
              {carsPlates.map((plate) => (
                <MenuItem key={plate} value={plate}>
                  {plate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
          onClick={handleAddService}
        >
          Zapisz
        </Button>
      </Box>
    </Container>
  );
}
