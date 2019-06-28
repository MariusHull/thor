import React, { Component } from "react";
import axios from "axios";
import "./Dashboard.scss";
import { Collapse } from "reactstrap";
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
      accordion: false,
      pinging: false,
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

  toggleAccordion = () => {
    const { accordion } = this.state;
    this.setState({ accordion: !accordion });
  };

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
      // let newSite = res.data;
      // sites.filter(site => site._id === newSite._id)=newSite;
      // sites.forEach(site => {
      //   if (site._id === _id) {
      //     site = res.data;
      //   }
      // });
      this.loadSites();
    });
  };

  pingAll = () => {
    const { pinging } = this.state;
    if (pinging > 0) return 0;
    this.setState({ pinging: 2 });
    setTimeout(() => this.setState({ pinging: this.state.pinging - 1 }), 500);
    axios.get(`${url}sites/allping`).then(res => {
      this.loadSites();
      this.setState({ pinging: pinging - 1 });
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
    const {
      sites,
      open,
      nameCreate,
      urlCreate,
      descCreate,
      accordion,
      pinging
    } = this.state;
    return (
      <div className="container">
        <div class="card text-white bg-secondary">
          <div class="card-header" onClick={this.toggleAccordion}>
            {accordion && (
              <div>
                <i className="fas fa-chevron-up" /> About Monithor
              </div>
            )}
            {!accordion && (
              <div>
                <i className="fas fa-chevron-down" /> About Monithor
              </div>
            )}
          </div>
          <Collapse isOpen={accordion}>
            <div class="card-body">
              <h5 class="card-title">
                The site is currently in development !{" "}
              </h5>
              <p class="card-text">
                The updates are very frequent, be sure to come back to check for
                updates!
              </p>
              <hr />
              <h5 class="card-title">Monithor : How it works? </h5>
              <p class="card-text">
                The principle is really simple. If you have deployed a backend
                in an unstable version and want to monitor it in case it
                crashes, Monithor is just for you! <br />
                Enter an http adress and monithor will ping it whenever you
                want. To do so, is simply sends an http GET request and checks
                for errors in the response.
              </p>
              <hr />
              <h5 class="card-title">Future updates will include : </h5>
              <p class="card-text">
                Automatic backend checking with selection of the time interval
                (hourly, daily, ...) <br />
                Selecting the method of the ping <br />
                Seeing the historic of each of the backends' availability <br />
                User personnal accounts with login <br />
              </p>
            </div>
          </Collapse>
        </div>
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
            <i className="fas fa-plus" /> Add a backend
          </button>
        </div>
        <div className="row space">
          <button
            type="button"
            onClick={this.pingAll}
            className="btn btn-outline-info col"
          >
            Check all backends{" "}
            {pinging && (
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
        <div className="card text-white bg-dark">
          <div className="card-header">Monitored backends</div>
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
                            Site running !
                          </span>
                        )}
                        &nbsp; (last update : {site.timeToPing})
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
              <h5 className="card-title">error...</h5>
              <p className="card-text">Error on loading</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default DashBoard;
