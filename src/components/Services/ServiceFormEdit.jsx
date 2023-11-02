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

  const [errors, setErrors] = useState({
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

  const handleEditService = async (e) => {
    e.preventDefault();

    let errorsCounter = 0;

    //Validation

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
            helperText="Wartość powinna być liczbą z zakresu 0-99999"
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
          onClick={handleEditService}
        >
          Zapisz
        </Button>
      </Box>
    </Container>
  );
}
