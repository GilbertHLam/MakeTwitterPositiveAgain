import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getAccessToken } from "../../utils/apiCalls";
import { CircularProgress } from "@material-ui/core";
import "./styles.css";
import { useStateValue } from "../../state";

const LoginRedirect: React.FC = () => {
  const url_string = window.location.href; //window.location.href
  const url = new URL(url_string);
  const token = url.searchParams.get("oauth_token");
  const verifier = url.searchParams.get("oauth_verifier");
  const [access, setAccess] = useState(false);
  const { dispatch } = useStateValue();

  useEffect(() => {
    if (!access && verifier && token) {
      getAccessToken(verifier, token)
        .then((response: any) => {
          return response.json();
        })
        .then((data: any) => {
          dispatch({
            type: "setCredentials",
            credentials: data
          });
          localStorage.setItem("oauth_token", data.oauth_token);
          localStorage.setItem("oauth_token_secret", data.oauth_token_secret);
          localStorage.setItem("screen_name", data.screen_name);
          setAccess(true);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      {access ? (
        <Redirect
          to={{
            pathname: "/dashboard"
            //state: { ...userKeys }
          }}
        />
      ) : (
        <div className="loading-screen">
          <CircularProgress className="spinner" />
        </div>
      )}
    </>
  );
};

export default LoginRedirect;
