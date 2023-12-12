import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import AppBarComponent from "../AppBarComponent/AppBarComponent";



const defaultTheme = createTheme();



export default function LoginComponent() {
  var [errorOpen, setErrorOpen] = useState(false);
  var [successOpen, setSuccessOpen] = useState(false);
  var [errorMessage, setErrorMessage] = useState("");
  var [successMessage, setSuccessMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessOpen(false);
    setErrorOpen(false);
    const data = new FormData(event.currentTarget);

    const requestData = {
      username: data.get("email"),
      password: data.get("password"),
    };
    var response;
    try {
      response = await axios.post(
        "http://52.91.73.7:3001/app/login",
        requestData
      );
      switch (response.status) {
        case 200:
          setSuccessOpen(true);
          setSuccessMessage(response.data.message);
          localStorage.setItem("token", response.data.token);
          window.location.href = "/"
          break;
        default:
          setErrorOpen(true);
          setErrorMessage(response.data.message);
          break;
      }
      // console.log(response.data);

    } catch (error) {
      setErrorMessage("Server error. Please try again Later");
    }
  };

  return (

    <ThemeProvider theme={defaultTheme}>
      <div >
        <AppBarComponent />
        <Container component="main" maxWidth="xs">

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
              Sign in
            </Typography>
            <Collapse in={errorOpen}>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error" id="errormessage">{errorMessage}</Alert>
              </Stack>
            </Collapse>
            <Collapse in={successOpen}>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="success">{successMessage}</Alert>
              </Stack>
            </Collapse>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address/Username"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                id="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}