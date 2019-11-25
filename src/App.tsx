import React from "react";
import Wave from "./components/wave";
import "./App.css";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import LoginRedirect from "./pages/loginRedirect";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { StateProvider } from "./state";
import { StateType, credentialsType, Action, StateProviderType } from "./types/types";




const App = () => {
  return (
    <StateProvider>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/loginRedirect" component={LoginRedirect} />
      </Router>
    </StateProvider>
  );
};

export default App;
