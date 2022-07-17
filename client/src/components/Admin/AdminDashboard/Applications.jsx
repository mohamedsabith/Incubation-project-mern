import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import { Button, Typography } from "@mui/material";
import {
  getAllApplications,
  approveApplication,
  declinedApplication,
  processApplication,
} from "../../../api";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import CachedIcon from "@mui/icons-material/Cached";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import moment from "moment";
import {useNavigate} from 'react-router-dom';

export default function BasicTable() {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const Navigate = useNavigate()

  const [open, setOpen] = useState(false);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState("");

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

  const handleClickOpen = (event, index) => {
    const details = applications[index];
    setDetails(details);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {

      if(!localStorage.getItem("AdminToken")){
        Navigate("/admin")
      }
    
    setLoading(true);
    allApplications();
  }, []);


  const applicationApprove = (event, index) => {
    event.preventDefault();
    setLoading(true);
    const form = applications[index];
    approveApplication(form._id)
      .then((response) => {
        allApplications();
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  const applicationProcess = (event, index) => {
    event.preventDefault();
    setLoading(true);
    const form = applications[index];
    processApplication(form._id)
      .then((response) => {
        allApplications();
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  const applicationDeclined = (event, index) => {
    event.preventDefault();
    setLoading(true);
    const form = applications[index];
    declinedApplication(form._id)
      .then((response) => {
        allApplications();
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  return (
    <>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Typography
        variant="h6"
        sx={{ textTransform: "uppercase", fontWeight: 900 }}
      >
        Pending Applications
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 1 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.no</TableCell>
              <TableCell>Company name</TableCell>
              <TableCell>Company Details</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Approve</TableCell>
              <TableCell>Process</TableCell>
              <TableCell>Declined</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((res, index) => {
              if (res.status === "Pending") {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{res.companyName}</TableCell>
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

                                <strong>
                                  Discribe your team and background
                                </strong>
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
                                  What is your value proposition for the
                                  customer?
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
                      {moment(res.created).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="success"
                        size="small"
                        endIcon={<DoneIcon />}
                        onClick={(event) => {
                          applicationApprove(event, index);
                        }}
                      >
                        Approve
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        endIcon={<CachedIcon />}
                        onClick={(event) => {
                          applicationProcess(event, index);
                        }}
                      >
                        Process
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        endIcon={<CancelIcon />}
                        onClick={(event) => {
                          applicationDeclined(event, index);
                        }}
                      >
                        Declined
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        variant="h6"
        sx={{ textTransform: "uppercase", fontWeight: 900, mt: 4 }}
      >
        Processing Applications
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 1 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.no</TableCell>
              <TableCell>Company name</TableCell>
              <TableCell>Company Details</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Approve</TableCell>
              <TableCell>Declined</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((res, index) => {
              if (res.status === "Process") {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{res.companyName}</TableCell>
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

                                <strong>
                                  Discribe your team and background
                                </strong>
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
                                  What is your value proposition for the
                                  customer?
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
                      {moment(res.created).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="success"
                        size="small"
                        endIcon={<DoneIcon />}
                        onClick={(event) => {
                          applicationApprove(event, index);
                        }}
                      >
                        Approve
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        endIcon={<CancelIcon />}
                        onClick={(event) => {
                          applicationDeclined(event, index);
                        }}
                      >
                        Declined
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        variant="h6"
        sx={{ textTransform: "uppercase", fontWeight: 900, mt: 4 }}
      >
        Approved Applications
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 1 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.no</TableCell>
              <TableCell>Company name</TableCell>
              <TableCell>Company Details</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Company Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((res, index) => {
              if (res.status === "Approved") {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{res.companyName}</TableCell>
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

                                <strong>
                                  Discribe your team and background
                                </strong>
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
                                  What is your value proposition for the
                                  customer?
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
                      {moment(res.created).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        endIcon={<CancelIcon />}
                        onClick={(event) => {
                          applicationDeclined(event, index);
                        }}
                      >
                        Declined
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        variant="h6"
        sx={{ textTransform: "uppercase", fontWeight: 900, mt: 4 }}
      >
        Declined Applications
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 1 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.no</TableCell>
              <TableCell>Company name</TableCell>
              <TableCell>Company Details</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Company Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((res, index) => {
              if (res.status === "Declined") {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{res.companyName}</TableCell>
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

                                <strong>
                                  Discribe your team and background
                                </strong>
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
                                  What is your value proposition for the
                                  customer?
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
                      {moment(res.created).format("YYYY-MM-DD HH:mm:ss")}
                    </TableCell>
                    <TableCell sx={{ display: "flex" }}>
                      <Typography color="error">DECLINED</Typography>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
