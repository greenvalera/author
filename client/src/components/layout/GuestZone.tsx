import React, {FC, ReactNode} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import {Container} from "@mui/material";

const GuestZone: FC<ReactNode> = ({children}) => (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    {children}
  </Container>

);

export default GuestZone;