import React from "react";
import "./styles.css";
import {
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  ListItem,
  Divider
} from "@material-ui/core";
import {
  Settings,
  ExitToApp,
  ChatBubble,
  Timeline,
  TrendingUp
} from "@material-ui/icons";

interface SideDrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

export default function SideDrawer(props: SideDrawerProps) {
  const { drawerOpen, setDrawerOpen } = props;

  const sideList = () => (
    <div
      role="presentation"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <ChatBubble />
          </ListItemIcon>
          <ListItemText primary={"Your Tweets"} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Timeline />
          </ListItemIcon>
          <ListItemText primary={"Timeline"} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TrendingUp />
          </ListItemIcon>
          <ListItemText primary={"Trends"} />
        </ListItem>
      </List>
      <Divider />
      <div className="footer">
        <List>
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary={"Preferences"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={"Log Out"} />
          </ListItem>
        </List>
      </div>
    </div>
  );

  return (
    <>
      <Drawer open={drawerOpen} onClose={()=>setDrawerOpen(false)}>
        {sideList()}
      </Drawer>
    </>
  );
}
