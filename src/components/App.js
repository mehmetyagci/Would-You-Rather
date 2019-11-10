import React, {Component, Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import {connect} from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

import {handleInitialData} from '../actions/shared';
import Dashboard from './Dashboard';
import NewQuestion from './NewQuestion';
import QuestionPage from './QuestionPage';
import Leaderboard from './Leaderboard';
import Nav from './Nav';
import Login from './Login';
import NotFound from './NotFound';

class App extends Component {
  componentDidMount () {
    this.props.dispatch (handleInitialData ());
    console.log ('App->componentDidMount', this.props);
  }

  render () {
    const {authedUser, authenticated} = this.props;

    console.log ('App->render->authedUser1:', authedUser);
    console.log ('App->render->authedUser2:', this.props.authedUser);

    return (
      <Router>
        <Fragment>
          <div className="ui container">
            {authenticated && <Nav />}
            <Switch>
              {!authenticated
                ? <Route path="/" exact component={Login} />
                : <Fragment>
                    <Route path="/" exact component={Dashboard} />
                    <Route
                      path="/question/:id"
                      exact
                      component={QuestionPage}
                    />
                    <Route path="/new" exact component={NewQuestion} />
                    <Route path="/leaderboard" exact component={Leaderboard} />
                  </Fragment>}
              <Route component={NotFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({authedUser, questions}) {
  return {
    loading: questions === null,
    authenticated: authedUser !== null,
    authedUser,
  };
}

export default connect (mapStateToProps) (App);
