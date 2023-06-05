import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import configserver from "../../configs";

const Choose = () => {
  const [elections, setElections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElection, setSelectedElection] = useState(null);
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${configserver}/api/electionName`)
      .then((response) => {
        setElections(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedElection(null);
    setError("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const selected = elections.find(
      (election) =>
        election.election_name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (selected) {
      setSelectedElection(selected);
      history.push(`/vote/${selected.election_id}`);
    } else {
      setError("Invalid election name");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <div className="input-field">
          <h3 style={{ fontWeight: "semibold" }}>Input your Election Name</h3>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Enter Election Name"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Choose;
