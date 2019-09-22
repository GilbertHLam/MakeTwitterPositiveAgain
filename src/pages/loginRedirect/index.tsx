import React from "react";
import { Redirect } from 'react-router-dom';

const LoginRedirect: React.FC = () => {
    const url_string = window.location.href; //window.location.href
    const url = new URL(url_string);
    const token = url.searchParams.get("oauth_token");
    const verifier = url.searchParams.get("oauth_verifier");
    return (
        <Redirect to={{
            pathname: "/dashboard",
            state: { oauth_token: token, oauth_verifier: verifier }
        }}/>
    );
};

export default LoginRedirect;