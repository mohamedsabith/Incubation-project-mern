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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Formik } from "formik";
import * as Yup from "yup";
import { userSignin } from "../../api/index";

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

export default function SignIn() {
  const Navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem("AuthToken")) {
      Navigate("/form")
    }
  },[Navigate])

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event, values) => {
    event.preventDefault();
    setLoading(true);
    userSignin(values)
      .then((response) => {
        setErrorMessage(response.data.error);
        if (response.data.status) {
          localStorage.setItem("AuthToken", response.data.token);
          setSuccess(true);
          setTimeout(() => {
            Navigate("/form");
          }, 1005);
        }
        setLoading(false);
      })
      .catch((error) => {
         alert(error)
         setLoading(false)
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
          Login Successfull
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
            Sign in
          </Typography>
          <Typography color="error" gutterBottom variant="body1">
            {errorMessage}
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
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
                sx={{ mt: 1 }}
              >
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={Boolean(
                    errors.password ||
                      values.password === "" ||
                      errors.email ||
                      values.email === ""
                  )}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link variant="body2">Forgot password?</Link>
                  </Grid>
                  <Grid item>
                    <Link
                      onClick={() => {
                        Navigate("/signup");
                      }}
                      variant="body2"
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
