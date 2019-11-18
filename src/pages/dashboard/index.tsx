import React, { useState, useEffect } from "react";
import { getProfile } from "../../utils/apiCalls";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { RecordVoiceOver, TrendingUp, Settings } from "@material-ui/icons";
import YourTweets from "../yourTweets";
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
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className="nav-bar"
        >
          <BottomNavigationAction
            label="Your Tweets"
            icon={<RecordVoiceOver />}
          />
          <BottomNavigationAction label="Trending" icon={<TrendingUp />} />
          <BottomNavigationAction label="Preferences" icon={<Settings />} />
        </BottomNavigation>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
