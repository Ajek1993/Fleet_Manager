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
  const { fuels, services, months, years, carsPlates, user } = useUser();

  const [date, setDate] = useState({
    plate: "(wszystkie)",
    month: "(wszystkie)",
    year: "(wszystkie)",
  });

  // const dupala = [];

  for (let i = 0; i < years.length; i++) {
    for (let j = 1; j < 13; j++) {
      const costData = {};

      const costService = services.filter(
        (service) =>
          carsPlates.includes(service.carPlate) &&
          +service.dateOfService.slice(0, 4) === years[i] &&
          +service.dateOfService.slice(5, 7) === j
      );

      const costFuel = fuels.filter(
        (fuel) =>
          carsPlates.includes(fuel.plate) &&
          +fuel.year === years[i] &&
          +fuel.monthNum === j
      );

      // console.log(costFuel);

      const filtredPlate =
        costService.map((service) => {
          return service.carPlate;
        })[0] ||
        costFuel.map((fuel) => {
          return fuel.plate;
        })[0];

      costData.plate = filtredPlate;
      costData.year = years[i];
      costData.month = j;
      costData.services = costService
        .map((service) => {
          return service.costNetto;
        })
        .reduce((a, c) => +a + +c, 0);

      costData.fuel =
        costFuel
          .filter((fuel) => fuel.plate === filtredPlate)
          .map((fuel) => +fuel.costLPG + +fuel.costPB)[0] || 0;

      console.log(costData);
    }
  }
  //     const chuj = {};

  //

  // console.log(
  //   fuels
  //     .filter(
  //       (fuel) =>
  //         fuel.plate === chuj.plate &&
  //         fuel.monthNum === chuj.month &&
  //         fuel.year === chuj.year
  //     )
  //     )
  // );

  // chuj.fuel =
  //   fuels
  //     .filter(
  //       (fuel) =>
  //         fuel.plate === chuj.plate &&
  //         fuel.monthNum === chuj.month &&
  //         fuel.year === chuj.year
  //     )
  //     .map((fuel) => +fuel.costLPG + +fuel.costPB)[0] || 0;

  // dupala.push(chuj);
  // console.log(chuj);
  // console.log(
  //   "Rejestracja:",
  //   filtredPlate,
  //   "Koszt:",
  //   costService
  //     .map((service) => {
  //       return service.costNetto;
  //     })
  //     .reduce((a, c) => +a + +c, 0),
  //   "Rok:",
  //   years[i],
  //   "Miesiąc:",
  //   j
  // );
  //     }
  //   }
  // }

  // const costsData = carsPlates.map((carsPlate) => {
  //   const service = services.filter(
  //     (service) => service.carPlate === carsPlate
  //   );
  //   const fuel = fuels.filter((fuel) => fuel.plate === carsPlate);
  //   const data = [...service, ...fuel];

  //   return data;
  // });

  // console.log(costsData);

  // const costsFullData = costsData.map((costData) => {
  //   return costData.map((costDataDetail) => {
  //     const costInfo = {};
  //     if (costDataDetail.plate || costDataDetail.carPlate) {
  //       costInfo.plate = costDataDetail.plate || costDataDetail.carPlate;
  //     }
  //     if (costDataDetail.year) {
  //       costInfo.year = costDataDetail.year;
  //     } else {
  //       costInfo.year = +costDataDetail.dateOfService.slice(0, 4);
  //     }
  //     if (costDataDetail.monthNum) {
  //       costInfo.month = +costDataDetail.monthNum;
  //     } else {
  //       costInfo.month = +costDataDetail.dateOfService.slice(5, 7);
  //     }
  //     if (costDataDetail.costNetto) {
  //       costInfo.services = +costDataDetail.costNetto;
  //     } else {
  //       costInfo.services = 0;
  //     }
  //     if (costDataDetail.costLPG && costDataDetail.costPB) {
  //       costInfo.fuel = +costDataDetail.costLPG + +costDataDetail.costPB;
  //     } else {
  //       costInfo.fuel = 0;
  //     }

  //     return costInfo;
  //   });
  // });

  // const costsArray = [];

  // for (let i = 0; i < costsFullData.length; i++) {
  //   costsArray.push(...costsFullData[i]);
  // }

  // console.log("Przerobiona tablica", costsArray);

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

            {/* {costsArray.map((cost, i) => (
              <CostListItem key={cost.plate + i} />
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <p style={{ marginTop: "10px" }}>
        * Jeżeli nie widać danej pozycji, upewnij się, że dodano koszty paliwa w
        zadanym okresie
      </p>
    </Container>
  );
}
