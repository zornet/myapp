import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import ErrorPage from './ErrorPage';
import "../Styles/ButtonsAndTitles.css"

class CleanUpHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      issues: [],
      requestFailed: false,
      errorMessage: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.OnSearch = this.OnSearch.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    this.setState({ query: event.target.value });
  }

  OnSearch() {
    this.getIssuesFromQuery(this.state.query);
  }

  async getIssuesFromQuery(query) {
    let getRequest =
      "http://127.0.0.1:5000/api/jira/clean-up-helper/" + this.state.query;
    axios.get(getRequest)
      .then(response => {
        this.setState({ issues: response.data,
        });
      }).catch(error => {
        this.setState({errorMessage: "Can't get response from server"});
        this.setState({requestFailed: true});
        
      });
  }

  render() {
    if (this.state.requestFailed)
    return <ErrorPage errorText = {this.state.errorMessage}/>
    return (
      <div class="prm-background">
        <div class="clean-up" style={{display: "flex", justifyContent: "space-evenly", flexDirection:'column', margin:"2%"}}>
          <h1 className='script-title'>Issues which don't respect the runtime transition</h1>
          <div style={{alignSelf:"center"}}>
            <input style={{minWidth:'600px', textAlign:"center", alignSelf:'center'}} class="text-box" type="text" aria-label="Large" placeholder="Enter your query..." onChange={this.handleInputChange} />
            <Button className='scripts-btn' variant="dark" onClick={this.OnSearch}>Search</Button>
          </div>
        </div>


        {
          this.state.issues.map(item =>
            <ListGroup.Item action target="_blank" rel="noopener noreferrer" href={"https://jira-adas.zone2.agileci.conti.de/browse/" + item}>
              {item}
            </ListGroup.Item>

          )
        }

      </div>


    );
  }
}

export default CleanUpHelper;
