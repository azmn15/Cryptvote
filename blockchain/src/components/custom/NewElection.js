import React, { useState } from "react";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import configserver from "../../configs";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const NewElection = () => {
  const [electionName, setElectionName] = useState("");
  const [electionOrganizer, setElectionOrganizer] = useState("");
  const [electionPassword, setElectionPassword] = useState("");
  const [electionDateTime, setElectionDateTime] = useState(new Date());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "election_name") setElectionName(value);
    else if (name === "election_organizer") setElectionOrganizer(value);
    else if (name === "election_password") setElectionPassword(value);
  };

  const handleDateTimeChange = (value) => {
    setElectionDateTime(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(electionDateTime.toISOString());
    axios
      .post(configserver + "/api/electionName", {
        election_name: electionName,
        election_organizer: electionOrganizer,
        election_password: electionPassword,
        election_end_date_time: electionDateTime.toISOString(),
      })
      .then(function (response) {
        window.location.assign("/");
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <h4>Create New Election</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="election_name"
          name="election_name"
          value={electionName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="name">Election Name</label>
        <br />
        <input
          type="text"
          id="election_organizer"
          name="election_organizer"
          value={electionOrganizer}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="name">Election Organizer</label>
        <br />
        <input
          type="password"
          id="election_password"
          name="election_password"
          value={electionPassword}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="name">Election Password</label>
        <br />
        <div style={{ display: "inline-block", width: "100%" }}>
          <DateTimePicker
            onChange={handleDateTimeChange}
            value={electionDateTime}
          />
        </div>
        <label htmlFor="name">Election End Date</label>

        <br />
        <button className="btn blue darken-2" type="submit" name="action">
          Submit
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  );
};

export default NewElection;
