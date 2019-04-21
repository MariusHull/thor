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
      descCreate: "",
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
    axios.get(`${url}sites`).then(res => {
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
    const { nameCreate, urlCreate, descCreate } = this.state;
    if (nameCreate !== "" && urlCreate !== "") {
      axios
        .post(`${url}sites/create/`, {
          siteName: nameCreate,
          siteUrl: urlCreate,
          siteDesc: descCreate
        })
        .then(res => {
          this.loadSites();
        });
      this.onCloseModal();
    } else {
      window.alert(
        "Veuillez bien renseigner le nom du site et l'url à monitorer"
      );
    }
  };

  ping = _id => {
    const { sites } = this.state;
    axios.get(`${url}sites/ping/${_id}`).then(res => {
      sites.forEach(site => {
        if (site._id === _id) {
          site = res.data;
        }
      });
      this.loadSites();
    });
  };

  onChange = e => {
    if (e.target.id === "name") {
      this.setState({ nameCreate: e.target.value });
    } else if (e.target.id === "url") {
      this.setState({ urlCreate: e.target.value });
    } else if (e.target.id === "desc") {
      this.setState({ descCreate: e.target.value });
    }
  };

  render() {
    const { sites, open, nameCreate, urlCreate, descCreate } = this.state;
    return (
      <div className="container">
        <ModaleCreate
          open={open}
          openModal={this.onOpenModal}
          closeModal={this.onCloseModal}
          save={this.save}
          name={nameCreate}
          url={urlCreate}
          desc={descCreate}
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
                        </Link>
                      </h5>
                      <p>
                        Status : &nbsp;
                        {!site.status ? (
                          <span className="badge badge-pill badge-danger">
                            Site offline !
                          </span>
                        ) : (
                          <span className="badge badge-pill badge-success">
                            Site opérationnel !
                          </span>
                        )}
                        &nbsp; (dernière mise à jour : {site.timeToPing})
                      </p>
                      <p className="card-text">Site URL : {site.siteUrl}</p>
                      {site.data.length > 0 && (
                        <p>{site.data[site.data.length - 1].message}</p>
                      )}
                      <div className="row space">
                        <button
                          type="button"
                          className="btn btn-outline-success col"
                          onClick={() => this.ping(site._id)}
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
