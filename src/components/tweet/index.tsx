import React from "react";
import "./styles.css";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography
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
            <IconButton aria-label="delete">
              <Delete />
            </IconButton>
          }
          title={screen_name}
          subheader={""}
        />
        <CardContent className="tweet-content">
          <Typography variant="body1" color="textSecondary" component="p">
            {content}
          </Typography>
          <div className="tweet-footer">
            <div className="tweet-stats">
              <div className="stat">
                <ChatBubbleOutline className="lightgreen" />
                <Typography variant="body2" color="textSecondary" component="p">
                  {replies}
                </Typography>
              </div>
              <div className="stat">
                <Repeat className="lightblue" />
                <Typography variant="body2" color="textSecondary" component="p">
                  {retweets}
                </Typography>
              </div>
              <div className="stat">
                <Favorite className="red" />
                <Typography variant="body2" color="textSecondary" component="p">
                  {favorites}
                </Typography>
              </div>
            </div>
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
