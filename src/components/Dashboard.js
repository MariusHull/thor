import React, { Component } from "react";
import axios from "axios";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
import ModaleCreate from "./ModalCreate";
import url from "../config";
// import Loader from "react-loader-spinner";
// Cf loaders React

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nameCreate: "",
      urlCreate: "",
      sites: [
        {
          _id: 0,
          siteName: "Monithor est down",
          siteUrl: "http://monithor.fr/back/",
          status: false,
          data: []
        }
      ]
    };
  }

  componentDidMount() {
    this.loadSites();
  }

  loadSites = () => {
    axios.get(`${url}sites/`).then(res => {
      this.setState({ sites: res.data });
    });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  save = () => {
    const { nameCreate, urlCreate } = this.state;
    if (nameCreate !== "" && urlCreate !== "") {
      axios
        .post(`${url}sites/create/`, {
          siteName: nameCreate,
          siteUrl: urlCreate
        })
        .then(res => {
          console.log(res.data);
          this.loadSites();
        });
      this.onCloseModal();
    } else {
      window.alert(
        "Veuillez bien renseigner le nom du site et l'url à monitorer"
      );
    }
  };

  ping = (adress, _id) => {
    const { sites } = this.state;
    console.log(sites);
    axios
      .get(adress)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log("Erreur : " + error);
        sites.forEach(site => {
          if (site._id === _id) {
            site.data.push({
              date: new Date().toString(),
              message: `${error}`
            });
            site.status = false;
          }
        });
        console.log(sites);
        this.setState({ sites: sites });
        /*
        if (error.response) {
          console.log(error.response.status);
        }*/
      });
  };

  onChange = e => {
    if (e.target.id === "name") {
      this.setState({ nameCreate: e.target.value });
    } else if (e.target.id === "url") {
      this.setState({ urlCreate: e.target.value });
    }
  };

  render() {
    const { sites, open, nameCreate, urlCreate } = this.state;
    return (
      <div className="container">
        <ModaleCreate
          open={open}
          openModal={this.onOpenModal}
          closeModal={this.onCloseModal}
          save={this.save}
          name={nameCreate}
          url={urlCreate}
          onChange={this.onChange}
        />
        <div className="row space">
          <button
            type="button"
            className="btn btn-outline-success col"
            onClick={this.onOpenModal}
          >
            <i className="fas fa-plus" /> Ajouter un site
          </button>
        </div>
        <div className="row space">
          <button type="button" className="btn btn-outline-info col">
            Vérifier tous les sites (to be implemented)
          </button>
        </div>
        <div className="card text-white bg-dark">
          <div className="card-header">Header</div>
          {sites.length > 0 ? (
            <div>
              {sites.length > 0 && (
                <div>
                  {sites.map(site => (
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link to={`/site/${site._id}`}>
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
                        </Link>
                      </h5>
                      <p className="card-text">Site URL : {site.siteUrl}</p>
                      {site.data.length > 0 && (
                        <p>{site.data[site.data.length - 1].message}</p>
                      )}
                      <div className="row space">
                        <button
                          type="button"
                          className="btn btn-outline-success col"
                          onClick={() => this.ping(site.siteUrl, site._id)}
                        >
                          Ping this adress !
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="card-body">
              <h5 className="card-title">Test</h5>
              <p className="card-text">
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
