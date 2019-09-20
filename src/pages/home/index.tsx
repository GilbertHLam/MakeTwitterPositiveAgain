import React from "react";
import Wave from "../../components/wave";
import "./styles.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <div className="home">
        <div className="section">
          <div className="container">
            <div className="textWrapper">
              <div className="wordContainer">
                <div className="word">
                  <h1>Make</h1>
                </div>
              </div>
              <div className="wordContainer">
                <div className="word">
                  <h1>Twitter</h1>
                </div>
              </div>
              <div className="wordContainer">
                <div className="word">
                  <h1 className="white">
                    <span>P</span>
                    <span>O</span>
                    <span>S</span>
                    <span>I</span>
                    <span>T</span>
                    <span>I</span>
                    <span>V</span>
                    <span>E</span>
                  </h1>
                </div>
              </div>
              <div className="wordContainer">
                <div className="word">
                  <h1>Again</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section"></div>
      <Wave />
    </>
  );
};

export default Home;
