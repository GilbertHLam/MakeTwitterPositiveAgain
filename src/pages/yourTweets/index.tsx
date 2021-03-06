import React, { useState, useEffect } from "react";
import "./styles.css";
import { ThemeProvider } from "@material-ui/core/styles";
import Tweet from "../../components/tweet";
import { getRecentTweets } from "../../utils/apiCalls";
import theme from "../../theme";
import { TweetType } from "../../types/types";
import { CircularProgress, Typography } from "@material-ui/core";
import { useStateValue } from "../../state";
import CustomSnackbar from "../../components/customSnackBar";

import FlipMove from "react-flip-move";
interface YourTweetsProps extends React.HTMLProps<HTMLDivElement> {}

const YourTweets: React.FC<YourTweetsProps> = (props: YourTweetsProps) => {
  const [tweets, setTweets] = useState([{} as TweetType]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSnackbar, setShowSnackBar] = useState(false);
  const [snackBarVariant, setSnackBarVariant] = useState("");
  const { state } = useStateValue();
  useEffect(() => {
    const cachedAt = localStorage.getItem("cachedAt");
    const cacheDay = cachedAt ? new Date(cachedAt) : new Date(1574800000000); // - new Date())/(1000 * 60 * 60) > 24 : false;
    const today = new Date();
    const shouldFlush =
      Math.abs(cacheDay.getTime() - today.getTime()) / (1000 * 60 * 60) > 1;
    if (shouldFlush) {
      getRecentTweets(
        state.credentials.oauth_token,
        state.credentials.oauth_token_secret,
        state.credentials.screen_name
      )
        .then(response => {
          return response.json();
        })
        .then((data: any) => {
          setTweets(data);
          localStorage.setItem("recentTweets", JSON.stringify(data));
          localStorage.setItem("cachedAt", new Date().toString());
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const cache = localStorage.getItem("recentTweets");
      setTweets(JSON.parse(cache!));
      setIsLoading(false);
    }
  }, [showSnackbar]);

  const sortTweets = () => {
    if (state.sortMethod === "recent" && tweets) {
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
            setSnackBarVariant={setSnackBarVariant}
            setShowSnackBar={setShowSnackBar}
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
              Analyzing your tweets....
            </Typography>
          </div>
        </div>
      ) : (
        <>
          <div className="your-tweets">{tweetsDiv}</div>
          <CustomSnackbar
            open={showSnackbar}
            variant={snackBarVariant}
            setShowSnackbar={setShowSnackBar}
          />
        </>
      )}
    </ThemeProvider>
  );
};

export default YourTweets;
