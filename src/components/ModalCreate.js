import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./Navbar.scss";
import Modal from "react-responsive-modal";

class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        style={{ zIndex: 10 }}
        open={this.props.open}
        onClose={this.props.closeModal}
        center
      >
        <br />
        <p>
          If you want to monitor another website, you can add its back here. Be
          sure that the back adress is correct and accessible from GET method,
          and give it a title, and click on "+ Add the website".
          <br />
          N.B. : Be sure to update your CORS parameters!
        </p>
        <br />
        <br />
        <div class="form-group">
          <label for="name">Name of the website : {this.props.name}</label>
          <input
            type="text"
            value={this.props.name}
            onChange={this.props.onChange}
            class="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Ex: monsite.fr"
          />
        </div>
        <div class="form-group">
          <label for="url">URL of the backend : {this.props.url}</label>
          <input
            type="text"
            value={this.props.url}
            onChange={this.props.onChange}
            class="form-control"
            id="url"
            placeholder="Ex: monsite/api/"
          />
        </div>
        <div class="form-group">
          <label for="desc">Description (facultative) : </label>
          <input
            type="text"
            value={this.props.desc}
            onChange={this.props.onChange}
            class="form-control"
            id="desc"
            placeholder="Ex: Backend du projet..."
          />
        </div>
        <button class="btn btn-success" onClick={this.props.save}>
          <i class="fas fa-plus" /> Add the website
        </button>
      </Modal>
    );
  }
}

export default ModalCreate;
