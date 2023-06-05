import React, { Component } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker'

import configserver from "../../configs"


class NewElection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            election_name: '',
            election_organizer: '',
            election_password: '',
            election_end_time: '', // Add the new field for election end time
        };
    }
    

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { election_name, election_organizer, election_password, election_end_time } = this.state;
        console.log(election_name);
        axios
            .post(configserver + '/api/electionName', {
                election_name: election_name,
                election_organizer: election_organizer,
                election_password: election_password,
                election_end_time: election_end_time, // Add the new field for election end time
            })
            .then(function(response) {
                window.location.assign('/');
            })
            .catch(function(err) {
                console.error(err);
            });
    };

    render() {
        return (
            <div className="container">
                <h4>Create New Election</h4>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        id="election_name"
                        name="election_name"
                        onChange={this.handleInputChange}
                        required
                    />
                    <label htmlFor="name">Election Name</label>
                    <br></br>
                    <input
                        type="text"
                        id="election_organizer"
                        name="election_organizer"
                        onChange={this.handleInputChange}
                        required
                    />
                    <label htmlFor="name">Election Organizer</label>
                    <br></br>
                    <DateTimePicker
                        type="password"
                        id="election_password"
                        name="election_password"
                        onChange={this.handleInputChange}
                        required
                    />
                    <label htmlFor="name">Election Password</label>
                    <br></br>
                    <div>
                    <DateTimePicker
                        id="election_end_time"
                        name="election_end_time"
                        onChange={this.handleInputChange}
                        required
                    />
                   </div>
                    <label htmlFor="name">Election End Time</label>
                    <br></br><br></br>
                    <button className="btn blue darken-2" type="submit" name="action">
                        Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        );
    }
    
}

export default NewElection;