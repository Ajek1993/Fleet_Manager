import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { app } from "../../firebase";

export default function UserUpdate() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

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

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const handleChange = ({ target: { value } }) => {
    setUser(value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const auth = getAuth(app);

    updateProfile(auth.currentUser, {
      displayName: user,
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error occurred
        // ...
      });

    setUser("");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Zaktualizuj dane użytkownika
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
          <Box component="form" onSubmit={handleSave} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Nazwa użytkownika"
              autoComplete="user"
              autoFocus
              name="user"
              type="text"
              placeholder="Podaj nazwę użytkownika"
              value={user}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
            >
              Zapisz
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
