import React from "react";
import "./styles.css";
import { deleteTweet } from "../../utils/apiCalls";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import { useStateValue } from "../../state";
import { TweetType } from "../../types/types";

interface ConfirmationDialogProps {
  open: boolean;
  handleClose: (e: any, success: boolean | null) => void;
  tweetId: string;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { state } = useStateValue();

  const onDelete = (e: any) => {
    deleteTweet(
      localStorage.getItem("oauth_token")!,
      localStorage.getItem("oauth_token_secret")!,
      props.tweetId
    )
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("recentTweets", JSON.stringify(JSON.parse(localStorage.getItem("recentTweets")!).filter((tweet: any) => tweet.id_str !== props.tweetId)));
          props.handleClose(e, true);
        } else {
          props.handleClose(e, false);
        }
      })
      .catch(error => {
        props.handleClose(e, false);
      });
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={e => props.handleClose(e, null)}
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
          <Button
            onClick={e => props.handleClose(e, null)}
            color="primary"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={e => onDelete(e)}
            className="confirm"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
