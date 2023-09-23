import React from "react";
import { Box, Typography, Container } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function CarsHeader({ handleFormOpen }) {
  return (
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
          position: "relative",
        }}
      >
        <Typography variant="h5" component="h2">
          Pojazdy
        </Typography>
        <Box component="div" sx={{ right: 0, position: "absolute" }}>
          <AddCircleIcon
            color="success"
            fontSize="large"
            onClick={handleFormOpen}
          />
        </Box>
      </Box>
    </Container>
  );
}
