import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Select from 'react-select';
import { Button } from 'react-bootstrap'
import { Dropdown } from "react-bootstrap";
import "../Styles/WallOfFame.css"
import "../Styles/ButtonsAndTitles.css"


const issuetypes_rules = {
    'Problem Report': ['respects_runtime_transitions', 'doesnt_have_children_if_in_invalid_state'],
    'Story': ['is_linked_to_parent_in_corresponding_state'],
    'Epic': ['epic doesnt_have_issues_if_in_invalid_state'],
    'All issuetypes': []
}

function Greetings(props) {
    return (
        <div>
            <h2>{props.project}</h2>
            <h2>{props.issuetype}</h2>
        </div>
    );
}

function Results(props){
    if(props.nrOkIssues == 'not set'){
        return(
          <p> </p>  
        );
    }
    return(
        <div class="walloffame-results">
            <h3><b>Valid</b> Tickets: {props.nrOkIssues}</h3>
            <h3><b>Invalid</b> Tickets: {props.nrNotOkIssues}</h3>
        </div>
    )
}

class WallOfFame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serializedProjects: [],
            nrOkIssues: 'not set',
            nrNotOkIssues: 'not set',
            selectedProject: 'choose project',
            selectedIssuetype: 'All issuetypes'
        }
        this.getSerializedProjects = this.getSerializedProjects.bind(this);
        this.updateSelectedProject = this.updateSelectedProject.bind(this);
        this.updateSelectedIssuetype = this.updateSelectedIssuetype.bind(this);
        this.makeIssuetypeDropdownItem = this.makeIssuetypeDropdownItem.bind(this);
        this.getResults = this.getResults.bind(this);
        this.makeProjectDropdownItem = this.makeProjectDropdownItem.bind(this);

        //calling this in the constructor in order to know what projects are available from the start
        // console.log("urmeaza sa apelez getserializedprojects");
        // this.getSerializedProjects();
        // console.log(this.state.serializedProjects);
    }
    async getSerializedProjects() {
        let url = "http://127.0.0.1:5000/api/PRM-scripts/WallOfFame/serialized-projects";
        await axios.get(url)
            .then(response => {
                this.setState({ serializedProjects: response.data });
            });
    }

    updateSelectedProject(newValue) {
        this.setState({ selectedProject: newValue });
    }
    makeProjectDropdownItem = function (X) {
        return (
            <Dropdown.Item onClick={() => this.updateSelectedProject(X)}>{X}</Dropdown.Item>
        );
    }
    updateSelectedIssuetype(newValue) {
        this.setState({ selectedIssuetype: newValue });
    }
    makeIssuetypeDropdownItem = function (X) {
        return (
            <Dropdown.Item onClick={() => this.updateSelectedIssuetype(X)}>{X}</Dropdown.Item>
        );
    }
    getResults(){
        let url = "http://127.0.0.1:5000/api/PRM-scripts/WallOfFame/get-results"
        axios.post(url,{
            "project": this.state.selectedProject,
            "issuetypes": [this.state.selectedIssuetype]
        }).then(response => {
            console.log(response.data);
            this.setState({ nrOkIssues: response.data.nr_ok_issues,
                            nrNotOkIssues: response.data.nr_not_ok_issues});
        });
    }


    render() {
        return (
            <div className="prm-background">
                <h1 class="script-title">WallOfFame</h1>
                <div class="dropdowns">
                    <Dropdown   className='mydropdown'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.selectedProject}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.state.serializedProjects.map(this.makeProjectDropdownItem)}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown  className='mydropdown'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.selectedIssuetype}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {Object.keys(issuetypes_rules).map(this.makeIssuetypeDropdownItem)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div>
                        <Button className='scripts-btn' disabled={this.state.selectedProject == 'choose project'} onClick={this.getResults}>Go</Button>
                    </div>
                </div>
                {/* <div>
                    <Button disabled={this.state.selectedProject == 'choose project'}>Go</Button>
                </div> */}
                {/* <Greetings project={this.state.selectedProject} issuetype={this.state.selectedIssuetype}></Greetings> */}
                <Results  nrOkIssues={this.state.nrOkIssues} nrNotOkIssues={this.state.nrNotOkIssues} project={this.state.selectedProject}></Results>
            </div>
        );
    }
    async componentDidMount() {
        console.log("FROM DIDMOUNT");
        console.log("urmeaza sa apelez getserializedprojects");
        await this.getSerializedProjects();
        console.log(this.state.serializedProjects);
    }
}


export default WallOfFame;
