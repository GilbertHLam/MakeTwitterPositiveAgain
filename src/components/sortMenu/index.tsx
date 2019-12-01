import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import "./styles.css";
import { ListItemIcon, ListItemText } from "@material-ui/core";
import { CalendarToday, ThumbUp, ThumbDown } from "@material-ui/icons";

interface SortMenuProps {
  iconButtonRef: React.RefObject<any>;
  open: boolean;
  setSortMenuOpen: (open: boolean) => void;
  setSortMethod: (selection: string) => void;
}
export default function SortMenu(props: SortMenuProps) {
  const { open, setSortMenuOpen, setSortMethod } = props;

  const handleClose = () => {
    setSortMenuOpen(false);
  };

  return (
    <div className="menu">
      <Menu
        id="menu-appbar"
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <h3>{`Sort By: `}</h3>
        <MenuItem onClick={(event: any) => setSortMethod("recent")}>
          <ListItemIcon>
            <CalendarToday fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Most Recent" />
        </MenuItem>
        <MenuItem onClick={(event: any) => setSortMethod("positive")}>
          <ListItemIcon>
            <ThumbUp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Most Positive" />
        </MenuItem>
        <MenuItem onClick={(event: any) => setSortMethod("negative")}>
          <ListItemIcon>
            <ThumbDown fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Most Negative" />
        </MenuItem>
      </Menu>
    </div>
  );
}
