import React, { useState } from "react";
import "./styles.css";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  Badge,
  Tooltip,
} from "@material-ui/core";
import { Delete, Favorite, Repeat } from "@material-ui/icons";
import ConfirmationDialog from "../confirmationDialog";

interface TweetProps extends React.HTMLProps<HTMLDivElement> {
  screen_name?: string;
  score: number;
  content: string;
  date: string;
  favorites: number;
  retweets: number;
  tweetId: string;
  forceUpdate?: () => void;
  setSnackBarVariant?: (variant: string) => void;
  setShowSnackBar?: (open: boolean)=> void;
  showAuthor?: boolean;
  author?: string;
  authorPicture?: string;
}

const formatDate = (date: Date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return monthNames[monthIndex] + " " + day + ", " + year;
};

const Tweet: React.FC<TweetProps> = (props: TweetProps) => {
  const {
    score,
    screen_name,
    content,
    date,
    favorites,
    retweets,
    tweetId,
    forceUpdate,
    showAuthor,
    author,
    authorPicture
  } = props;

  let color;

  const [showConfirmation, setShowConfirmation] = useState(false);


  const formattedDate = formatDate(new Date(date));

  if (score > 75) {
    color = "#1da1f2";
  } else if (score > 30) {
    color = "orange";
  } else {
    color = "#ec2F4B";
  }

  const onClickDelete = () => {
    setShowConfirmation(true);
  };

  const onCloseConfirmation = (e: any, success: boolean | null) => {
    setShowConfirmation(false);
    if(success && props.setShowSnackBar && props.setSnackBarVariant) {
      props.setSnackBarVariant("success");
      props.setShowSnackBar(true);
      forceUpdate ? forceUpdate() : console.log();
    } else if (success === false && props.setShowSnackBar && props.setSnackBarVariant) {
      props.setSnackBarVariant("error");
      props.setShowSnackBar(true);
    } else if(props.setShowSnackBar){
      props.setShowSnackBar(false);
    }
    
  };

  return (
    <div className="tweet">
      {showConfirmation ? (
        <>
          <ConfirmationDialog
            open={showConfirmation}
            handleClose={onCloseConfirmation}
            tweetId={tweetId}
          />
        </>
      ) : null}
      <Card>
        <CardHeader
          avatar={
            <>
            <Avatar
              style={!showAuthor ? {
                backgroundColor: "#00000000",
                fontFamily: "Helvetica Neue, Roboto",
                fontWeight: 700,
                border: `3px solid ${color}`,
              } : {
                fontFamily: "Helvetica Neue, Roboto",
                fontWeight: 700,
                backgroundColor: "#00000000",
                border: `3px solid ${color}`,
                //color: color
              }}
              aria-label={score.toString()}
            >
              {score}
            </Avatar>
            
            </>
            
          }
          action={
            <>
            {showAuthor ? <Avatar alt={author} src={authorPicture} /> : 
            <Tooltip title="Delete" onClick={onClickDelete}>
              <IconButton aria-label="delete">
                <Delete />
              </IconButton>
            </Tooltip>
          }
            </>
          }
          title={screen_name}
          subheader={
            <div className={`tweet-stats`}>
              <div className="stat">
                <Badge
                  badgeContent={retweets ? retweets : 0}
                  max={999}
                  showZero={true}
                >
                  <Repeat className="lightblue" />
                </Badge>
              </div>
              <div className="stat">
                <Badge
                  badgeContent={favorites ? favorites : 0}
                  max={999}
                  showZero={true}
                >
                  <Favorite className="red" />
                </Badge>
              </div>
            </div>
          }
        />
        <CardContent className="tweet-content">
          <Typography variant="body1" color="textSecondary" component="p">
            {content}
          </Typography>
          <div className="tweet-footer">
            <div className="date-wrapper">
              {author ? <Typography variant="caption" color="textSecondary" component="p">
                {`@${author}`}
              </Typography> : null} 
              <Typography variant="caption" color="textSecondary" component="p">
                {formattedDate}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tweet;
