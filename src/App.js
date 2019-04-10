import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route path="/" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
