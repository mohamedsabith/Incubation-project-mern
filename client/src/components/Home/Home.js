import React, { useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import avatar from "../../assets/avatar.svg";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { usernameContext } from "../../store/usernameContext";
import jwtDecode from "jwt-decode";
import "./style.css";
import { userContext } from "../../store/userContext";
import { applicationStatus } from "../../api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const Navigate = useNavigate();
  const { username } = useContext(usernameContext);
  const { user } = useContext(userContext);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const decodedToken = jwtDecode(localStorage.getItem("AuthToken"));
    if (decodedToken) {
      applicationStatus(decodedToken.email)
        .then((response) => {
          setStatus(response.data.status);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      Navigate("/");
    }
  }, [Navigate]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "40vh",
            justifyContent: "center",
            alignItems: "center",
            mt: 21,
            borderRadius: 5,
          }}
        >
          <img src={avatar} alt="Avatar" className="avatar" />
          <Typography
            variant="h5"
            sx={{ textAlign: "center", textTransform: "uppercase" }}
          >
           Welcome {username}!
          </Typography>
          <Typography
            variant="body1"
            color="secondary"
            align="center"
            gutterBottom
            sx={{ textTransform: "uppercase" }}
          >
            {user}
          </Typography>

          {status === "Pending" ? (
            <Alert
              severity="info"
              sx={{
                width: "70%",
                marginLeft: { xs: 5, md: 12 },
                mt: 3,
                height: { xs: "20%", sm: "25%" },
              }}
            >
              <AlertTitle style={{ textAlign: "start" }}>
                Apllication Status
              </AlertTitle>
              Your application is <strong>pending</strong>
            </Alert>
          ) : null}
          {status === "Declined" ? (
            <Alert
              severity="error"
              sx={{
                width: "70%",
                marginLeft: { xs: 5, md: 12 },
                mt: 3,
                height: { xs: "20%", sm: "25%" },
              }}
            >
              <AlertTitle style={{ textAlign: "start" }}>
                Apllication Status
              </AlertTitle>
              Sorry your application is <strong>rejected</strong>
            </Alert>
          ) : null}
          {status === "Process" ? (
            <Alert
              severity="warning"
              sx={{
                width: "70%",
                marginLeft: { xs: 5, md: 12 },
                mt: 3,
                height: { xs: "20%", sm: "25%" },
              }}
            >
              <AlertTitle style={{ textAlign: "start" }}>
                Apllication Status
              </AlertTitle>
              Sorry your application is <strong>processing</strong>
            </Alert>
          ) : null}
          {status === "Approved" ? (
            <Alert
              severity="success"
              style={{ textAlign: "start" }}
              sx={{
                width: "70%",
                marginLeft: { xs: 5, md: 12 },
                mt: 3,
                height: { xs: "20%", sm: "25%" },
              }}
            >
              <AlertTitle>Apllication Status</AlertTitle>
              Congrats your application is <strong>accepted</strong>
            </Alert>
          ) : null}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Home;
