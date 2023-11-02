import React, { useState } from "react";
import { Box, TextField, Container } from "@mui/material";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore/lite";
import { db } from "../../firebase";
import { useUser } from "../../providers/UserProvider";

export default function ServicesForm({ handleFormOpen }) {
  const { carsPlates, setServices } = useUser();
  const today = new Date().toLocaleDateString("en-CA");

  const [service, setService] = useState({
    ID: "",
    carPlate: "",
    name: "",
    costNetto: "",
    costBrutto: "",
    invoiceNumber: "",
    dateOfService: today,
  });

  const [errors, setErrors] = useState({
    carPlate: "",
    name: "",
    costNetto: "",
    costBrutto: "",
    invoiceNumber: "",
    dateOfService: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddService = async (e) => {
    e.preventDefault();

    let errorsCounter = 0;

    //Validation

    if (!service.carPlate) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        carPlate: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        carPlate: "",
      }));
    }

    if (!service.name || service.name.length > 100 || service.name.length < 5) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        name: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        name: "",
      }));
    }

    if (
      !service.costNetto ||
      service.costNetto < 0 ||
      service.costNetto > 99999 ||
      !Number.isInteger(+service.costNetto)
    ) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        costNetto: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        costNetto: "",
      }));
    }

    if (
      !service.costNetto ||
      service.costNetto < 0 ||
      service.costNetto > 99999 ||
      !Number.isInteger(+service.costNetto)
    ) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        costNetto: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        costNetto: "",
      }));
    }

    if (
      !service.costBrutto ||
      service.costBrutto < 0 ||
      service.costBrutto > 99999 ||
      !Number.isInteger(+service.costBrutto)
    ) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        costBrutto: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        costBrutto: "",
      }));
    }

    if (!service.invoiceNumber || service.invoiceNumber.length > 30) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        invoiceNumber: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        invoiceNumber: "",
      }));
    }

    if (!service.dateOfService) {
      errorsCounter++;
      setErrors((prev) => ({
        ...prev,
        dateOfService: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        dateOfService: "",
      }));
    }

    if (errorsCounter > 0) return;

    const docRef = await addDoc(collection(db, "services"), {
      carPlate: service.carPlate,
      name: service.name,
      costNetto: service.costNetto,
      costBrutto: service.costBrutto,
      invoiceNumber: service.invoiceNumber,
      dateOfService: service.dateOfService,
    });
    await updateDoc(
      doc(db, "services", docRef.id),
      { ID: docRef.id },
      { merge: true }
    );
    // console.log("Document written with ID: ", docRef.id);
    // console.log(docRef);
    setServices((prev) => [{ ...service, ID: docRef.id }, ...prev]);

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
            {!errors.carPlate ? (
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
            ) : (
              <Select
                error
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
            )}
          </FormControl>
        </Box>
        {!errors.name ? (
          <TextField
            required
            label="Zakres naprawy"
            variant="standard"
            value={service.name}
            name="name"
            type="text"
            onChange={handleChange}
          />
        ) : (
          <TextField
            error
            helperText="Zakres naprawy powinien składać się z 5-100 znaków"
            required
            label="Zakres naprawy"
            variant="standard"
            value={service.name}
            name="name"
            type="text"
            onChange={handleChange}
          />
        )}
        {!errors.costNetto ? (
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
        ) : (
          <TextField
            error
            helperText="Wartość powinna być liczbą z zakresu 1-99999"
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
        )}
        {!errors.costBrutto ? (
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
        ) : (
          <TextField
            error
            helperText="Wartość powinna być liczbą z zakresu 0-99999"
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
        )}
        {!errors.invoiceNumber ? (
          <TextField
            required
            label="Numer faktury"
            variant="standard"
            value={service.invoiceNumber}
            name="invoiceNumber"
            type="text"
            onChange={handleChange}
          />
        ) : (
          <TextField
            error
            helperText="Numer faktury powinien składać się z max. 30 znaków"
            required
            label="Numer faktury"
            variant="standard"
            value={service.invoiceNumber}
            name="invoiceNumber"
            type="text"
            onChange={handleChange}
          />
        )}
        {!errors.dateOfService ? (
          <TextField
            required
            label="Data wykonania usługi"
            variant="standard"
            value={service.dateOfService}
            name="dateOfService"
            type="date"
            onChange={handleChange}
          />
        ) : (
          <TextField
            error
            helperText="Błędna data"
            required
            label="Data wykonania usługi"
            variant="standard"
            value={service.dateOfService}
            name="dateOfService"
            type="date"
            onChange={handleChange}
          />
        )}
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
