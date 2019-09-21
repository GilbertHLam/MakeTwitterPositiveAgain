import React from "react";
import Wave from "./components/wave";
import "./App.css";
import Home from "./pages/home";
import { BrowserRouter as Router, Route} from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact component={Home} />
    </Router>
  );
};

export default App;
