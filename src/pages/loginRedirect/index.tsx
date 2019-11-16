import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { getAccessToken } from '../../utils/apiCalls';

const LoginRedirect: React.FC = () => {
    const url_string = window.location.href; //window.location.href
    const url = new URL(url_string);
    const token = url.searchParams.get("oauth_token");
    const verifier = url.searchParams.get("oauth_verifier");
    const [access, setAccess] = useState(false);
    const [userKeys, setUserKeys] = useState({});

    useEffect(() => {
        if(!access && verifier && token) {
            getAccessToken(verifier, token)
            .then((response: any) => {
                return response.json();
            }).then((data:any) => {
                setUserKeys(data);
                setAccess(true);
            }).catch((err)=>{
                console.log(err);
            });
        }   
      });
    
    return (
        <>
            { access ? <Redirect to={{
                pathname: "/dashboard",
                state: {...userKeys}
            }}/>:"Logging in" }
        </>
        
    );
};

export default LoginRedirect;