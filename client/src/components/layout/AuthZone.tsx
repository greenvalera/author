import React, {FC, ReactNode} from 'react';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import Toolbar from '@mui/material/Toolbar';

const AuthZone: FC<ReactNode> = ({children}) => (
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar />
    <Drawer />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      {children}
    </Box>
  </Box>
);

export default AuthZone;