import React, { useState, useEffect } from "react";
import "./styles.css";
import { ThemeProvider } from "@material-ui/core/styles";
import Tweet from "../../components/tweet";
import NavBar from "../../components/navBar";
import { getRecentTweets } from "../../utils/apiCalls";
import theme from "../../theme";
import { useStateValue } from "../../state";
interface PreferencesProps extends React.HTMLProps<HTMLDivElement> {
  screen_name: string;
  oauth_token: string;
  oauth_token_secret: string;
}

const Preferences: React.FC<PreferencesProps> = (props: PreferencesProps) => {
  const { state } = useStateValue();

  return (
    <ThemeProvider theme={theme}>
        <div className="preferences">{"Preferences"}</div>
    </ThemeProvider>
  );
};

export default Preferences;
