import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Button } from 'react-bootstrap'
import { Dropdown } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import Footer from './Footer';


const issuetypes_rules = {
    'Problem Report': ['respects_runtime_transitions', 'doesnt_have_children_if_in_invalid_state'],
    'Realization Order': ['is_linked_to_parent_in_corresponding_state'],
    'Feature Request': ['feature request doesnt_have_issues_if_in_invalid_state'],
    'Change Request': ['change request doesnt_have_issues_if_in_invalid_state'],
    'Analysis Task': ['analysis task doesnt_have_issues_if_in_invalid_state'],
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

function Results(props) {
    if (props.project == '') {
        return (
            <p> </p>
        );
    }
    return (
        <div class="walloffame-results">
            <h3>Number of ok tickets: {props.nrOkIssues}</h3>
            <h3>Number of not ok tickets:{props.nrNotOkIssues}</h3>
        </div>
    )
}


function RenderTable(props) {
    if (props.rules == '') {
        return (
            <p> </p>
        );
    }
    return (
        console.log(props.rules.respects_runtime_transitions),
        <Table striped bordered hover variant="dark" className='myTable'>
            <thead>
                <tr>
                    <th>Rule</th>
                    <th>Tickets which respect the rule</th>
                    <th>Tickets which don't respect the rule</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(props.rules).map(item =>
                        <tr>
                            <td>{item}</td>
                            <td>{props.rules[item].nr_ok}</td>
                            <td>{props.rules[item].nr_not_ok}</td>
                        </tr>
                    )}
            </tbody>
        </Table>)
}

class WallOfFameIMS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goButton: 0,
            serializedProjects: [],
            nrOkIssues: 'not set',
            nrNotOkIssues: 'not set',
            rules: '',
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
        console.log("urmeaza sa apelez getserializedprojects");
        this.getSerializedProjects();
        console.log(this.state.serializedProjects);
    }
    async getSerializedProjects() {
        let url = "http://127.0.0.1:5000/api/PRM-scripts/WallOfFameIMS/serialized-queries";
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
    getResults() {
        let url = "http://127.0.0.1:5000/api/PRM-scripts/WallOfFameIMS/get-results"
        axios.post(url, {
            "filename": this.state.selectedProject,
            "issuetypes": [this.state.selectedIssuetype]
        }).then(response => {
            this.setState({
                goButton: 1,
                rules: response.data.rules,
                nrOkIssues: response.data.nr_ok_issues,
                nrNotOkIssues: response.data.nr_not_ok_issues
            });
            console.log(this.state.rules);
        });
    }


    render() {
        console.log(this.state.rules)
        return (
            <div className="prm-background">
                <h1 class="script-title">WallOfFame for IMS</h1>
                <div class="dropdowns">
                    <Dropdown className='mydropdown'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.selectedProject}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.state.serializedProjects.map(this.makeProjectDropdownItem)}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className='mydropdown'>
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
                </div> 
                 <Greetings project={this.state.selectedProject} issuetype={this.state.selectedIssuetype}></Greetings> */}
                {/* <Results nrOkIssues={this.state.nrOkIssues} nrNotOkIssues={this.state.nrNotOkIssues} project={this.state.selectedProject}></Results> */}
                <RenderTable rules={this.state.rules}></RenderTable>
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


export default WallOfFameIMS;
