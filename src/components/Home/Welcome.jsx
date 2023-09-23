import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function Welcome() {
  return (
    <Container maxWidth="md">
      <Typography variant={"h3"} sx={{ m: 3, textAlign: "center" }}>
        Witaj w Twoim menadżerze floty
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img
          src="https://media.istockphoto.com/id/1337364564/pl/wektor/ilustracja-wektorowa-samoch%C3%B3d-przegl%C4%85d-samochodu-naprawa-mechanika-samochodowego-kt%C3%B3ry.jpg?s=612x612&w=0&k=20&c=1ucQn0Hg0-kESQIqFLOZDexLdZkhH3-RYcQpBrZvYWo="
          alt="man in front of car"
          style={{ width: "100vw" }}
        />
      </Box>
      <Typography variant={"h5"} sx={{ m: 3, textAlign: "center" }}>
        Tutaj możesz zarządzać swoją flotą samochodową oraz pilnować wydatków. I
        to wszystko teraz w jednym miejscu!
      </Typography>
    </Container>
  );
}
