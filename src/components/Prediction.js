import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import ErrorPage from "./ErrorPage";
import "../Styles/ButtonsAndTitles.css"

class Prediction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textboxValue: "",
      redirectToTicket: false,
      ticket: "",
      prediction: "",
      checkedB: false,
      ciscoDisplayState: "Cisco Off",
      requestFailed: false,
      errorMessage: ""
    };
    this.handleTextBoxChnage = this.handleTextBoxChnage.bind(this);
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleTextBoxChnage(event) {
    this.setState({ textboxValue: event.target.value });
  }

  handleClickEvent(event) {
    let featureRequest =
      "http://127.0.0.1:5000/api/ticket/features/" + this.state.textboxValue;
    fetch(featureRequest)
      .then((response) => { if(!response.ok) {
        throw new Error(response.status);
        }
        else return response.json()})
      .then((data) => {
        this.setState({
          ticket: data,
        });
        this.setState({
          redirectToTicket: true,
        });
      }).catch((error) => {
        this.setState({errorMessage: "Can't get response from server"});
        this.setState({requestFailed: true});
        console.log('error: ' + error);
        console.log('error: ' + this.state.requestFailed);
        console.log('error: ' + this.state.errorMessage);
      });
  }

  handleSwitch() {
    if (this.state.checkedB === false) {
      this.setState({
        checkedB: true,
        ciscoDisplayState: "Cisco On",
      });
    }
    if (this.state.checkedB === true) {
      this.setState({
        checkedB: false,
        ciscoDisplayState: "Cisco Off",
      });
    }
  }

  render() {
    if (this.state.requestFailed)
    return <ErrorPage errorText = {this.state.errorMessage}/>
    
    if (this.state.redirectToTicket === true) {
      return (
        <Redirect
          to={{
            pathname: "/ticket",
            state: {
              ticket: this.state.ticket,
              cisco: this.state.checkedB,
            },
          }}
        />
      );
    }

    return (
      <div class="prm-background">
        <div class="row-flex ml-2 mt-4">
          <h3>{this.state.ciscoDisplayState}</h3>
          <Switch
            checked={this.state.checkedB}
            onChange={this.handleSwitch}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div class="prediction-form ml-2">
          <input
            class="text-box"
            type="text"
            placeholder="Issue link"
            onChange={this.handleTextBoxChnage}
          />
          <Button variant="primary" className='scripts-btn' onClick={this.handleClickEvent}>
            Predict
          </Button>
        </div>
      </div>
    );
  }
}

export default Prediction;
