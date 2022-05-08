import React from "react";
import {
  Divider,
  Drawer as MuiDrawer,
  List, ListItem,
  ListItemIcon,
  ListItemText, Toolbar,
} from "@mui/material";
import Box from "@mui/material/Box";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon   from "@mui/icons-material/Mail";
import ListItemButton from "@mui/material/ListItemButton";

const drawerWidth = 240;

const DrawerComp = () => {
  return (
    <MuiDrawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem disablePadding key={text}>
              <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem disablePadding key={text}>
              <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </MuiDrawer>
  );
};

export default DrawerComp;