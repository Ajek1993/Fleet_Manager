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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
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

export default function SignIn() {
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

  const handleLogin = (e) => {
    e.preventDefault();

    // Validation
    if (!values.email) {
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
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Zalogowano pomyślnie");
        navigate("/");
        setValues({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
            Logowanie
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
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
                helperText="Błędny login"
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
                helperText="Błędne hasło"
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
              onClick={handleLogin}
            >
              Zaloguj
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  variant="body2"
                >
                  Zapomniałeś hasła?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Nie masz konta? Zarejestruj się"}
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

export const handleLogout = () => {
  const auth = getAuth(app);
  signOut(auth)
    .then(() => {
      alert("Wylogowano pomyślnie");
    })
    .catch((error) => {
      // An error happened.
    });
};
