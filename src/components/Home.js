import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PrmCardList from "./PrmCardList";


class Home extends React.Component {
  
  render() {
    return (
      <div className="prm-background">
        <div className ="team-description">
          <p className ="p-title">Problem Resolution Management​ & Configuration Management</p> 
          <p className ="p-location">Iasi</p> 
        </div>
        <PrmCardList></PrmCardList>
      </div>
    );
  }
}

export default Home;