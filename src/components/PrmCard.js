import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class PrmCard extends React.Component {
  constructor(props) {
    super(props);
    this.profile = props.profile;
  }

  render() {
    return (
      <div className="prm-card">
        <img
          className="profile-image"
          src={this.profile.image_url}
          alt="Avatar"
          display="block"
        />
        <h4>
          <b>{this.profile.card_name}</b>

        </h4>
        <h4>
          <b>{this.profile.card_first_name}</b>
        </h4>
        <p>{this.profile.card_title}</p>
      </div>
    );
  }
}

export default PrmCard;