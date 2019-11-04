import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading-bar';

import Dashboard from './Dashboard';
import NewQuestion from './NewQuestion';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
    console.log("App->componentDidMount",this.props);
  }

  render() {
    return (
      <div className="ui container">
        <LoadingBar />
        {this.props.loading === true
          ? null
          : <NewQuestion />
        }
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
