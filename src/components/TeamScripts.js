import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from 'react-bootstrap/Button';
import "../Styles/ButtonsAndTitles.css"

class TeamScripts extends React.Component {

  render() {
    return (
        <div className="prm-background">
            <div>
                <List >

                    <ListItem>
                        <Button href="http://localhost:3000/jirascripts/create-analysis" style={btnStyle} className='scripts-btn'>JIRA</Button>
                        <ListItemText primary="ADC420HA22 Analysis Story creation" secondary="Create Analysis Stories for ADC420HA22 Epics in Classified" />
                    </ListItem>

                    <ListItem>
                        <Button href="http://localhost:3000/jirascripts/create-stories-and-subtasks" style={btnStyle} className='scripts-btn'>JIRA</Button>
                        <ListItemText primary="ADC420HA22 Stories/subtasks creation" secondary="Create Stories with subtasks for ADC420HA22" />
                    </ListItem>

                    <ListItem>
                        <Button href="http://localhost:3000/jirascripts/clean-up" style={btnStyle} className='scripts-btn'>JIRA</Button>
                        <ListItemText primary="Workflow's guardian" secondary="Clean-up helper - Return issues which don't respect the runtime transition" />
                    </ListItem>
                    
                    <ListItem>
                        <Button href="http://localhost:3000/jirascripts/walloffame" style={btnStyle} className='scripts-btn'>JIRA</Button>
                        <ListItemText primary="Wall Of Fame" secondary="See how many tickets respect the Unicorn Workflow for each project" />
                    </ListItem>
                    
                    <ListItem>
                        <Button href="http://localhost:3000/jirascripts/script2" style={btnStyle} className='scripts-btn'>JIRA</Button>
                        <ListItemText primary="Generate epics in ADC420HA22" secondary="This script clones Feature Requests from project HGEN1L1 with Area of Resposnsibilty ADCU into the project ADC420HA22  " />
                    </ListItem>

                    <ListItem>
                        <Button href="http://localhost:3000/imsscripts/naming-conventions" style={btnStyle} className='scripts-btn'>IMS</Button>
                        <ListItemText primary="Naming conventions" secondary="Checks the naming convetion for all of the files stored in IMS project in regards to ADAS stages rules found in CM Plan" />
                    </ListItem>

                    <ListItem>
                        <Button href="http://localhost:3000/imsscripts/walloffameims" style={btnStyle} className='scripts-btn'>IMS</Button>
                        <ListItemText primary="Wall Of Fame for IMS" secondary="" />
                    </ListItem>

                    <ListItem>
                        <Button href="http://localhost:3000/imsscripts/folder-structure" style={btnStyle} className='scripts-btn'>IMS</Button>
                        <ListItemText primary="Folder Structure" secondary="" />
                    </ListItem>

                    <ListItem>
                        <Button href="http://localhost:3000/confluence" style={btnStyle} className='scripts-btn'>CONF</Button>
                        <ListItemText primary="Confluence Sync" secondary="" />
                    </ListItem>

                </List>
            </div>
      </div>
    );
  }
}

const btnStyle={
    margin:10,
}

export default TeamScripts;