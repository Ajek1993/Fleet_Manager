import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CarsFormEdit from "./CarsFormEdit";
import { useUser } from "../../providers/UserProvider";

export default function CarInfo({
  carInfo: {
    plate,
    brand,
    model,
    insurance,
    technicalExamination,
    oilChange,
    actualMilage,
  },
}) {
  const { deleteCar } = useUser();
  const rows = [
    brand,
    model,
    insurance,
    technicalExamination,
    oilChange,
    actualMilage,
  ];

  const rowsNames = [
    "Marka",
    "Model",
    "Data ważności polisy OC",
    "Data kolejnego badania technicznego",
    "Data kolejnej wymiany oleju",
    "Aktualny przebieg",
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
    p: 2,
  };
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
    setOpenModalDelete(false);
  };

  const handleEdit = () => {
    setOpenModal(true);
  };

  const handleDelete = async () => {
    console.log(plate);
    setOpenModalDelete(true);
  };

  const handleDeleteFotSure = async () => {
    deleteCar(plate);
    setOpenModalDelete(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={row + i}
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
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: "6px 0",
                }}
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
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CarsFormEdit
            handleClose={handleClose}
            carInfo={{
              plate,
              brand,
              model,
              insurance,
              technicalExamination,
              oilChange,
              actualMilage,
            }}
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
