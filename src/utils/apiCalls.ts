const signIn = () => {
    fetch("http://localhost:3000/signIn", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      }).then(response => {
        console.log(response);
      })
}

const getTweets = (oauthToken: String) => {
    fetch("http://localhost:3001/userData", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `oauth_token=${oauthToken}`,
      }).then((response: any) => {
        console.log(response);
      })
}

const getAccessToken = (oauthVerifier: String | null, oauthToken: String | null) => {
  return fetch("http://localhost:3001/getAccessToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `oauth_verifier=${oauthVerifier}&oauth_token=${oauthToken}`,
      });
}

export {
    signIn,
    getTweets,
    getAccessToken
};