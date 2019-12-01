import React from "react";
import "./styles.css";
import {
  deleteTweet
} from "../../utils/apiCalls";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import { useStateValue } from "../../state";

interface ConfirmationDialogProps {
  open: boolean;
  handleClose: (e: any) => void;
  tweetId: string;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { state } = useStateValue();

  const onDelete = (e: any) => {
    deleteTweet(state.credentials.oauth_token, state.credentials.oauth_token_secret, props.tweetId)
    .then(response => {
      console.log(response);
      props.handleClose(e);
    })
    .catch(error => {
      console.log(error);
    })
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="Delete tweet"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this tweet?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this tweet? This cannot be reversed!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={e => props.handleClose(e)} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={e => onDelete(e)} className="confirm" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
