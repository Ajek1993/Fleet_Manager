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
  const { carsPlates, setFuels, months, years, user } = useUser();
  const [fuel, setFuel] = useState({
    plate: "",
    month: "",
    monthNum: "",
    year: "",
    costLPG: "",
    costPB: "",
    quantityLPG: "",
    quantityPB: "",
    distance: "",
    userID: user.uid,
  });

  const [errors, setErrors] = useState({
    plate: "",
    month: "",
    year: "",
    costLPG: "",
    costPB: "",
    quantityLPG: "",
    quantityPB: "",
    distance: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setFuel((prev) => ({
      ...prev,
      [name]: value,
      monthNum: months.indexOf(fuel.month) + 1,
    }));
  };

  const handleAddFuel = async (e) => {
    e.preventDefault();

    let errorsCounter = 0;

    //Validation

    if (!fuel.plate) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        plate: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        plate: "",
      }));
    }

    if (!fuel.month) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        month: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        month: "",
      }));
    }

    if (!fuel.year) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        year: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        year: "",
      }));
    }

    if (
      !fuel.costLPG ||
      fuel.costLPG < 0 ||
      fuel.costLPG > 99999 ||
      !Number.isInteger(+fuel.costLPG)
    ) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        costLPG: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        costLPG: "",
      }));
    }

    if (
      !fuel.costPB ||
      fuel.costPB < 0 ||
      fuel.costPB > 99999 ||
      !Number.isInteger(+fuel.costPB)
    ) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        costPB: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        costPB: "",
      }));
    }

    if (
      !fuel.quantityLPG ||
      fuel.quantityLPG < 0 ||
      fuel.quantityLPG > 9999 ||
      !Number.isInteger(+fuel.quantityLPG)
    ) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        quantityLPG: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        quantityLPG: "",
      }));
    }

    if (
      !fuel.quantityPB ||
      fuel.quantityPB < 0 ||
      fuel.quantityPB > 9999 ||
      !Number.isInteger(+fuel.quantityPB)
    ) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        quantityPB: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        quantityPB: "",
      }));
    }

    if (
      !fuel.distance ||
      fuel.distance < 0 ||
      fuel.distance > 99999 ||
      !Number.isInteger(+fuel.distance)
    ) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        distance: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        distance: "",
      }));
    }

    if (errorsCounter > 0) return;

    await setDoc(
      doc(db, "fuel", `${fuel.plate}-${fuel.monthNum}-${fuel.year}`),
      fuel
    );

    await updateDoc(
      doc(db, "fuel", `${fuel.plate}-${fuel.monthNum}-${fuel.year}`),
      { ID: `${fuel.plate}-${fuel.monthNum}-${fuel.year}` },
      { merge: true }
    );

    setFuel({
      plate: "",
      month: "",
      monthNum: "",
      year: "",
      costLPG: "",
      costPB: "",
      quantityLPG: "",
      quantityPB: "",
      distance: "",
      userID: user.uid,
    });
    setFuels((prev) => [
      { ...fuel, ID: `${fuel.plate}-${fuel.monthNum}-${fuel.year}` },
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
            {!errors.plate ? (
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
            ) : (
              <Select
                error
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
            )}
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Miesiąc</InputLabel>
            {!errors.month ? (
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
            ) : (
              <Select
                error
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
            )}
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Rok</InputLabel>
            {!errors.year ? (
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
            ) : (
              <Select
                error
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
            )}
          </FormControl>
        </Box>
        {!errors.costLPG ? (
          <TextField
            required
            label="Koszt netto LPG"
            variant="standard"
            value={fuel.costLPG}
            name="costLPG"
            type="number"
            min="1"
            max="99999"
            onChange={handleChange}
          />
        ) : (
          <TextField
            error
            helperText="Wartość powinna być liczbą z zakresu 0-99999"
            required
            label="Koszt netto LPG"
            variant="standard"
            value={fuel.costLPG}
            name="costLPG"
            type="number"
            min="1"
            max="99999"
            onChange={handleChange}
          />
        )}
        {!errors.quantityLPG ? (
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
        ) : (
          <TextField
            error
            helperText="Wartość powinna być liczbą z zakresu 0-9999"
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
        )}
        {!errors.costPB ? (
          <TextField
            required
            label="Koszt netto PB/Diesel"
            variant="standard"
            value={fuel.costPB}
            name="costPB"
            type="number"
            min="1"
            max="9999"
            onChange={handleChange}
          />
        ) : (
          <TextField
            error
            helperText="Wartość powinna być liczbą z zakresu 0-99999"
            required
            label="Koszt netto PB/Diesel"
            variant="standard"
            value={fuel.costPB}
            name="costPB"
            type="number"
            min="1"
            max="99999"
            onChange={handleChange}
          />
        )}
        {!errors.quantityPB ? (
          <TextField
            required
            label="Ilość litrów PB/Diesel"
            variant="standard"
            value={fuel.quantityPB}
            name="quantityPB"
            type="number"
            min="1"
            max="9999"
            onChange={handleChange}
          />
        ) : (
          <TextField
            error
            helperText="Wartość powinna być liczbą z zakresu 0-9999"
            required
            label="Ilość litrów PB/Diesel"
            variant="standard"
            value={fuel.quantityPB}
            name="quantityPB"
            type="number"
            min="1"
            max="9999"
            onChange={handleChange}
          />
        )}
        {!errors.distance ? (
          <TextField
            required
            label="Przejechane kilometry"
            variant="standard"
            value={fuel.distance}
            name="distance"
            type="number"
            min="1"
            max="99999"
            onChange={handleChange}
          />
        ) : (
          <TextField
            error
            helperText="Wartość powinna być liczbą z zakresu 0-99999"
            required
            label="Przejechane kilometry"
            variant="standard"
            value={fuel.distance}
            name="distance"
            type="number"
            min="1"
            max="99999"
            onChange={handleChange}
          />
        )}

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
