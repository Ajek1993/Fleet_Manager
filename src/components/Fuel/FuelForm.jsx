import React, { useState } from "react";
import { Box, TextField, Container } from "@mui/material";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { doc, updateDoc, setDoc } from "firebase/firestore/lite";
import { db } from "../../firebase";
import { useUser } from "../../providers/UserProvider";

export default function FuelForm({ handleFormOpen }) {
  const { carsPlates, setFuels, months, years } = useUser();
  const [fuel, setFuel] = useState({
    plate: "",
    month: "",
    year: "",
    costLPG: "",
    costPB: "",
    quantityLPG: "",
    quantityPB: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setFuel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFuel = async (e) => {
    e.preventDefault();

    await setDoc(
      doc(db, "fuel", `${fuel.plate}-${fuel.month}-${fuel.year}`),
      fuel
    );

    await updateDoc(
      doc(db, "fuel", `${fuel.plate}-${fuel.month}-${fuel.year}`),
      { ID: `${fuel.plate}-${fuel.month}-${fuel.year}` },
      { merge: true }
    );

    setFuel({
      plate: "",
      month: "",
      year: "",
      costLPG: "",
      costPB: "",
      quantityLPG: "",
      quantityPB: "",
    });
    setFuels((prev) => [
      { ...fuel, ID: `${fuel.plate}-${fuel.month}-${fuel.year}` },
      ...prev,
    ]);

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
              name="plate"
              value={fuel.plate}
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
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Miesiąc</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="month"
              value={fuel.month}
              label="Miesiąc"
              onChange={handleChange}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Rok</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="year"
              value={fuel.year}
              label="rok"
              onChange={handleChange}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TextField
          required
          label="Koszt netto LPG"
          variant="standard"
          value={fuel.costLPG}
          name="costLPG"
          type="number"
          min="1"
          max="9999"
          onChange={handleChange}
        />
        <TextField
          required
          label="Ilość litrów LPG"
          variant="standard"
          value={fuel.quantityLPG}
          name="quantityLPG"
          type="number"
          min="1"
          max="9999"
          onChange={handleChange}
        />
        <TextField
          required
          label="Koszt netto PB"
          variant="standard"
          value={fuel.costPB}
          name="costPB"
          type="number"
          min="1"
          max="9999"
          onChange={handleChange}
        />
        <TextField
          required
          label="Ilość litrów PB"
          variant="standard"
          value={fuel.quantityPB}
          name="quantityPB"
          type="number"
          min="1"
          max="9999"
          onChange={handleChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleAddFuel}
        >
          Zapisz
        </Button>
      </Box>
    </Container>
  );
}
