import React, { useState, useEffect } from "react";
import "./styles.css";
import { ThemeProvider } from "@material-ui/core/styles";
import Tweet from "../../components/tweet";
import { getRecentTweets, getHomeTimeline } from "../../utils/apiCalls";
import theme from "../../theme";
import { TweetType } from "../../types/types";
import { CircularProgress, Typography } from "@material-ui/core";
import { useStateValue } from "../../state";
import FlipMove from "react-flip-move";
interface TimelineProps extends React.HTMLProps<HTMLDivElement> {
  screen_name: string;
  oauth_token: string;
  oauth_token_secret: string;
}

const Timeline: React.FC<TimelineProps> = (props: TimelineProps) => {
  const [tweets, setTweets] = useState([{} as TweetType]);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useStateValue();
  useEffect(() => {
    const cachedAt = localStorage.getItem("cachedAt");
    const cacheDay = cachedAt ? new Date(cachedAt) : new Date(1574800000000); // - new Date())/(1000 * 60 * 60) > 24 : false;
    const today = new Date();
    const shouldFlush =
      Math.abs(cacheDay.getTime() - today.getTime()) / (1000 * 60 * 60) > 1;
    if (shouldFlush || localStorage.getItem("homeTimeline") === null) {
      getHomeTimeline(props.oauth_token, props.oauth_token_secret)
        .then(response => {
          return response.json();
        })
        .then((data: any) => {
          setTweets(data);
          localStorage.setItem("homeTimeline", JSON.stringify(data));
          localStorage.setItem("cachedAt", new Date().toString());
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const cache = localStorage.getItem("homeTimeline");
      setTweets(JSON.parse(cache!));
      console.log(JSON.parse(cache!));
      setIsLoading(false);
    }
  }, [props.oauth_token, props.oauth_token_secret, props.screen_name]);

  const sortTweets = () => {
    if (state.sortMethod === "recent") {
      return tweets.sort((a: TweetType, b: TweetType): number => {
        const ad = new Date(a.created_at);
        const bd = new Date(b.created_at);
        if (ad > bd) {
          return -1;
        }
        return 1;
      });
    } else if (state.sortMethod === "positive") {
      return tweets.sort((a: TweetType, b: TweetType): number => {
        if (a.score > b.score) {
          return -1;
        }
        return 1;
      });
    } else if (state.sortMethod === "negative") {
      return tweets.sort((a: TweetType, b: TweetType): number => {
        if (a.score < b.score) {
          return -1;
        }
        return 1;
      });
    } else {
      return tweets;
    }
  };

  const tweetsDiv = (
    <FlipMove>
      {sortTweets().map(tweet => (
        <div key={tweet.id}>
          <Tweet
            score={tweet.score}
            content={tweet.text}
            date={tweet.created_at}
            favorites={tweet.favorite_count}
            retweets={tweet.retweet_count}
            tweetId={tweet.id_str}
            author={tweet.user ? tweet.user.screen_name : null}
            authorPicture={tweet.user ? tweet.user.profile_image_url_https : null}
            showAuthor={true}
          />
        </div>
      ))}
    </FlipMove>
  );

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (
        <div className="loading-screen-tweets">
          <div className="loading-message">
            <CircularProgress className="spinner" />
            <Typography variant="body1" color="textSecondary" component="p">
              Analyzing your timeline....
            </Typography>
          </div>
        </div>
      ) : (
        <div className="timeline">{tweetsDiv}</div>
      )}
    </ThemeProvider>
  );
};

export default Timeline;
