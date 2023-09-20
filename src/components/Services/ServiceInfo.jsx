import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Button, TableHead, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import ServiceFormEdit from "./ServiceFormEdit";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useUser } from "../../providers/UserProvider";

export default function ServiceInfo({ plate }) {
  const { services, deleteService } = useUser();
  const servicesPerCar = services.filter(({ carPlate }) => carPlate === plate);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
  };
  const [openModal, setOpenModal] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [num, setNum] = useState("");

  const handleClose = () => {
    setOpenModal(false);
    setOpenModalInfo(false);
    setOpenModalDelete(false);
  };

  const handleEdit = (e) => {
    setOpenModal(true);
    setNum(e.currentTarget["id"]);
  };

  const handleDelete = (e) => {
    setOpenModalDelete(true);
    setNum(e.currentTarget["id"]);
  };

  const handleDeleteFotSure = async () => {
    deleteService(servicesPerCar[+num]);
    setOpenModalDelete(false);
  };

  const handleInfo = (e) => {
    setOpenModalInfo(true);
    setNum(e.currentTarget["id"]);
  };

  return (
    <>
      <TableContainer component={Paper}>
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
              <TableCell>Zakres naprawy</TableCell>
              {/* <TableCell>Koszt netto</TableCell> */}
              {/* <TableCell>Koszt brutto</TableCell> */}
              <TableCell>Data usługi</TableCell>
              {/* <TableCell>Numer faktury</TableCell> */}
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servicesPerCar.map(
              (
                { name, costNetto, costBrutto, invoiceNumber, dateOfService },
                i
              ) => {
                return (
                  <TableRow
                    key={name + i}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "& > td": { padding: "10px 0" },
                    }}
                  >
                    <TableCell align="center" sx={{ maxWidth: "30vw" }}>
                      {name}
                    </TableCell>
                    {/* <TableCell align="center">{costNetto} zł</TableCell> */}
                    {/* <TableCell align="center">{costBrutto} zł</TableCell> */}
                    <TableCell align="center">{dateOfService}</TableCell>
                    {/* <TableCell align="center">{invoiceNumber}</TableCell> */}
                    <TableCell
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <InfoIcon
                        onClick={handleInfo}
                        color="primary"
                        sx={{ cursor: "pointer" }}
                        id={i}
                      ></InfoIcon>
                      <EditIcon
                        onClick={handleEdit}
                        color="warning"
                        sx={{ cursor: "pointer" }}
                        id={i}
                      ></EditIcon>
                      <DeleteIcon
                        onClick={handleDelete}
                        color="error"
                        sx={{ cursor: "pointer" }}
                        id={i}
                      ></DeleteIcon>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={openModalInfo}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Table
            size="medium"
            aria-label="a dense table"
            sx={{ "& > th, td": { fontSize: 16, p: "10px" } }}
          >
            <TableBody>
              <TableRow>
                <TableCell>Zakres naprawy</TableCell>
                <TableCell>{servicesPerCar[+num].name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Koszt netto</TableCell>
                <TableCell>{servicesPerCar[+num].costNetto}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Koszt brutto</TableCell>
                <TableCell>{servicesPerCar[+num].costBrutto}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Data wykonania usługi</TableCell>
                <TableCell>{servicesPerCar[+num].dateOfService}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Numer faktury</TableCell>
                <TableCell>{servicesPerCar[+num].invoiceNumber}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Modal>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ServiceFormEdit
            servicePerCar={servicesPerCar[+num]}
            num={num}
            plate={plate}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
      <Modal
        open={openModalDelete}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, display: "flex", flexDirection: "column" }}>
          <Typography component={"p"} sx={{ textAlign: "center" }}>
            Czy napewno chcesz usunąć dany element?
          </Typography>
          <Button
            onClick={handleDeleteFotSure}
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2 }}
          >
            USUŃ
          </Button>
        </Box>
      </Modal>
    </>
  );
}
