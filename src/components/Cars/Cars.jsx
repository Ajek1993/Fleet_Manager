import React, { useState } from "react";
import MenuAppBar from "../Header/MenuAppBar";
import CarsList from "./CarsList";
import { Box, Typography, Container } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CarsForm from "./CarsForm";

export default function Cars() {
  const [formOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen((prev) => !prev);
  };
  return (
    <>
      <MenuAppBar />
      <Container maxWidth="md">
        <Box
          component="div"
          sx={{
            p: 1,
            textAlign: "center",
            margin: "10px auto",
            color: "#1976d2",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" component="h2">
            Pojazdy
          </Typography>
          <Box component="div">
            <AddCircleIcon
              color="success"
              fontSize="large"
              sx={{ right: "10px", position: "absolute" }}
              onClick={handleFormOpen}
            />
          </Box>
        </Box>
      </Container>
      {formOpen && <CarsForm handleFormOpen={handleFormOpen} />}
      {!formOpen && <CarsList />}
    </>
  );
}
