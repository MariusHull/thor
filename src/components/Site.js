import React, { Component } from "react";
import axios from "axios";
import "./Dashboard.scss";
import Loader from "react-loader-spinner";
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
    axios
      .get(`http://localhost:4242/sites/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ site: res.data });
      });
  };

  delete = () => {
    const { site } = this.state;
    if (
      window.confirm("Êtes-vous bien sûr(e) de vouloir supprimer ce site ?")
    ) {
      axios
        .delete(
          `http://localhost:4242/sites/${this.props.match.params.id}`,
          site
        )
        .then(res => {
          this.props.history.push(`/`);
        });
    }
  };

  ping = (adress, _id) => {
    const { site } = this.state;
    console.log(site);
    axios
      .get(site.siteUrl)
      .then(res => {
        console.log(res.data);
      })
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
          <div className="card-header">Disponibilité site</div>
          {site._id !== null ? (
            <div className="card-body">
              <h5 className="card-title">
                {site.siteName}
                &nbsp;
                {site.data.length > 0 && !site.status ? (
                  <span className="badge badge-pill badge-danger">
                    Site offline !
                  </span>
                ) : (
                  <span className="badge badge-pill badge-success">
                    Site opérationnel !
                  </span>
                )}
              </h5>
              <div className="row space">
                <button
                  type="button"
                  className="btn btn-outline-success col"
                  onClick={this.ping}
                >
                  Tester ce site
                </button>
              </div>
              <div className="row space">
                <button
                  type="button"
                  className="btn btn-outline-danger col"
                  onClick={this.delete}
                >
                  Supprimer ce site
                </button>
              </div>
              <p className="card-text">
                <br />
              </p>
            </div>
          ) : (
            <div className="card-body">
              <h5 className="card-title">Chargement du site</h5>
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
