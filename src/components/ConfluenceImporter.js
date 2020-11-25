import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Select from 'react-select';

export default class ConfluenceImporter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceLink: "",
            destinationLink: "",
            jopUser: "",
            jopPassword: "",
            sourceId: "",
            adasUser: "",
            adasPassword: "",
            destinationID: "",
            destinationSpace: "",
            running: false,
            msg: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    handleSelectChange(event) {
        const value = event.value;
        this.setState({
            ...this.state,
            [event.name]: value
        });
    }


    handleButtonClick() {
        this.setState({ running: true, msg: "Please wait..." });
        var emptyFiels = false;
        for (var value in this.state)
            if (this.state[value] == "" && value != "running" && value != "msg")
                emptyFiels = true;
        if (emptyFiels)
            alert("Please complete all required fields!");
        else {
            let request = `http://127.0.0.1:5000/api/confluence_sync/${this.state.sourceLink}&${this.state.destinationLink}&${this.state.jopUser}&${this.state.jopPassword}&${this.state.sourceId}&${this.state.adasUser}&${this.state.adasPassword}&${this.state.destinationID}&${this.state.destinationSpace}`;

            axios.post(request)
                .then(response => {
                    //this.setState({ result: response.data });

                    console.log(response.data)
                    if (response.data == "Success")
                        this.setState({ msg: "Pages imported succesfully!" });
                    else
                        this.setState({ msg: "Error importing pages! Please check the input fields and the access rights on both servers!" });
                    this.setState({running : false});
                });
        }
    }

    render() {
        return (
            <div class="prm-background">
                <div style={{ display: "flex", justifyContent: "space-evenly", flexDirection: 'column', margin: "2%" }}>
                    <h1 className='script-title'>Import Honda Confluence Pages</h1>

                    <div style={{ display: "flex", justifyContent: "space-evenly", margin: "2%" }} >
                        <form style={{ display: "flex", justifyContent: "space-evenly", flexDirection: 'column', margin: "2%" }} >
                            <h2>Source</h2>

                            <Select
                                onChange={this.handleSelectChange}
                                options={[
                                    { name: "sourceLink", value: 'adas', label: 'ADAS' },
                                    { name: "sourceLink", value: 'honda', label: 'Honda' },
                                ]} />
                            {/*
                            <label>
                                <p>Confluence link</p>
                                <input type="text" name="sourceLink" onChange={this.handleChange} />
                            </label>
                            */}
                            <label>
                                <p>Username:</p>
                                <input type="text" name="jopUser" onChange={this.handleChange} />
                            </label>
                            <label>
                                <p>Password:</p>
                                <input type="password" name="jopPassword" onChange={this.handleChange} />
                            </label>
                            <label>
                                <p>Page Root:</p>
                                <input type="text" name="sourceId" onChange={this.handleChange} />
                            </label><br />
                        </form>
                        <form style={{ display: "flex", justifyContent: "space-evenly", flexDirection: 'column', margin: "2%" }}>
                            <h2>Destination</h2>

                            <Select
                                onChange={this.handleSelectChange}
                                options={[
                                    { name: "destinationLink", value: 'adas', label: 'ADAS' },
                                    { name: "destinationLink", value: 'honda', label: 'Honda' },
                                ]}
                            />
                            {/*
                            <label>
                                <p>Confluence link</p>
                                <input type="text" name="destinationLink" onChange={this.handleChange} />
                            </label>
                            */}
                            <label>
                                <p>Username:</p>
                                <input type="text" name="adasUser" onChange={this.handleChange} />
                            </label>
                            <label>
                                <p>Password:</p>
                                <input type="password" name="adasPassword" onChange={this.handleChange} />
                            </label>
                            <label>
                                <p>Page Root:</p>
                                <input type="text" name="destinationID" onChange={this.handleChange} />
                            </label>
                            <label>
                                <p>Space Title:</p>
                                <input type="text" name="destinationSpace" onChange={this.handleChange} />
                            </label>
                        </form>
                    </div>
                    {/* <Button className='scripts-btn' ref="btn" onClick={this.handleButtonClick}>Import</Button>
                    <Spinner ref="snr"animation="grow" variant="warning" style={{ alignSelf: "center" }} hidden/>
                    <h2 ref="suc" hidden style={{ alignSelf: "center" }}>Pages imported succesfully!</h2>
                    <h2 ref="err" hidden style={{ alignSelf: "center" }}>Error importing pages! Please check the input fields and the access rights on both servers!</h2> */}

                    <Button className='scripts-btn' onClick={this.handleButtonClick} disabled={this.state.running}>Import</Button>
                    <Spinner ref="snr" animation="grow" variant="warning" style={{ alignSelf: "center" }} hidden />
                    <Spinner animation="grow" variant="warning" style={{ alignSelf: "center" }} hidden={!this.state.running} />
                    <h2 ref="suc" hidden style={{ alignSelf: "center" }}>Pages imported succesfully!</h2>
                    <h2 style={{ alignSelf: "center" }}>{this.state.msg}</h2>
                </div>
            </div>
        );
    }
}  