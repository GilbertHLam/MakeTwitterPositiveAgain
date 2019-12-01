import React, { useState } from "react";
import YourTweets from "../yourTweets";
import Timeline from "../timeline";

import "./styles.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { lightBlue, green } from "@material-ui/core/colors";
import { Redirect } from "react-router";
import { useStateValue } from "../../state";
import Trends from "../trends";
import Preferences from "../preferences";
import theme from "../../theme";
import NavBar from "../../components/navBar";

// const theme = createMuiTheme({
//   palette: {
//     primary: lightBlue,
//     secondary: green
//   },
//   overrides: {
//     MuiBottomNavigation: {
//       root: {
//         "-webkit-box-shadow": "0 10px 20px rgba(0,0,0,0.34)",
//         "-moz-box-shadow": "0 10px 20px rgba(0,0,0,0.34)",
//         "box-shadow": "0 10px 20px rgba(0,0,0,0.34)",
//         "font-weight": "800"
//       }
//     },
//     MuiTypography: {
//       colorTextSecondary: {
//         color: "white",
//         "line-height": "1"
//       },
//       h5: {
//         "font-weight": "700",
//         margin: "auto",
//         "font-family": [
//           "-apple-system",
//           "Helvetica Neue",
//           '"Segoe UI"',
//           "Roboto",
//           '"Helvetica Neue"',
//           "Arial",
//           "sans-serif",
//           '"Apple Color Emoji"',
//           '"Segoe UI Emoji"',
//           '"Segoe UI Symbol"'
//         ].join(",")
//       }
//     }
//   }
// });

interface DashboardProps extends React.HTMLProps<HTMLDivElement> {
  location: any;
}

const Dashboard: React.FC<DashboardProps> = (props: { location: any }) => {
  const { state } = useStateValue();
  const oauth_token = state.credentials.oauth_token
    ? state.credentials.oauth_token
    : localStorage.getItem("oauth_token");
  const oauth_token_secret = state.credentials.oauth_token_secret
    ? state.credentials.oauth_token_secret
    : localStorage.getItem("oauth_token_secret");
  const screen_name = state.credentials.screen_name
    ? state.credentials.screen_name
    : localStorage.getItem("screen_name");

  if (oauth_token && oauth_token_secret && screen_name) {
    const pageToRender = () => {
      if (state.navigation === "Your Tweets") {
        return (
          <YourTweets
            oauth_token={oauth_token}
            oauth_token_secret={oauth_token_secret}
            screen_name={screen_name}
          />
        );
      } else if (state.navigation === "Timeline") {
        return (
          <Timeline
            oauth_token={oauth_token}
            oauth_token_secret={oauth_token_secret}
            screen_name={screen_name}
          />
        );
      } else if (state.navigation === "Trends") {
        return (
          <Trends
            oauth_token={oauth_token}
            oauth_token_secret={oauth_token_secret}
            screen_name={screen_name}
          />
        );
      } else if (state.navigation === "Preferences") {
        return (
          <Preferences
            oauth_token={oauth_token}
            oauth_token_secret={oauth_token_secret}
            screen_name={screen_name}
          />
        );
      }
    };

    return (
      <ThemeProvider theme={theme}>
        <NavBar />

        <div className="dashboard">{pageToRender()}</div>
      </ThemeProvider>
    );
  }

  return (
    <Redirect
      to={{
        pathname: "/"
      }}
    />
  );
};

export default Dashboard;
