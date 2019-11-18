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
import { Delete } from "@material-ui/icons";

interface TweetProps extends React.HTMLProps<HTMLDivElement> {
  screen_name?: string;
  score: number;
  content: string;
  date: string;
}

const Tweet: React.FC<TweetProps> = (props: TweetProps) => {
  const { score, screen_name, content, date } = props;

  let color;

  if(score > 75) {
      color = "#1da1f2"
  } else if (score > 30) {
      color = "orange"
  } else {
      color = "#ec2F4B"
  }

  return (
    <div className="tweet">
      <Card>
        <CardHeader
          avatar={
            <Avatar
              style={{
                backgroundColor: color
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
          subheader={date}
        />
        <CardContent className="tweet-content">
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tweet;
