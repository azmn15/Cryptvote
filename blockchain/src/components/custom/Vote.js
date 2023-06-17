import React, { Component } from "react";
import Web3 from "web3";
import Election from "../../build/Election.json";
import { Link } from "react-router-dom";

class Vote extends Component {
  state = {
    id: null,
    account: "",
    election: null,
    candCount: 0,
    candidates: [],
    loading: true,
    selectedId: null,
    endTime: null,
    hasVoted: false,
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ id });
    await this.loadWeb3();
    await this.loadBlockchainData();
    this.checkElectionStatus();
  }

  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Election.networks[networkId];
    if (networkData) {
      const election = new web3.eth.Contract(Election.abi, networkData.address);
      this.setState({ election });
      const candCount = await election.methods.candidatesCount().call();
      this.setState({ candCount });
      for (let i = 1; i <= candCount; i++) {
        const candidate = await election.methods.candidates(i).call();
        if (candidate.election_id === this.state.id) {
          this.setState({
            candidates: [...this.state.candidates, candidate],
          });
        }
      }
    } else {
      window.alert("Election contract not deployed to detected network.");
    }
  };

  checkElectionStatus = () => {
    const now = new Date().getTime();
    const endTime = this.state.endTime;
    if (endTime && endTime < now) {
      this.setState({ hasVoted: true });
    }
  };

  handleVote = (id) => {
    if (this.state.hasVoted) {
      window.alert("You may vote once.");
      return;
    }
    this.setState({ selectedId: id });
    this.vote(id);
  };

  vote = async (id) => {
    this.setState({ loading: true });
    try {
      await this.state.election.methods
        .vote(id)
        .send({ from: this.state.account });
      this.setState({ loading: false, hasVoted: true });
      window.location.assign("/");
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  };

  renderCandidates = () => {
    const { candidates, hasVoted, selectedId } = this.state;
    return candidates.map((candidate) => {
      const { id, name, details } = candidate;
      const isDisabled = hasVoted || selectedId === id;
      return (
        <div className="contact" key={id}>
          <li className="collection-item avatar">
            <i className="material-icons circle blue darken-2">ballot</i>
            <p>
              <b>{name}</b>
            </p>
            <p>{details}</p>
            <button
              disabled={isDisabled}
              id={id}
              onClick={() => this.handleVote(id)}
              className={`waves-effect waves-light btn blue darken-2 ${
                isDisabled ? "disabled" : ""
              }`}
            >
              {hasVoted ? "Voted" : "Vote"}
            </button>
          </li>
        </div>
      );
    });
  };

  render() {
    const { candidates, hasVoted, endTime } = this.state;
    const electionList = candidates.length ? (
      this.renderCandidates()
    ) : (
      <p>No candidates available.</p>
    );

    const now = new Date().getTime();
    const electionEndTime = endTime ? new Date(endTime).getTime() : null;
    const isElectionEnded = electionEndTime && electionEndTime < now;

    return (
      <div className="container">
        <h3>Candidates</h3>
        {isElectionEnded ? (
          <p>Election for this has ended.</p>
        ) : endTime ? (
          hasVoted ? (
            <p>You have already voted in this election.</p>
          ) : (
            <div>
              <p>
                This election will end at:{" "}
                {new Date(endTime).toLocaleString()}
              </p>
              <ul className="collection">{electionList}</ul>
            </div>
          )
        ) : (
          <p>Election data loading...</p>
        )}
      </div>
    );
  }
}

export default Vote;

