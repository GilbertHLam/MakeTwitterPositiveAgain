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
import { useStateValue } from "../../state";

interface SideDrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

export default function SideDrawer(props: SideDrawerProps) {
  const { drawerOpen, setDrawerOpen } = props;
  const { state, dispatch } = useStateValue();

  const onPageSelect = (page: string) => {
    dispatch({
      type: "setNavigation",
      navigation: page
    });
  };

  const onLogout = () => {
    dispatch({
      type: "setCredentials",
      credentials: {
        oauth_token: "",
        oauth_token_secret: "",
        screen_name: "",
        user_id: "",
      }
    });
    localStorage.clear();
    window.location.replace(window.location.href.split("/")[0]);
  };

  const sideList = () => (
    <div
      role="presentation"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <ChatBubble
              className={state.navigation === "Your Tweets" ? "current" : ""}
            />
          </ListItemIcon>
          <ListItemText
            primary={"Your Tweets"}
            onClick={e => onPageSelect("Your Tweets")}
            className={state.navigation === "Your Tweets" ? "current" : ""}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Timeline
              className={state.navigation === "Timeline" ? "current" : ""}
            />
          </ListItemIcon>
          <ListItemText
            primary={"Timeline"}
            onClick={e => onPageSelect("Timeline")}
            className={state.navigation === "Timeline" ? "current" : ""}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TrendingUp
              className={state.navigation === "Trends" ? "current" : ""}
            />
          </ListItemIcon>
          <ListItemText
            primary={"Trends"}
            onClick={e => onPageSelect("Trends")}
            className={state.navigation === "Trends" ? "current" : ""}
          />
        </ListItem>
      </List>
      <Divider />
      <div className="footer">
        <List>
          <ListItem button>
            <ListItemIcon>
              <Settings
                className={state.navigation === "Preferences" ? "current" : ""}
              />
            </ListItemIcon>
            <ListItemText
              primary={"Preferences"}
              onClick={e => onPageSelect("Preferences")}
              className={state.navigation === "Preferences" ? "current" : ""}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={"Log Out"} onClick={e => onLogout()}/>
          </ListItem>
        </List>
      </div>
    </div>
  );

  return (
    <>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {sideList()}
      </Drawer>
    </>
  );
}
