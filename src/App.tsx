import React from "react";
import Wave from "./components/wave";
import "./App.css";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import LoginRedirect from "./pages/loginRedirect";
import { BrowserRouter as Router, Route} from "react-router-dom";

export const UserContext = React.createContext({
  oauth_token: '',
  oauth_verifier:''
});

const App: React.FC = () => {


  return (
    <UserContext.Provider value={
      {
        oauth_token: '',
        oauth_verifier:''
      }
    }>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/loginRedirect" component={LoginRedirect} />
      </Router>
    </UserContext.Provider>
  );
};

export default App;
