import React, { useState } from "react";
import List from "@mui/material/List";
import { Box, TextField, Container } from "@mui/material";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useUser } from "../../providers/UserProvider";
import FuelListItem from "./FuelListItem";

export default function FuelList() {
  const { fuels, months, years } = useUser();

  const [date, setDate] = useState({
    month: "",
    year: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ p: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          "& > *": { backgroundColor: "#fff" },
        }}
      >
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ width: 120 }}>
            <InputLabel id="demo-simple-select-label">Miesiąc</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="month"
              value={date.month}
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
          <FormControl sx={{ width: 120 }}>
            <InputLabel id="demo-simple-select-label">Rok</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="year"
              value={date.year}
              label="Rok"
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
      </Box>
      <List>
        {fuels.map((fuel) => (
          <FuelListItem key={fuel.ID} fuel={fuel} dateChosen={date} />
        ))}
      </List>
    </Container>
  );
}
