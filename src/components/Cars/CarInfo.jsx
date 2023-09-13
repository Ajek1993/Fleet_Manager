import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function CarInfo({
  carInfo: {
    plate,
    brand,
    model,
    insurance,
    technicalExamination,
    oilChange,
    startMilage,
  },
}) {
  const rows = [
    brand,
    model,
    insurance,
    technicalExamination,
    oilChange,
    startMilage,
  ];

  const rowsNames = [
    "Marka",
    "Model",
    "Data ważności polisy OC",
    "Data kolejnego badania technicznego",
    "Data kolejnej wymiany oleju",
    "Początkowy przebieg",
  ];

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

  const handleEdit = () => {
    setOpenModal(true);
    console.log("będzie edytowanie");
  };

  const handleDelete = () => {
    console.log("będzie usuwanie");
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={row}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "& > td": { padding: "6px" },
                }}
              >
                <TableCell component="th" scope="row">
                  {rowsNames[i]}
                </TableCell>
                <TableCell align="center">{row}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="center">Akcje</TableCell>
              <TableCell
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <EditIcon onClick={handleEdit} color="warning"></EditIcon>
                <DeleteIcon onClick={handleDelete} color="error"></DeleteIcon>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {openModal && (
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}></Box>
        </Modal>
      )}
    </>
  );
}
