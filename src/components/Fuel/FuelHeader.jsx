import React from "react";
import { Box, Typography, Container } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function FuelHeader({ handleFormOpen, handleFilterOpen }) {
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
        {" "}
        <Box component="div" sx={{ left: 0, position: "absolute" }}>
          <FilterAltIcon
            color="info"
            fontSize="large"
            onClick={handleFilterOpen}
          />
        </Box>
        <Typography variant="h5" component="h2">
          Paliwo
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
