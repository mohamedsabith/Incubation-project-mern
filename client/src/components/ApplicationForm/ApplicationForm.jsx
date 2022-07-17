import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import LinearProgress from "@mui/material/LinearProgress";
import { countries } from "./Countries";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { userApplicationForm, applicationExist } from "../../api";
import { userContext } from "../../store/userContext";
import jwtDecode from "jwt-decode";

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ApplicationForm() {
  const Navigate = useNavigate();
  const { user } = useContext(userContext);
  useEffect(() => {
    const Auth = localStorage.getItem("AuthToken");
    if (Auth) {
      const decodedToken = jwtDecode(localStorage.getItem("AuthToken"));
      applicationExist(decodedToken.email)
        .then((response) => {
          if (response.data.status) {
            Navigate("/home");
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      Navigate("/");
    }
  }, [Navigate]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [country, setCountry] = useState("");
  const [incubationType, setIncubationType] = useState("");

  const handleSubmit = (event, values) => {
    event.preventDefault();
    setLoading(true);
    const data = { values, country, incubationType, user };
    userApplicationForm(data)
      .then((response) => {
        setSuccess(true);
        if (response.data.status) {
          setTimeout(() => {
            Navigate("/home");
          }, 1005);
          setLoading(false);
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
          Application submitted Successfully
        </Alert>
      </Snackbar>

      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 900 }}>
            APPLICATION FORM
          </Typography>
          <Formik
            initialValues={{
              name: "",
              address: "",
              state: "",
              city: "",
              pincode: "",
              email: "",
              number: "",
              companyName: "",
              logo: "",
              teamDescription: "",
              productDescription: "",
              problemSolve: "",
              uniqueSolution: "",
              propositionCustomer: "",
              competitors: "",
              revenueModel: "",
              potentialMarket: "",
              planProducts: "",
              businessProposal: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required").max(255),
              address: Yup.string().required("Address is required").max(255),
              state: Yup.string().required("State is required").max(255),
              city: Yup.string().required("City is required").max(255),
              pincode: Yup.number("Pincode must be number").required(
                "Pincode is required"
              ),
              email: Yup.string()
                .email("Email must be valid")
                .required("Email is required")
                .max(255),
              number: Yup.number("Number must be number").required(
                "phone number is required"
              ),
              companyName: Yup.string()
                .required("Company name is required")
                .max(255),
              logo: Yup.string().required("Company logo is required").max(255),
              teamDescription: Yup.string()
                .required("Your team and background description is required")
                .min(10)
                .max(255),
              productDescription: Yup.string()
                .required("Your company and product description is required")
                .min(10)
                .max(255),
              problemSolve: Yup.string()
                .required("Problem your are trying to solve is required")
                .min(10)
                .max(255),
              uniqueSolution: Yup.string()
                .required("Unique about your solution is required")
                .min(10)
                .max(255),
              propositionCustomer: Yup.string()
                .required("Your value propostion for the customer is required")
                .max(255),
              competitors: Yup.string()
                .required(
                  "Your competitors and what is your competative advantage is required"
                )
                .max(255),
              revenueModel: Yup.string()
                .required("Revenue model is required")
                .min(10)
                .max(255),
              potentialMarket: Yup.string()
                .required("Potential market size of the product is required")
                .max(255),
              planProducts: Yup.string()
                .required(
                  "Your market or plan to market your products and services is required"
                )
                .max(255),
              businessProposal: Yup.string()
                .required("Upload a detailed business proposal is required")
                .max(200),
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
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address}
                      required
                      fullWidth
                      id="Address"
                      label="Address"
                      name="address"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      id="country-select-demo"
                      fullWidth
                      options={countries}
                      autoHighlight
                      onChange={(e, value) => setCountry(value.label)}
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                          />
                          {option.label} ({option.code}) +{option.phone}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose a country"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.state && errors.state)}
                      helperText={touched.state && errors.state}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.state}
                      required
                      fullWidth
                      id="State"
                      label="State"
                      name="state"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city}
                      name="city"
                      required
                      fullWidth
                      id="City"
                      label="City"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.pincode && errors.pincode)}
                      helperText={touched.pincode && errors.pincode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.pincode}
                      required
                      fullWidth
                      id="Pincode"
                      type="number"
                      label="Pincode"
                      name="pincode"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      required
                      fullWidth
                      id="Email"
                      type="email"
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.number && errors.number)}
                      helperText={touched.number && errors.number}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.number}
                      required
                      fullWidth
                      id="Phone no"
                      label="Phone no"
                      type="number"
                      name="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.companyName && errors.companyName)}
                      helperText={touched.companyName && errors.companyName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.companyName}
                      required
                      fullWidth
                      id="Company Name"
                      label="Company Name"
                      name="companyName"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.logo && errors.logo)}
                      helperText={touched.logo && errors.logo}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.logo}
                      required
                      fullWidth
                      id="Company Logo"
                      InputLabelProps={{ shrink: true }}
                      label="Company Logo"
                      type="file"
                      name="logo"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(
                        touched.teamDescription && errors.teamDescription
                      )}
                      helperText={
                        touched.teamDescription && errors.teamDescription
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.teamDescription}
                      required
                      fullWidth
                      id="team"
                      label="Describe your Team and Background"
                      name="teamDescription"
                      InputProps={{ sx: { height: 80 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(
                        touched.productDescription && errors.productDescription
                      )}
                      helperText={
                        touched.productDescription && errors.productDescription
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.productDescription}
                      required
                      fullWidth
                      id="company"
                      label="Describe your Company and Products"
                      name="productDescription"
                      InputProps={{ sx: { height: 80 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(
                        touched.problemSolve && errors.problemSolve
                      )}
                      helperText={touched.problemSolve && errors.problemSolve}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.problemSolve}
                      required
                      fullWidth
                      id="problem"
                      label="Describe the problem your are trying to solve"
                      name="problemSolve"
                      InputProps={{ sx: { height: 80 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(
                        touched.uniqueSolution && errors.uniqueSolution
                      )}
                      helperText={
                        touched.uniqueSolution && errors.uniqueSolution
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.uniqueSolution}
                      required
                      fullWidth
                      id="solution"
                      label="What is unique about your solution?"
                      name="uniqueSolution"
                      InputProps={{ sx: { height: 80 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(
                        touched.propositionCustomer &&
                          errors.propositionCustomer
                      )}
                      helperText={
                        touched.propositionCustomer &&
                        errors.propositionCustomer
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.propositionCustomer}
                      required
                      fullWidth
                      id="proposition"
                      label="What is your value proposition for the customer?"
                      name="propositionCustomer"
                      InputProps={{ sx: { height: 80 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.competitors && errors.competitors)}
                      helperText={touched.competitors && errors.competitors}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.competitors}
                      required
                      fullWidth
                      id="competitors"
                      label="Who are your competitors and what is your competative advantage?"
                      name="competitors"
                      InputProps={{ sx: { height: 80 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(
                        touched.revenueModel && errors.revenueModel
                      )}
                      helperText={touched.revenueModel && errors.revenueModel}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.revenueModel}
                      required
                      fullWidth
                      id="revenue"
                      label="Explain your revenue model"
                      name="revenueModel"
                      InputProps={{ sx: { height: 80 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(
                        touched.potentialMarket && errors.potentialMarket
                      )}
                      helperText={
                        touched.potentialMarket && errors.potentialMarket
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.potentialMarket}
                      required
                      fullWidth
                      id="market"
                      label="What is the potential market size of the product?"
                      name="potentialMarket"
                      InputProps={{ sx: { height: 80 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(
                        touched.planProducts && errors.planProducts
                      )}
                      helperText={touched.planProducts && errors.planProducts}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.planProducts}
                      required
                      fullWidth
                      id="plan"
                      label="How do you market or plan to market your products and services"
                      name="planProducts"
                      InputProps={{ sx: { height: 80 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Type of incubation needed
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        onChange={(e, value) => setIncubationType(value)}
                      >
                        <FormControlLabel
                          value="Physical Incubation"
                          control={<Radio />}
                          label="Physical Incubation"
                        />
                        <FormControlLabel
                          value="Virtual Incubation"
                          control={<Radio />}
                          label="Virtual Incubation"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(
                        touched.businessProposal && errors.businessProposal
                      )}
                      helperText={
                        touched.businessProposal && errors.businessProposal
                      }
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.businessProposal}
                      required
                      fullWidth
                      id="proposal"
                      label="Upload a detailed business proposal"
                      name="businessProposal"
                      InputProps={{ sx: { height: 80 } }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={Boolean(
                    errors.name ||
                      values.name === "" ||
                      errors.address ||
                      values.address === "" ||
                      errors.state ||
                      values.state === "" ||
                      errors.city ||
                      values.city === "" ||
                      errors.pincode ||
                      values.pincode === "" ||
                      errors.email ||
                      values.email === "" ||
                      errors.number ||
                      values.number === "" ||
                      errors.companyName ||
                      values.companyName === "" ||
                      errors.logo ||
                      values.logo === "" ||
                      errors.teamDescription ||
                      values.teamDescription === "" ||
                      errors.productDescription ||
                      values.productDescription === "" ||
                      errors.problemSolve ||
                      values.problemSolve === "" ||
                      errors.uniqueSolution ||
                      values.uniqueSolution === "" ||
                      errors.propositionCustomer ||
                      values.propositionCustomer === "" ||
                      errors.competitors ||
                      values.competitors === "" ||
                      errors.revenueModel ||
                      values.revenueModel === "" ||
                      errors.potentialMarket ||
                      values.potentialMarket === "" ||
                      errors.planProducts ||
                      values.planProducts === "" ||
                      errors.businessProposal ||
                      values.businessProposal === "" ||
                      country === "" ||
                      incubationType === ""
                  )}
                >
                  SUBMIT
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
