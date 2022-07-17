import React, { useEffect, useState } from "react";
import { Grid, Box, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import {
  getAllSlots,
  getAllApprovedApplication,
  slotAlocation,
} from "../../../api";

export default function SimplePaper() {
 
  const Navigate = useNavigate()

  const [slotA, setSlotA] = useState([]);
  const [slotB, setSlotB] = useState([]);
  const [slotC, setSlotC] = useState([]);
  const [slotD, setSlotD] = useState([]);
  const [slotE, setSlotE] = useState([]);
  const [approved, setApproved] = useState([]);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState("");
  const [slot, setSlot] = useState("");

  const allSlots = () => {
    getAllSlots()
      .then((response) => {
        setSlotA(response.data.sectionA);
        setSlotB(response.data.sectionB);
        setSlotC(response.data.sectionC);
        setSlotD(response.data.sectionD);
        setSlotE(response.data.sectionE);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const approvedApplications = () => {
    getAllApprovedApplication()
      .then((response) => {
        setApproved(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const slotSubmit = () => {
    if (select === "") {
      swal("Please select application");
    } else {
      slotAlocation(select, slot)
        .then((response) => {
          allSlots()
          setOpen(false);
        })
        .catch((error) => {
          alert(error);
          setOpen(false);
        });
    }
  };

  useEffect(() => {

    if(!localStorage.getItem("AdminToken")){
      Navigate("/admin")
    }

    allSlots();
    approvedApplications();
  }, []);

  const handleClickOpen = (e, value) => {
    setSlot(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid
        sx={{
          flexGrow: 1,
          mt: { xs: 4, sm: 7, md: 10 },
          ml: { xs: 0, sm: 0, md: 10 },
        }}
        container
        spacing={2}
      >
        <Grid item xs={12} md={2}>
          <Grid container justifyContent="center" spacing={1}>
            {slotA.map((value, index) => (
              <Grid key={index} item>
                <Paper
                  sx={{
                    height: 100,
                    width: 100,
                    backgroundColor: value.isBooked
                      ? "primary.main"
                      : "primary.dark",
                    opacity: value.isBooked && [0.9, 0.8, 0.7],
                    "&:hover": {
                      backgroundColor: "primary.main",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                  onClick={(e) => handleClickOpen(e, value)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={2}>
          <Grid container justifyContent="center" spacing={1}>
            {slotB.map((value, index) => (
              <Grid key={index} item>
                <Paper
                  sx={{
                    height: 100,
                    width: 100,
                    backgroundColor: value.isBooked
                      ? "primary.main"
                      : "primary.dark",
                    opacity: value.isBooked && [0.9, 0.8, 0.7],
                    "&:hover": {
                      backgroundColor: "primary.main",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                  onClick={(e) => handleClickOpen(e, value)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={2}>
          <Grid container justifyContent="center" spacing={1}>
            {slotC.map((value, index) => (
              <Grid key={index} item>
                <Paper
                  sx={{
                    height: 100,
                    width: 100,
                    backgroundColor: value.isBooked
                      ? "primary.main"
                      : "primary.dark",
                    opacity: value.isBooked && [0.9, 0.8, 0.7],
                    "&:hover": {
                      backgroundColor: "primary.main",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                  onClick={(e) => handleClickOpen(e, value)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={2}>
          <Grid container justifyContent="center" spacing={1}>
            {slotD.map((value, index) => (
              <Grid key={index} item>
                <Paper
                  sx={{
                    height: 100,
                    width: 100,
                    backgroundColor: value.isBooked
                      ? "primary.main"
                      : "primary.dark",
                    opacity: value.isBooked && [0.9, 0.8, 0.7],
                    "&:hover": {
                      backgroundColor: "primary.main",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                  onClick={(e) => handleClickOpen(e, value)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={2}>
          <Grid container justifyContent="center" spacing={1}>
            {slotE.map((value, index) => (
              <Grid key={index} item>
                <Paper
                  sx={{
                    height: 100,
                    width: 100,
                    backgroundColor: value.isBooked
                      ? "primary.main"
                      : "primary.dark",
                    opacity: value.isBooked && [0.9, 0.8, 0.7],
                    "&:hover": {
                      backgroundColor: "primary.main",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                  onClick={(e) => handleClickOpen(e, value)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
          <DialogTitle>Optional sizes</DialogTitle>
          <DialogContent>
            <DialogContentText>Please select application.</DialogContentText>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "auto",
                width: "fit-content",
              }}
            >
              <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Applications"
                  fullWidth
                  helperText="Please select application."
                >
                  {approved.map((option, index) => {
                    if (option.slotAllocation === false) {
                      return (
                        <MenuItem
                          key={index}
                          value={option.companyName}
                          onClick={(e) => {
                            setSelect(option);
                          }}
                        >
                          {option.companyName}
                        </MenuItem>
                      );
                    }
                  })}
                </TextField>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={slotSubmit}>Save Changes</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
}
