import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ListGroup } from "react-bootstrap";
import ErrorPage from "./ErrorPage";
import "../Styles/ButtonsAndTitles.css"

  
class CreateEpicsHA22 extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      tickets:"",
      requestFailed: false,
      errorMessage: ""
    }
    this.handleClickEvent=this.handleClickEvent.bind(this);
  }

  handleClickEvent(event){
    let featureRequest =
    "http://127.0.0.1:5000/api/jira/CreateEpicsHA22" ;
  fetch(featureRequest,{method:"POST"})
    .then((response) => { if(!response.ok) {
      throw new Error(response.status);
      }
      else return response.json()})
    .then((data) => {
      this.setState({
        tickets: data,
      })}).catch((error) => {
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
            <h1 className='script-title'>Create epics in ADC420HA22</h1> 
            <Button className='scripts-btn' onClick={this.handleClickEvent}>Run Script </Button>
          </div>
            { Object.keys(this.state.tickets).map(item =>
             <div>
                <ListGroup.Item action target="_blank" 
                                rel="noopener noreferrer"  
                                href={"https://jira-c-adas-test.zone2.agileci.conti.de/browse/" + this.state.tickets[item]}>
                  {
                    this.state.tickets[item]
                  }
                </ListGroup.Item>
              </div>
              ) }
            </div>
    );
  }

}

export default CreateEpicsHA22;