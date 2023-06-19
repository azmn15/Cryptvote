import React, { Component } from "react";
import NewElection from "./components/custom/NewElection";
import NavBar from "./components/custom/Navbar";
import Home from "./components/custom/Home";
import Vote from "./components/custom/Vote";
import VoteCount from "./components/custom/VoteCount";
import CountUser from "./components/custom/CountUser";
import ElectionData from "./components/custom/ElectionData";
import Choose from "./components/custom/Choose";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import NewCandidate from "./components/custom/NewCandidate";
import Login from "./components/custom/Login";

class App extends Component {
  state = {
    isAuthenticated: false, // Set initial authentication state to false
  };

  // Simulate the login process
  login = () => {
    this.setState({ isAuthenticated: true });
  };

  // Simulate the logout process
  logout = () => {
    this.setState({ isAuthenticated: false });
  };

  render() {
    // Destructure the isAuthenticated state
    const { isAuthenticated } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          <NavBar isAuthenticated={isAuthenticated} logout={this.logout} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/elections" component={ElectionData} />
            <Route exact path="/result" component={CountUser}/>
            <Route exact path="/candidates/:id" component={NewCandidate} />
            <Route exact path="/vote/:id" component={Vote} />
            <Route exact path="/choose" component={Choose} />
            <Route
              exact
              path="/login"
              render={(props) =>
                isAuthenticated ? (
                  <Redirect to="/" />
                ) : (
                  <Login {...props} login={this.login} />
                )
              }
            />
            {/* <ProtectedRoute
              isAuthenticated={isAuthenticated}
              path="/voteCount/:id"
              component={VoteCount}
            /> */}
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              path="/newelection"
              component={NewElection}
            />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

// ProtectedRoute component to handle protected routes
const ProtectedRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default App;
