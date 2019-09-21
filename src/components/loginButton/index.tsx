import React from "react";
import "./styles.css";  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const element = (
  <div className="textContainer">
    <FontAwesomeIcon icon={faTwitter} />
    <h2>Sign in with Twitter</h2>
  </div>
);

const LoginButton: React.FC = () => {
  return (
    <div className="loginButton fade-in">
      
       <a href="https://twitter.com/minimalmonkey" className="icon-button twitter">
           <i className="icon-twitter" >
           {element}
           </i>
            <span>
            </span>
        </a>
        
    </div>
  );
};

export default LoginButton;