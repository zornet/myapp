import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TeamPicture from "./assets/images/team.png";

class ErrorPage extends React.Component {
  
  render() {
    return (
      <div style={{alignSelf:''}}>
        <h1  style = {{fontSize:'26px', textAlign:'center', marginTop:'2vh', marginBottom:0}}>Error : {this.props.errorText}</h1>
        <img src = {TeamPicture} style = {{display:'block', maxWidth:'55vw', marginLeft:"auto", marginRight:"auto"}}></img>
      </div>
    );
  }
}

export default ErrorPage;