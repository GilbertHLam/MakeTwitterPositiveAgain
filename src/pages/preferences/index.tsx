import React from "react";
import "./styles.css";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";
interface PreferencesProps extends React.HTMLProps<HTMLDivElement> {
  screen_name: string;
  oauth_token: string;
  oauth_token_secret: string;
}

const Preferences: React.FC<PreferencesProps> = (props: PreferencesProps) => {
  return (
    <ThemeProvider theme={theme}>
        <div className="preferences">{"Preferences"}</div>
    </ThemeProvider>
  );
};

export default Preferences;
