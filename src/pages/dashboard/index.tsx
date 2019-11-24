import React, { useState, useEffect } from "react";
import { getProfile } from "../../utils/apiCalls";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { RecordVoiceOver, TrendingUp, Settings } from "@material-ui/icons";
import YourTweets from "../yourTweets";
import NavBar from "../../components/navBar";
import "./styles.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { lightBlue, green } from "@material-ui/core/colors";
import { Redirect } from "react-router";

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: green
  },
  overrides: {
    MuiBottomNavigation: {
      root: {
        "-webkit-box-shadow": "0 10px 20px rgba(0,0,0,0.34)",
        "-moz-box-shadow": "0 10px 20px rgba(0,0,0,0.34)",
        "box-shadow": "0 10px 20px rgba(0,0,0,0.34)",
        "font-weight": "800"
      }
    },
    MuiTypography: {
      colorTextSecondary:{
        "color": "white",
        "line-height": "1"
      },
      h5: {
        "font-weight": "700",
        "margin": "auto",
        "font-family": [
          "-apple-system",
          "Helvetica Neue",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join(",")
      }
    }
  }
});

interface DashboardProps extends React.HTMLProps<HTMLDivElement> {
  location: any;
}

const Dashboard: React.FC<DashboardProps> = (props: { location: any }) => {
  console.log(props.location.state);
  const [value, setValue] = useState(0);

  if (!props.location.state) {
    return (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    );
  }

  const yourTweets = (
    <YourTweets
      oauth_token={props.location.state.oauth_token}
      oauth_token_secret={props.location.state.oauth_token_secret}
      screen_name={props.location.state.screen_name}
    />
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="dashboard">
        {yourTweets}
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
