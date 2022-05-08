import React, {FC, ReactNode} from 'react';
import {AppBar as MuiAppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";


const AppBar: FC<ReactNode> = () => {
  return (
    <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Clipped drawer
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;