import apiBaseUrl from "./apiBaseUrl";

const signIn = () => {
    fetch(apiBaseUrl + "signIn", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      }).then(response => {
        console.log(response);
      })
}

const getProfile = (oauthToken: string,oauthTokenSecret: string) => {
    return fetch(apiBaseUrl + "userProfile", {
        method: "POST",
        headers: {
          Origin: "https://twitter.gilbertlam.me"
        },
        body: JSON.stringify({
          oauth_token_secret: oauthTokenSecret,
          oauth_token: oauthToken
        }),
      });
}

const getRecentTweets = (oauthToken: string,oauthTokenSecret: string,screenName:string) => {
  return fetch(apiBaseUrl + "getRecentTweets", {
      method: "POST",
      headers: {
        Origin: "https://twitter.gilbertlam.me"
      },
      body: JSON.stringify({
        oauth_token_secret: oauthTokenSecret,
        oauth_token: oauthToken,
        screen_name:screenName
      }),
    });
}

const getAccessToken = (oauthVerifier: string , oauthToken: string) => {
  return fetch(apiBaseUrl + "getAccessToken", {
        method: "POST",
        headers: {
          Origin: "https://twitter.gilbertlam.me"
        },
        body: JSON.stringify({
          oauth_verifier: oauthVerifier,
          oauth_token: oauthToken
        }),
      });
}

export {
    signIn,
    getProfile,
    getAccessToken,
    getRecentTweets
};