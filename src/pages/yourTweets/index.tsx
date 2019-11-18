import React, { useState, useEffect } from "react";
import {
  Typography,
  Avatar,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  Button
} from "@material-ui/core";
import "./styles.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { lightBlue, green } from "@material-ui/core/colors";
import Tweet from "../../components/tweet";
import {
  Send,
  Drafts,
  Inbox,
  CalendarToday,
  ThumbUp,
  ThumbDown
} from "@material-ui/icons";

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: green
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "Raleway",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  overrides: {
    MuiCardContent: {
      root: {
        "padding-top": "0"
      }
    },
    MuiButton: {
      root: {
        "font-family": "Roboto",
        color: "white"
      }
    }
  }
});

interface YourTweetsProps extends React.HTMLProps<HTMLDivElement> {
  screen_name: String;
  oauth_token: String;
  oauth_token_secret: String;
}

const YourTweets: React.FC<YourTweetsProps> = (props: YourTweetsProps) => {
  //   const req = getProfile(
  //     props.oauth_token,
  //     props.oauth_token_secret
  //   )
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then((data: any) => {
  //       console.log(data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="your-tweets">
        <div className="header">
          <Avatar
            alt="Avatar"
            src="https://pbs.twimg.com/media/C8QsNInXUAAyjZQ.jpg"
            className={"avatar"}
          />
          <Typography variant="h6">{`Your Tweets`}</Typography>
          <div className="drop-down-menu">
            <Button
              onClick={(event) => {
                handleClick(event);
              }}
            >
              <CalendarToday fontSize="small" />
            </Button>
            <Menu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
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
        </div>
        <Tweet
          score={76}
          content="Republicans & others must remember, the Ukrainian President and Foreign Minister both said that there was no pressure placed on them whatsoever. Also, they didn’t even know the money wasn’t paid, and got the money with no conditions. But why isn’t Germany, France (Europe) paying?"
          date="November 5th, 2019"
        />
        <Tweet
          score={14}
          content="Hey this is a tweet!"
          date="September 5th, 2019"
        />
        <Tweet
          score={31}
          content="Hey this is a tweet!"
          date="September 5th, 2019"
        />
        <Tweet
          score={6}
          content="Hey this is a tweet!"
          date="September 5th, 2019"
        />
        <Tweet
          score={97}
          content="Hey this is a tweet!"
          date="September 5th, 2019"
        />
      </div>
    </ThemeProvider>
  );
};

export default YourTweets;
