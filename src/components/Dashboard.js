import React, { Component } from "react";
import axios from "axios";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
// import Loader from "react-loader-spinner";
// Cf loaders React

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["test"],
      sites: [
        { _id: 0, siteName: "SELF", siteUrl: "localhost:4242" },
        {
          _id: 1,
          siteName: "TEST",
          siteUrl: "http://prototype.centralesupelec.fr/back/api/users"
        },
        { _id: 2, siteName: "TEST2", siteUrl: "test/test" },
        { _id: 3, siteName: "TEST3", siteUrl: "test/test" }
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

  ping = adress => {
    axios
      .get(adress)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log("Erreur : " + error);
        this.setState({ data: "Erreur" + error });
        if (error.response) {
          console.log(error.response.status);
        }
      });
  };

  render() {
    const { sites, data } = this.state;
    return (
      <div className="container">
        <div class="card text-white bg-dark">
          <div class="card-header">Header</div>
          {sites.length > 0 ? (
            <div>
              {sites.map(site => (
                <div class="card-body">
                  <h5 class="card-title">
                    <Link to={`/site/${site._id}`}>{site.siteName}</Link>
                  </h5>
                  <p class="card-text">Site URL : {site.siteUrl}</p>
                  <p>{data}</p>
                  <div className="row space">
                    <button
                      type="button"
                      class="btn btn-outline-success col"
                      onClick={() => this.ping(site.siteUrl)}
                    >
                      Ping this adress !
                    </button>
                  </div>
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
