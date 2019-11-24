import React from "react";
import "./styles.css";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  Badge,
  Tooltip
} from "@material-ui/core";
import {
  Delete,
  Favorite,
  ChatBubbleOutline,
  Repeat
} from "@material-ui/icons";

interface TweetProps extends React.HTMLProps<HTMLDivElement> {
  screen_name?: string;
  score: number;
  content: string;
  date: string;
  favorites: number;
  retweets: number;
  replies: number;
}

const Tweet: React.FC<TweetProps> = (props: TweetProps) => {
  const {
    score,
    screen_name,
    content,
    date,
    favorites,
    retweets,
    replies
  } = props;

  let color;

  if (score > 75) {
    color = "#1da1f2";
  } else if (score > 30) {
    color = "orange";
  } else {
    color = "#ec2F4B";
  }

  return (
    <div className="tweet">
      <Card>
        <CardHeader
          avatar={
            <Avatar
              style={{
                backgroundColor: color,
                fontFamily: "Helvetica Neue, Roboto",
                fontWeight: 700
              }}
              aria-label={score.toString()}
            >
              {score}
            </Avatar>
          }
          action={
            <Tooltip title="Delete">
              <IconButton aria-label="delete">
                <Delete  />
              </IconButton>
            </Tooltip>
          }
          title={screen_name}
          subheader={<div className="tweet-stats">
          <div className="stat">
            <Badge badgeContent={replies} max={999}>
              <ChatBubbleOutline className="lightgreen" />
            </Badge>
          </div>
          <div className="stat">
          <Badge badgeContent={retweets} max={999}>
            <Repeat className="lightblue" />
            </Badge>
          </div>
          <div className="stat">
          <Badge badgeContent={favorites} max={999} >
            <Favorite className="red" />
            </Badge>
          </div>
        </div>}
        />
        <CardContent className="tweet-content">
          <Typography variant="body1" color="textSecondary" component="p">
            {content}
          </Typography>
          <div className="tweet-footer">
            
            <div className="date-wrapper">
              <Typography variant="caption" color="textSecondary" component="p">
                {date}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tweet;
