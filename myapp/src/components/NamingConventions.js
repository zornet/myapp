import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "react-bootstrap";
import ErrorPage from "./ErrorPage";
import "../Styles/ButtonsAndTitles.css"

class NamingConventions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      requestFailed: false,
      errorMessage: ""
    }

    this.handleButtonClick=this.handleButtonClick.bind(this);

  }

  handleButtonClick(event){
    let featureRequest =
      "http://127.0.0.1:5000/api/ims/run-naming-conventions";
    fetch(featureRequest, {method:'POST'})
      .then((response) => { if(!response.ok) {
        throw new Error(response.status);
        }
        else return response.json()})
      .then((data) => {
        this.setState({
          status: data,
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
          <h1 className='script-title'>Naming conventions for X</h1>
          <Button className='scripts-btn' onClick={this.handleButtonClick}>Start app</Button>
        </div>
      </div>
    );
  }
}



export default NamingConventions;
