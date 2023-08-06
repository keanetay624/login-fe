import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from "react-router-dom";

export function MainListItems() {
  const navigate = useNavigate();
  const handleDashboardButtonClick = () => {
    navigate("/dashboard");
  }
  return (
    <React.Fragment>
    <ListItemButton onClick={handleDashboardButtonClick}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </React.Fragment>
  )
}

export function SecondaryListItems() {
  const navigate = useNavigate();
  const handleManageEmployeeButtonClick = () => {
    navigate("/manageEmployees");
  }
  return (
    <React.Fragment>
    <ListSubheader component="div" inset>
      Manager Actions
    </ListSubheader>
    <ListItemButton onClick={handleManageEmployeeButtonClick}>
      <ListItemIcon>
        <PeopleAltIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Employees" />
    </ListItemButton>
  </React.Fragment>
  )
}