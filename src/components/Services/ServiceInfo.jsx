import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { TableHead } from "@mui/material";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ServiceFormEdit from "./ServiceFormEdit";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useUser } from "../../providers/UserProvider";

export default function ServiceInfo({ plate }) {
  const { services } = useUser();
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
    p: 4,
  };
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleEdit = (e) => {
    setOpenModal(true);
    console.log("będzie edytowanie");
  };

  const handleDelete = async () => {
    // await deleteDoc(doc(db, "service", plate));
    console.log("będzie usuwanie");
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Zakres naprawy</TableCell>
              <TableCell>Koszt netto</TableCell>
              <TableCell>Koszt brutto</TableCell>
              <TableCell>Data wykonania usługi</TableCell>
              <TableCell>Numer faktury</TableCell>
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
                      "& > td": { padding: "6px" },
                    }}
                  >
                    <TableCell align="center">{name}</TableCell>
                    <TableCell align="center">{costNetto} zł</TableCell>
                    <TableCell align="center">{costBrutto} zł</TableCell>
                    <TableCell align="center">{dateOfService}</TableCell>
                    <TableCell align="center">{invoiceNumber}</TableCell>
                    <TableCell
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <EditIcon
                        onClick={handleEdit}
                        color="warning"
                        sx={{ cursor: "pointer" }}
                      ></EditIcon>
                      <DeleteIcon
                        onClick={handleDelete}
                        color="error"
                        sx={{ cursor: "pointer" }}
                      ></DeleteIcon>
                      <div>{i}</div>
                      <Modal
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <ServiceFormEdit
                            servicePerCar={{
                              name,
                              costNetto,
                              costBrutto,
                              invoiceNumber,
                              dateOfService,
                            }}
                            plate={plate}
                            handleClose={handleClose}
                          />
                        </Box>
                      </Modal>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
