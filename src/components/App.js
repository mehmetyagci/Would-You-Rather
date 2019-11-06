import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading-bar";

import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import Nav from "./Nav";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
    console.log("App->componentDidMount", this.props);
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="ui container">
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/question/:id" component={QuestionPage} />
                <Route path="/new" component={NewQuestion} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
