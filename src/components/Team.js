import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PrmCardList from "./PrmCardList";
import "../Styles/Team.css"

class Team extends React.Component {
  
  render() {
    return (
      <div class ="prm-background">
        <div class ="team-description">
          <p class ="p-title">Problem Resolution Management​ & Configuration Management</p> 
          <p class ="p-location">Iasi</p> 
        </div>
        <PrmCardList></PrmCardList>
      </div>
    );
  }
}

export default Team;