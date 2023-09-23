import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CardMedia } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/Ajek1993" target="_blank">
        Arkadiusz Sarach
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = ({ target: { name, value } }) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();

    // Validation
    if (
      !values.email ||
      values.email.indexOf("@") === -1 ||
      values.email.lastIndexOf(".") < values.email.lastIndexOf("@")
    ) {
      setErrors((prev) => ({
        ...prev,
        email: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }

    if (!values.password || values.password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        paswword: "",
      }));
    }

    const auth = getAuth(app);

    const { email, password } = values;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Zarejestrowano pomyślnie");
        setValues({
          email: "",
          password: "",
        });
        navigate("/");
      })
      .catch((error) => {
        alert("Błąd rejestracji");
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          onClick={() => {
            navigate("/");
          }}
          component="img"
          image="https://imgtr.ee/images/2023/09/19/d73eb7df7e4e27cd871af6976e08e485.png"
          alt="Paella dish"
        />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Rejestracja
          </Typography>
          <Box component="form" onSubmit={handleAdd} noValidate sx={{ mt: 1 }}>
            {!errors.email ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                name="email"
                type="email"
                placeholder="Podaj email"
                value={values.email}
                onChange={handleChange}
              />
            ) : (
              <TextField
                error
                helperText="Błędny email"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                name="email"
                type="email"
                placeholder="Podaj email"
                value={values.email}
                onChange={handleChange}
              />
            )}
            {!errors.password ? (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                id="password"
                autoComplete="current-password"
                name="password"
                type="password"
                placeholder="Podaj email"
                value={values.password}
                onChange={handleChange}
              />
            ) : (
              <TextField
                error
                helperText="Błędne hasło. Hasło musi mieć długość min. 6 znaków"
                margin="normal"
                required
                fullWidth
                label="Password"
                id="password"
                autoComplete="current-password"
                name="password"
                type="password"
                placeholder="Podaj email"
                value={values.password}
                onChange={handleChange}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAdd}
            >
              Zarejestruj
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  variant="body2"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  {"Masz konto? Zaloguj się"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
