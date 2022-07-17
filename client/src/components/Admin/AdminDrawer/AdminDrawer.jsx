import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import {Typography} from '@mui/material'
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppsIcon from '@mui/icons-material/Apps';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom';

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <>
      <CssBaseline />

      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        <Typography variant='h6' color="primary" sx={{alignItems:"center",textAlign:"center",justifyContent:"center",mr:4}}>INCUBATION</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List sx={{width:250}}>
          {["Application List", "Record Track", "Booking Slots", "Schedule Events", "Videos", "Payment", "Logout"].map((text, index) => (
            <ListItem  key={text} disablePadding>
              <ListItemButton LinkComponent={Link}
                to={text === 'Application List' ? '/admin/dashboard':
                text === 'Record Track' ? '/admin/record': text === "Booking Slots" ? '/admin/slot' :
               '/admin/dashboard'}
              >
                <ListItemIcon>
                {index === 0 ? <AppsIcon  color="primary"/> 
                : index=== 1 ? <DashboardIcon color="primary" /> :
                 index ===2 ? <CalendarMonthIcon color="primary" />: 
                 index===3 ? <EventIcon  color="primary"/> : 
                 index===4 ? <PlayCircleIcon color="primary"/>:
                 index===5 ? <PaymentIcon color="primary"/> :
                 index===6 ? <LogoutIcon color="primary"/> : ""}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>
    </>
  );
}