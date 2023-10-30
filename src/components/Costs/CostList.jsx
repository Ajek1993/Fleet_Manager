import React, { useState } from "react";
import { useUser } from "../../providers/UserProvider";
import { Box, Container } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import { TableHead } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CostListItem from "./CostListItem";

export default function CostList({ filterOpen }) {
  const { fuels, months, years, carsPlates, user } = useUser();

  const [date, setDate] = useState({
    plate: "(wszystkie)",
    month: "(wszystkie)",
    year: "(wszystkie)",
  });

  const handleChange = ({ target: { name, value } }) => {
    setDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ p: 0 }}>
      {filterOpen && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Box sx={{ "& > *": { backgroundColor: "#fff" } }}>
            <FormControl sx={{ width: 160 }} size="small">
              <InputLabel id="demo-select-small-label">Rejestracja</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                name="plate"
                value={date.plate}
                label="Rejestracja"
                onChange={handleChange}
              >
                <MenuItem value="(wszystkie)">(wszystkie)</MenuItem>
                {carsPlates.map((plate) => (
                  <MenuItem key={plate} value={plate}>
                    {plate}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ "& > *": { backgroundColor: "#fff" } }}>
            <FormControl sx={{ width: 160 }} size="small">
              <InputLabel id="demo-select-small-label">Miesiąc</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                name="month"
                value={date.month}
                label="Miesiąc"
                onChange={handleChange}
              >
                <MenuItem value="(wszystkie)">(wszystkie)</MenuItem>
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ "& > *": { backgroundColor: "#fff" } }}>
            <FormControl sx={{ width: 160 }} size="small">
              <InputLabel id="demo-select-small-label">Rok</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                name="year"
                value={date.year}
                label="Rok"
                onChange={handleChange}
              >
                <MenuItem value="(wszystkie)">(wszystkie)</MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}
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
              <TableCell>Koszt netto serwisów</TableCell>
              <TableCell>Koszt netto paliwa</TableCell>
              <TableCell>Koszt netto zł/km</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fuels
              .filter((eachFuel) => eachFuel.userID === user.uid)
              .map((fuel) => (
                <CostListItem key={fuel.ID} fuel={fuel} dateChosen={date} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
