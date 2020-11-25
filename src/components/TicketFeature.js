import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class TicketFeature extends React.Component {

  render() {
    return (
      <div class="row-flex">
        <div class="min_font_70 min-w margin-padding-reset">
          <p>{this.props.featureName} : </p>
        </div>
        <div class="margin-padding-reset min_font_70">
          {this.props.featureInfo}
        </div>
      </div>
    );
  }
}

export default TicketFeature;
