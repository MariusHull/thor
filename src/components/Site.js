import React, { Component } from "react";
import axios from "axios";
import "./Dashboard.scss";
import Loader from "react-loader-spinner";
import url from "../config";
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

  loadSite = () => {
    axios.get(`${url}sites/${this.props.match.params.id}`).then(res => {
      this.setState({ site: res.data });
    });
  };

  delete = () => {
    const { site } = this.state;
    if (
      window.confirm(
        "Are you sure you want to delete this backend from the monitoring list?"
      )
    ) {
      axios
        .delete(`${url}sites/${this.props.match.params.id}`, site)
        .then(res => {
          this.props.history.push(`/`);
        });
    }
  };

  ping = (adress, _id) => {
    const { site } = this.state;
    axios
      .get(site.siteUrl)
      .then(res => {})
      .catch(error => {
        console.log("Erreur : " + error);
        site.data.push({
          date: new Date().toString(),
          message: `${error}`
        });
        site.status = false;
        this.setState({ site: site });
        /*
        if (error.response) {
          console.log(error.response.status);
        }*/
      });
  };

  render() {
    const { site } = this.state;
    return (
      <div className="container">
        <div className="card text-white bg-dark">
          <div className="card-header">Site availability</div>
          {site._id !== null ? (
            <div className="card-body">
              <h5 className="card-title">
                {site.siteName}
                &nbsp;
                {site.data.length > 0 && !site.status ? (
                  <span className="badge badge-pill badge-danger">
                    Site offline ! {site.timeToPing}
                  </span>
                ) : (
                  <span className="badge badge-pill badge-success">
                    Site running ! {site.timeToPing}
                  </span>
                )}
              </h5>

              {site.siteDesc !== undefined && site.siteDesc !== null && (
                <p>{site.siteDesc}</p>
              )}

              <div className="row space">
                <button
                  type="button"
                  className="btn btn-outline-success col"
                  onClick={this.ping}
                >
                  Test this website
                </button>
              </div>
              <div className="row space">
                <button
                  type="button"
                  className="btn btn-outline-danger col"
                  onClick={this.delete}
                >
                  Suppress this website
                </button>
              </div>
              <p className="card-text">
                <br />
              </p>
            </div>
          ) : (
            <div className="card-body">
              <h5 className="card-title">Loading site information...</h5>
              <Loader
                type="Ball-Triangle"
                color="white"
                height={80}
                width={80}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SiteDetail;
