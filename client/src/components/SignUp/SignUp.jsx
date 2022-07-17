import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { userSignup } from "../../api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Incubation</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  const Navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem("AuthToken")) {
      Navigate("/form")
    }
  },[Navigate])

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event, values) => {
    event.preventDefault();
    setLoading(true);
    userSignup(values)
      .then((response) => {
        setError(response.data.error);
        if (response.data.status) {
          setSuccess(true);
          localStorage.setItem("AuthToken", response.data.token);
          setTimeout(() => {
            Navigate("/signin");
          }, 1005);
        }
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Snackbar
        open={success}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={1000}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Registration Successfull
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 17,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Typography color="error" gutterBottom variant="body1">
            {error}
          </Typography>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required").max(255),
              email: Yup.string()
                .email("Email must be valid")
                .required("Email is required")
                .max(255),
              password: Yup.string()
                .required("Password is required")
                .max(255)
                .min(6),
            })}
          >
            {({ handleChange, values, errors, touched, handleBlur }) => (
              <Box
                component="form"
                onSubmit={(e) => {
                  handleSubmit(e, values);
                }}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      type="text"
                      required
                      fullWidth
                      id="Name"
                      label="Name"
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      type="email"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      inputMode="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={Boolean(
                    errors.password ||
                      values.password === "" ||
                      errors.email ||
                      values.email === "" ||
                      errors.name ||
                      values.name === ""
                  )}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      onClick={() => {
                        Navigate("/signin");
                      }}
                      variant="body2"
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
