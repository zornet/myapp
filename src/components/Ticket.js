import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/TicketFeature";
import TicketFeature from "../components/TicketFeature";
import ErrorPage from "./ErrorPage";
import "../Styles/TicketPrediction.css"
import "../Styles/ButtonsAndTitles.css"

class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prediction: { prediction: "CISCO CLOSED" },
      ticketName: this.props.location.state.ticket.name,
      similarTickets: [],
      requestFailed: false,
      errorMessage: ""
    };
  }

  componentDidMount() {
    this.getTicketPrediction();
    this.getSimilarTickets();
  }

  getTicketPrediction() {
    let apiPath = "http://127.0.0.1:5000/api/ticket/local/predict/";
    if (this.props.location.state.cisco === true) {
      apiPath = "http://127.0.0.1:5000/api/ticket/predict/";
    }
    let predictionRequest = apiPath + this.state.ticketName;
    fetch(predictionRequest)
      .then((response) => { if(!response.ok) {
        throw new Error(response.status);
        }
        else return response.json()})
      .then((prediction) => {
        this.setState({
          prediction: prediction,
        });
      }).catch((error) => {
        this.setState({errorMessage: "Can't get response from server"});
        this.setState({requestFailed: true});
        console.log('error: ' + error);
        console.log('error: ' + this.state.requestFailed);
        console.log('error: ' + this.state.errorMessage);
      });
  }

  getSimilarTickets() {
    let similarTicketsRequest =
      "http://127.0.0.1:5000/api/ticket/similar/" + this.state.ticketName;
    fetch(similarTicketsRequest)
      .then((response) => { if(!response.ok) {
        throw new Error(response.status);
        }
        else return response.json()})
      .then((similarTickets) => {
        this.setState({
          similarTickets: similarTickets,
        });
      }).catch((error) => {
        this.setState({errorMessage: "Can't get response from server"});
        this.setState({requestFailed: true});
        console.log('error: ' + error);
        console.log('error: ' + this.state.requestFailed);
        console.log('error: ' + this.state.errorMessage);
      });
  }

  render() {
    if (this.state.requestFailed)
    return <ErrorPage errorText = {this.state.errorMessage}/>
    
    return (
      <div>
        <div class="prm-background">
          <div class="ticket-menu-elements">
            <div class="mt-3 ml-1 font1_5">
              <Card style={{ width: "55rem" }}>
                <Card.Title style={{ padding: "1rem" }}>
                  Ticket Details
                </Card.Title>
                <ListGroup.Item>
                  <TicketFeature
                    featureName="Issue Link"
                    featureInfo={this.props.location.state.ticket.name}
                  ></TicketFeature>
                </ListGroup.Item>
                <ListGroup.Item>
                  <TicketFeature
                    featureName="Prediction"
                    featureInfo={this.state.prediction.prediction}
                  ></TicketFeature>
                </ListGroup.Item>
                <ListGroup.Item>
                  <TicketFeature
                    featureName="Assignee"
                    featureInfo={this.props.location.state.ticket.assignee}
                  ></TicketFeature>
                </ListGroup.Item>
                <ListGroup.Item>
                  <TicketFeature
                    featureName="Start Date"
                    featureInfo={this.props.location.state.ticket.startDate}
                  ></TicketFeature>
                </ListGroup.Item>
                <ListGroup.Item>
                  <TicketFeature
                    featureName="Summary"
                    featureInfo={this.props.location.state.ticket.summary}
                  ></TicketFeature>
                </ListGroup.Item>
                <ListGroup.Item>
                  <TicketFeature
                    featureName="Jira Link"
                    featureInfo={this.props.location.state.ticket.jiraLink}
                  ></TicketFeature>
                </ListGroup.Item>
              </Card>
            </div>
            <div class="mt-3 ml-1 font1_3">
              <Card style={{ width: "18rem" }}>
                <Card.Title style={{ padding: "1rem" }}>
                  Similar Tickets
                </Card.Title>
                {this.state.similarTickets.map((ticket) => (
                  <ListGroup.Item>{ticket}</ListGroup.Item>
                ))}
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ticket;
