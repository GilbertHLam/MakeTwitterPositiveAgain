import React, { useState, useEffect } from "react";
import "./styles.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { lightBlue, grey } from "@material-ui/core/colors";
import Tweet from "../../components/tweet";
import NavBar from "../../components/navBar";
import { getProfile } from "../../utils/apiCalls";

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: grey
  },
  typography: {
    fontFamily: [
      "-apple-system",
      '"Segoe UI"',
      "Helvetica",
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
        padding: "16px",
        "padding-top": "0",
        "&:last-child": {
          "padding-bottom": "16px"
        }
      }
    },
    MuiBadge: {
      anchorOriginTopRightRectangle: {
        transform: "scale(1) translate(100%, 0%)"
      }
    },
    MuiButton: {
      root: {
        "font-family": "Roboto",
        color: "white",
        "min-width": "none"
      },
      label: {
        width: "auto"
      },
      text: {
        padding: "10px 0px"
      }
    },
    MuiCard: {
      root: {
        border: "1px solid #37444d"
      }
    },
    MuiPaper: {
      root: {
        "background-color": "#16202c",
        color: "white"
      },
      elevation4: {
        "box-shadow": "none"
      }
    },
    MuiIconButton: {
      root: {
        color: "white"
      }
    },
    MuiAppBar: {
      colorPrimary: {
        "background-color": "#16202c",
        color: "none"
      }
    },
    MuiTypography: {
      colorTextSecondary: {
        color: "white",
        "line-height": "1"
      },
      h5: {
        "font-weight": "700",
        margin: "auto",
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

interface YourTweetsProps extends React.HTMLProps<HTMLDivElement> {
  screen_name: String;
  oauth_token: String;
  oauth_token_secret: String;
}

const YourTweets: React.FC<YourTweetsProps> = (props: YourTweetsProps) => {
    const req = getProfile(
      props.oauth_token,
      props.oauth_token_secret,
    )
      .then(response => {
        return response.json();
      })
      .then((data: any) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
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
        <NavBar />

      <div className="your-tweets">
        <Tweet
          score={76}
          content="Republicans & others must remember, the Ukrainian President and Foreign Minister both said that there was no pressure placed on them whatsoever. Also, they didn’t even know the money wasn’t paid, and got the money with no conditions. But why isn’t Germany, France (Europe) paying?"
          date="November 5th, 2019"
          replies={3}
          favorites={4}
          retweets={83}
        />
        <Tweet
          score={14}
          content="Just finished a very good & cordial meeting at the White House with Jay Powell of the Federal Reserve. Everything was discussed including interest rates, negative interest, low inflation, easing, Dollar strength & its effect on manufacturing, trade with China, E.U. & others, etc."
          date="September 5th, 2019"
          replies={110}
          favorites={42}
          retweets={823}
        />
        <Tweet
          score={31}
          content="Hey this is a tweet!"
          date="September 5th, 2019"
          replies={3}
          favorites={4}
          retweets={83}
        />
        <Tweet
          score={6}
          content="Hey this is a tweet!"
          date="September 5th, 2019"
          replies={3}
          favorites={4}
          retweets={83}
        />
        <Tweet
          score={97}
          content="Hey this is a tweet!"
          date="September 5th, 2019"
          replies={3}
          favorites={4}
          retweets={83}
        />
      </div>
    </ThemeProvider>
  );
};

export default YourTweets;
