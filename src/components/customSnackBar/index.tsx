import React from "react";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import { CheckCircle, Warning, Info, Error, Close } from "@material-ui/icons";
import "./styles.css";

interface CustomSnackBarProps {
  open: boolean;
  variant: any;
  setShowSnackbar: (show: boolean) => void;
}

export interface Props {
  className?: string;
  message?: string;
  onClose?: (e: any) => void;
  variant: keyof typeof variantIcon;
}

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info
};

const CustomSnackBar = (props: CustomSnackBarProps) => {
  const { open, setShowSnackbar, variant } = props;

  const MySnackbarContentWrapper = (props: Props) => {
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
      <SnackbarContent
        className={className}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar">
            <Icon className="snack-icon"/>
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <Close />
          </IconButton>
        ]}
        {...other}
      />
    );
  };
  
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={open}
      autoHideDuration={6000}
      onClose={e => setShowSnackbar(false)}
    >
      <MySnackbarContentWrapper
        onClose={e => setShowSnackbar(false)}
        variant={variant}
        className={variant}
        message={
          variant === "success"
            ? "Tweet deleted successfully!"
            : "Could not delete Tweet!"
        }
      />
    </Snackbar>
  );
};

export default CustomSnackBar;
