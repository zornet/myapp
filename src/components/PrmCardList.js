import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PrmCard from "./PrmCard";
import team from "../components/assets/team.json";


class PrmCardList extends React.Component {
  
  render() {
    return (
      <div className="team-description">
        <div className="prm-card-list">
          {team.map(( element) => (
            <PrmCard profile={element} />
          ))}
        </div>
      </div>
    );
  }
}

export default PrmCardList;