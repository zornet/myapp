import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup, Button } from "react-bootstrap";
import ErrorPage from "./ErrorPage";
import "../Styles/ButtonsAndTitles.css"

class CreateSS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketInfo:[],
      requestFailed: false,
      errorMessage: ""
    }

    this.handleButtonClick=this.handleButtonClick.bind(this);

  }

  handleButtonClick(event){
    let featureRequest =
      "http://127.0.0.1:5000/api/jira/create-stories";
    fetch(featureRequest, {method:'POST'})
      .then((response) => { if(!response.ok) {
        throw new Error(response.status);
        }
        else return response.json()})
      .then((data) => {
        this.setState({
          ticketInfo: data,
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
      <div class="prm-background">
        <div style={{display: "flex", justifyContent: "space-evenly", flexDirection:'column', margin:"2%"}}>
          <h1 className='script-title' >ADC420HA22 Stories/subtasks creation</h1>
          <Button className='scripts-btn' onClick={this.handleButtonClick}>Create Stories for epics in accepted</Button>
        </div> 
        {
          console.log(this.state.ticketInfo)
        }
        {
            this.state.ticketInfo.map(item =>
              <div>
                
              <ListGroup.Item>
                Story <a target="_blank" rel="noopener noreferrer" href={"https://jira-c-adas-test.zone2.agileci.conti.de/browse/" + item}>{item}</a> and its subtasks created succesfully.
              </ListGroup.Item>
              </div>
            )
            }     
      </div>
    );
  }
}


export default CreateSS;


