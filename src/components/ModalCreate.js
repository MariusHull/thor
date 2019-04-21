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
          Si vous voulez monitorer un site supplémentaire, vous pouvez l'ajouter
          ici. Soyez bien sûr que l'adresse du Back-end est correcte, puis
          donnez lui un titre et cliquez sur "+ Ajouter le site".
          <br />
          N.B. : Pensez-bien à régler vos paramètres CORS!
        </p>
        <br />
        <br />
        <div class="form-group">
          <label for="name">Nom du site : {this.props.name}</label>
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
          <label for="url">URL du site : {this.props.url}</label>
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
          <label for="desc">Description (facultatif) : </label>
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
          <i class="fas fa-plus" /> Ajouter le site
        </button>
      </Modal>
    );
  }
}

export default ModalCreate;
