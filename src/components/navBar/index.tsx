import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Menu from "@material-ui/core/Menu";
import {
  ListItemIcon,
  ListItemText,
  Slide,
  Drawer,
  List,
  ListItem,
  Divider
} from "@material-ui/core";
import {
  CalendarToday,
  ThumbUp,
  ThumbDown,
  Inbox,
  Mail
} from "@material-ui/icons";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement;
}

export default function NavBar(props: Props) {
  const [auth, setAuth] = React.useState(true);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sideList = () => (
    <div
      role="presentation"
      onClick={()=>setDrawerOpen(false)}
      onKeyDown={()=>setDrawerOpen(false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const HideOnScroll = (props: Props) => {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
    console.log(trigger);
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  };

  return (
    <>
      <Drawer
        open={drawerOpen}
        onClose={e => {
          setDrawerOpen(false);
        }}
      >
        {sideList()}
      </Drawer>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className=""
              color="inherit"
              aria-label="menu"
              onClick={e => {
                setDrawerOpen(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5">{`Your Tweets`}</Typography>
            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <CalendarToday fontSize="small" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <h3>{`Sort By: `}</h3>
                  <MenuItem>
                    <ListItemIcon>
                      <CalendarToday fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Most Recent" />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ThumbUp fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Most Positive" />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ThumbDown fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Most Negative" />
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
}
