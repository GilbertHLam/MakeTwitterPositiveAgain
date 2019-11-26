import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import "./styles.css";
import { Slide } from "@material-ui/core";
import SideDrawer from "../sideDrawer";
import SortMenu from "../sortMenu";
import { CalendarToday } from "@material-ui/icons";
import { useStateValue } from "../../state";

export default function NavBar(props: any) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [sortMenuOpen, setSortMenuOpen] = React.useState(false);
  const ref = React.createRef<any>();
  const { dispatch } = useStateValue();

  const setSortMethod = (sortMethod: string) => {
    dispatch({
      type: "setSortMethod",
      sortMethod: sortMethod
    })
  }

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortMenuOpen(true);
  };

  const sortIcon: any = (
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        ref={ref}
      >
        <CalendarToday fontSize="small" />
      </IconButton>
  );

  const HideOnScroll = (props: any) => {
    const { children } = props;
    const trigger = useScrollTrigger();
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  };

  return (
    <>
      <SideDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
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
            {sortIcon}
            <SortMenu
              iconButtonRef={sortIcon.ref}
              open={sortMenuOpen}
              setSortMenuOpen={setSortMenuOpen}
              setSortMethod={setSortMethod}
            />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
}
