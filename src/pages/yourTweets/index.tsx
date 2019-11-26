import React, { useState, useEffect } from "react";
import "./styles.css";
import { ThemeProvider } from "@material-ui/core/styles";
import Tweet from "../../components/tweet";
import NavBar from "../../components/navBar";
import { getRecentTweets } from "../../utils/apiCalls";
import theme from "../../theme";
import { TweetType } from "../../types/types";
import { CircularProgress } from "@material-ui/core";
import { useStateValue } from "../../state";

interface YourTweetsProps extends React.HTMLProps<HTMLDivElement> {
  screen_name: string;
  oauth_token: string;
  oauth_token_secret: string;
}

const YourTweets: React.FC<YourTweetsProps> = (props: YourTweetsProps) => {
  const [tweets, setTweets] = useState([{} as TweetType]);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useStateValue();
  useEffect(() => {
    const cache = localStorage.getItem("recentTweets");
    if (cache == null) {
      getRecentTweets(
        props.oauth_token,
        props.oauth_token_secret,
        props.screen_name
      )
        .then(response => {
          return response.json();
        })
        .then((data: any) => {
          setTweets(data);
          localStorage.setItem("recentTweets", JSON.stringify(data));
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setTweets(JSON.parse(cache));
      setIsLoading(false);
    }
  }, []);

  const sortTweets = () => {
    if(state.sortMethod === "recent") {
      return tweets;
    } else if (state.sortMethod === "positive") {
      return tweets.sort((a: TweetType, b: TweetType):number => {
        if(a.score > b.score) {
          return 1;
        }
        return -1;
      });
    } else if (state.sortMethod === "negative") {
      return tweets.sort((a: TweetType, b: TweetType):number => {
        if(a.score < b.score) {
          return 1;
        }
        return -1;
      });
    } else {
      return tweets;
    }
  }

  const tweetsDiv = (
    <div>
      {sortTweets().map(tweet => (
        <Tweet
          score={tweet.score}
          content={tweet.text}
          date={tweet.created_at}
          favorites={tweet.favorite_count}
          retweets={tweet.retweet_count}
          key={tweet.id}
        />
      ))}
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      {isLoading ? (
        <CircularProgress className="spinner" />
      ) : (
        <div className="your-tweets">{tweetsDiv}</div>
      )}
    </ThemeProvider>
  );
};

export default YourTweets;
