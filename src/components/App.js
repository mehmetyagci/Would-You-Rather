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
import {PrivateRoute} from './PrivateRoute';
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
  }

  render () {
    const {authedUser, authenticated} = this.props;
    const MainComponent = !authenticated ? Login : Dashboard;

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Fragment>
          <div className="ui container">
            {authenticated && <Nav />}
            <Switch>
              {!authenticated
                ? <Route path="/" exact component={Login} />
                : <Fragment>
                    <Route path="/" exact component={Dashboard} />
                    <Route
                      path="/questions/:id"
                      exact
                      component={QuestionPage}
                    />
                    <Route path="/add" exact component={NewQuestion} />
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
