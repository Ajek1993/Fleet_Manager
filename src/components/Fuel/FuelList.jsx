import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useUser } from "../../providers/UserProvider";
import FuelListItem from "./FuelListItem";
import Table from "@mui/material/Table";
import { TableHead } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function FuelList() {
  const { fuels, months, years, carsPlates } = useUser();

  const [date, setDate] = useState({
    month: "",
    year: "",
    plate: "",
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
            <InputLabel id="demo-simple-select-label">Rejestracja</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="plate"
              value={date.plate}
              label="Rejestracja"
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
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table
          size="small"
          aria-label="a dense table"
          sx={{ "& > th, td": { fontSize: 12 } }}
        >
          <TableHead>
            <TableRow
              sx={{
                "& > th": {
                  padding: "4px 0",
                  textAlign: "center",
                  fontWeight: 700,
                },
              }}
            >
              <TableCell>Rejestracja</TableCell>
              <TableCell>Koszt netto LPG</TableCell>
              <TableCell>Ilość LPG</TableCell>
              <TableCell>Koszt netto PB</TableCell>
              <TableCell>Ilość PB</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fuels.map((fuel) => (
              <FuelListItem key={fuel.ID} fuel={fuel} dateChosen={date} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
