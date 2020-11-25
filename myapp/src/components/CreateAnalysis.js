import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ListGroup } from "react-bootstrap";
import ErrorPage from "./ErrorPage";
import "../Styles/ButtonsAndTitles.css"

class CreateAS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      epicKeys:[],
      analysisKeys: [],
      tickets:'',
      show: "false",
      requestFailed: false,
      errorMessage: ""
    }

    this.handleButtonClick=this.handleButtonClick.bind(this);

  }

   handleButtonClick(event){
    let featureRequest =
      "http://127.0.0.1:5000/api/jira/create-analysis";
    fetch(featureRequest, {method:'POST'})
      .then((response) => { if(!response.ok) {
        throw new Error(response.status);
        }
        else return response.json()})
      .then((data) => {
        this.setState({
          epicKeys: Object.keys(data),
          analysisKeys: this.getValues(data),
          tickets: data,
          show: "true",
        });
        console.log(this.state.tickets);
      }).catch((error) => {
        this.setState({errorMessage: "Can't get response from server"});
        this.setState({requestFailed: true});
        console.log('error: ' + error);
        console.log('error: ' + this.state.requestFailed);
        console.log('error: ' + this.state.errorMessage);
      });
     
      // axios.post('http://127.0.0.1:5000/api/jira/create-analysis').then(response=>{
      //   console.log(response);
      //   alert(Object.keys(response.data[1]));
      // }).catch(error=>{console.log(error)})
  }
  
  getValues(dictionary){
    var value=[];
    var i=0;
    for(var key in dictionary){
      value[i] = dictionary[key];
      i++;
    }
      return value;
  }


  render() {
    if (this.state.requestFailed)
    return <ErrorPage errorText = {this.state.errorMessage}/>
    return (
      <div class="prm-background">
            <div style={{display: "flex", justifyContent: "space-evenly", flexDirection:'column', margin:"2%"}}>
              <h1 className='script-title'>ADC420HA22 Analysis Story creation</h1>
              <Button className='scripts-btn' onClick={this.handleButtonClick}>Create Analysis story for epics in classified</Button>
            </div>
            {
              console.log(this.state.tickets)
            }
          
            {
            Object.keys(this.state.tickets).map(item =>
              <div>
              <ListGroup.Item>
                Analysis story 
                <a target="_blank" rel="noopener noreferrer" href={"https://jira-c-adas-test.zone2.agileci.conti.de/browse/" + this.state.tickets[item]}>
                  {this.state.tickets[item]}
                  </a> 
                  created for 
                  <a target="_blank" rel="noopener noreferrer" href={"https://jira-c-adas-test.zone2.agileci.conti.de/browse/" + item}>
                    {item}
                  </a>
              </ListGroup.Item>
              </div>
              )
            }
      </div> 
        
      
    );
  }
}


export default CreateAS;