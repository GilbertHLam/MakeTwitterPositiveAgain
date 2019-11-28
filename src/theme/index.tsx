import { createMuiTheme } from "@material-ui/core";

import { lightBlue, grey } from "@material-ui/core/colors";

export default createMuiTheme({
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
    MuiListItemIcon: {
      root: {
        color: "white"
      }
    },
    MuiDrawer: {
      paper: {
        width: "49%"
      }
    },
    MuiCardHeader: {
      action: {
        marginRight: 0,
        marginTop: 0
      }
    },
    MuiBadge: {
      anchorOriginTopRightRectangle: {
        transform: "scale(1) translate(100%, 0%)"
      },
      badge: {
        fontSize: "0.95rem"
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
    MuiPopover: {
      paper: {
        backgroundColor: "#16202c",
        top: "50px !important",
        border: "solid 2px #ffffff"
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
