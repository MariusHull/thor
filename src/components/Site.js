import React, { Component } from "react";
// import axios from "axios";
import "./Dashboard.scss";
// import Loader from "react-loader-spinner";
// Cf loaders React

class SiteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: { _id: null }
    };
  }

  componentDidMount() {
    this.loadSite();
  }
  /*
      Get the users to display given the sort and filters.
    */
  loadSite = () => {
    console.log(this.props.match.params.id);
    return 0;
  };

  render() {
    const { site } = this.state;
    return (
      <div className="container">
        <div class="card text-white bg-dark">
          <div class="card-header">Disponibilité site</div>
          {site._id !== null ? (
            <div>Site disponible</div>
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

export default SiteDetail;
