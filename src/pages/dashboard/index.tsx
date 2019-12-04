import React from "react";
import YourTweets from "../yourTweets";
import Timeline from "../timeline";
import "./styles.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import { useStateValue } from "../../state";
import Trends from "../trends";
import Preferences from "../preferences";
import theme from "../../theme";
import NavBar from "../../components/navBar";

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

  console.log("state", state);
  console.log("oauth_token", oauth_token);
  if (oauth_token && oauth_token_secret && screen_name) {
    const pageToRender = () => {
      if (state.navigation === "Your Tweets") {
        return <YourTweets />;
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
  } else {
    return (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    );
  }
};

export default Dashboard;
