import React, {FC} from 'react';
import {AppBar as MuiAppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Props {
  logoutHandler: () => void
}

const AppBar: FC<Props> = ({logoutHandler}) => {
  return (
    <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
          Clipped drawer
        </Typography>
        <Button color="inherit" onClick={logoutHandler}>Logout</Button>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;