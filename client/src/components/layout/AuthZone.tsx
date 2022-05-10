import React, {FC, ReactNode} from 'react';
import {useDispatch} from "react-redux";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import Toolbar from '@mui/material/Toolbar';
import {logout} from '../../store/authSlice';

const AuthZone: FC<ReactNode> = ({children}) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar logoutHandler={logoutHandler}/>
    <Drawer />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      {children}
    </Box>
  </Box>
)};

export default AuthZone;