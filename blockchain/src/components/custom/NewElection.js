import React, { Component } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import configserver from "../../configs";

import 'react-datetime-picker/dist/DateTimePicker.css';

class NewElection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election_name: '',
      election_organizer: '',
      election_password: '',
      election_end_date: new Date(),
      election_end_time: new Date(),
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDateChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleTimeChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { election_name, election_organizer, election_password, election_end_date, election_end_time } = this.state;
    console.log(election_name);

    axios
      .post(configserver + '/api/electionName', {
        election_name: election_name,
        election_organizer: election_organizer,
        election_password: election_password,
        election_end_time: `${election_end_date.toISOString().split('T')[0]}T${election_end_time.toTimeString().split(' ')[0]}`,
      })
      .then(function (response) {
        window.location.assign('/');
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  render() {
    const { election_name, election_organizer, election_password, election_end_date, election_end_time } = this.state;

    return (
      <div className="container">
        <h4>Create New Election</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="election_name"
            name="election_name"
            value={election_name}
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="name">Election Name</label>
          <br />
          <input
            type="text"
            id="election_organizer"
            name="election_organizer"
            value={election_organizer}
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="name">Election Organizer</label>
          <br />
          <input
            type="password"
            id="election_password"
            name="election_password"
            value={election_password}
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="name">Election Password</label>
          <br />
          <div style={{ display: 'inline-block', width: '100%' }}>
            <DateTimePicker
              id="election_end_date"
              name="election_end_date"
              value={election_end_date}
              onChange={(value) => this.handleDateChange('election_end_date', value)}
              required
              format="dd-MM-y"
              className="custom-datetime-picker"
            />
          </div>
          <label htmlFor="name">Election End Date</label>
          <br /><br />
          <div style={{ display: 'inline-block', width: '100%' }}>
            <DateTimePicker
              id="election_end_time"
              name="election_end_time"
              value={election_end_time}
              onChange={(value) => this.handleTimeChange('election_end_time', value)}
              required
              disableClock
              format="HH:mm"
              className="custom-datetime-picker"
            />
          </div>
          <label htmlFor="name">Election End Time</label>
          <br /><br />
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
