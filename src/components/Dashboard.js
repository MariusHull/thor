import React, { Component } from "react";
// import axios from "axios";
import "./Dashboard.scss";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [
        { siteName: "TEST", siteUrl: "test/test" },
        { siteName: "TEST2", siteUrl: "test/test" },
        { siteName: "TEST3", siteUrl: "test/test" }
      ]
    };
  }

  componentDidMount() {
    this.loadSites();
  }
  /*
      Get the users to display given the sort and filters.
    */
  loadSites = () => {
    return 0;
  };

  render() {
    const { sites } = this.state;
    return (
      <div className="container">
        <div class="card text-white bg-dark">
          <div class="card-header">Header</div>
          {sites.length > 0 ? (
            <div>
              {sites.map(site => (
                <div class="card-body">
                  <h5 class="card-title">{site.siteName}</h5>
                  <p class="card-text">Site URL : {site.siteUrl}</p>
                </div>
              ))}
            </div>
          ) : (
            <div class="card-body">
              <h5 class="card-title">Test</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default DashBoard;
