import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Button, Typography, Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import ErrorIcon from "@mui/icons-material/Error";
import { Container } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {useNavigate} from 'react-router-dom';
import { getAllApplications } from "../../../api";

const steps = ["Pending", "Processing", "Approved"];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

export default function BasicTable() {

  const Navigate = useNavigate()

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState("");

  const handleClickOpen = (event, index) => {
    const details = applications[index];
    setDetails(details);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const allApplications = () => {
    getAllApplications()
      .then((response) => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    

    if(!localStorage.getItem("AdminToken")){
      Navigate("/admin")
    }

    setLoading(true);
    allApplications();
  }, []);

  return (
    <Container>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.no</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Company Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((result, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}.
                  </TableCell>
                  <TableCell>{result.companyName}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      endIcon={<VisibilityIcon />}
                      onClick={(event) => {
                        handleClickOpen(event, index);
                      }}
                    >
                      Details
                    </Button>
                    <Dialog
                      open={open}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle
                        color="primary"
                        sx={{ textTransform: "uppercase" }}
                      >
                        {details.companyName}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          <Box
                            fullWidth
                            style={{ maxHeight: "500px", overflow: "scroll" }}
                          >
                            <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              <strong>Name : </strong>
                              {details.name}
                              <br></br>
                              <strong>Phone : </strong>
                              {details.number}
                              <br></br>
                              <strong>Email : </strong>
                              {details.email}
                              <br></br>
                              <strong>Address : </strong>
                              {details.address}
                              <br></br>
                              <strong>Country : </strong>
                              {details.country}
                              <br></br>
                              <strong>State : </strong>
                              {details.state}
                              <br></br>
                              <strong>City : </strong>
                              {details.city}
                              <br></br>

                              <strong>Discribe your team and background</strong>
                              <br></br>
                              {details.teamDescription}
                              <br></br>

                              <strong>
                                Discribe your company and products
                              </strong>
                              <br></br>
                              {details.productDescription}
                              <br></br>

                              <strong>
                                What is the problem you are trying to solve
                              </strong>
                              <br></br>
                              {details.problemSolve}
                              <br></br>

                              <strong>
                                What is unique about your solution?
                              </strong>
                              <br></br>
                              {details.uniqueSolution}
                              <br></br>

                              <strong>
                                What is your value proposition for the customer?
                              </strong>
                              <br></br>
                              {details.propositionCustomer}
                              <br></br>

                              <strong>
                                Who are your competitions and what is your
                                competative advantage?
                              </strong>
                              <br></br>
                              {details.competitors}
                              <br></br>

                              <strong>
                                What is the potential market size of your
                                product?
                              </strong>
                              <br></br>
                              {details.potentialMarket}
                              <br></br>

                              <strong>
                                How do you market or plan to market your
                                products and services
                              </strong>
                              <br></br>
                              {details.planProducts}
                              <br></br>

                              <strong>Type of incubation needed</strong>
                              <br></br>
                              {details.incubationType}
                              <br></br>

                              <strong>Bussiness Proposal</strong>
                              <br></br>
                              {details.businessProposal}
                              <br></br>
                            </Typography>
                          </Box>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ width: "100%" }} spacing={4}>
                      <Stepper
                        alternativeLabel
                        activeStep={
                          result.status === "Pending"
                            ? 1
                            : result.status === "Process"
                            ? 2
                            : result.status === "Approved"
                            ? 3
                            : 0
                        }
                        connector={<QontoConnector />}
                      >
                        {result.status === "Declined" ? (
                          <Box sx={{ display: "flex" }}>
                            <Typography color="error">DECLINED</Typography>
                            <ErrorIcon sx={{ color: "red", height: 23 }} />
                          </Box>
                        ) : (
                          steps.map((label) => (
                            <Step key={label}>
                              <StepLabel StepIconComponent={QontoStepIcon}>
                                {label}
                              </StepLabel>
                            </Step>
                          ))
                        )}
                      </Stepper>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
