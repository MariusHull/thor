import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import SiteDetail from "./components/Site";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Dashboard} />
          <Route path="/site/:id" component={SiteDetail} />
        </div>
      </Router>
    );
  }
}

export default App;
