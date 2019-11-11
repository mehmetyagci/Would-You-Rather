import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import {setAuthedUser} from '../actions/authedUser';

class Nav extends Component {
  handleLogout = e => {
    e.preventDefault ();
    const {history, setAuthedUser} = this.props;
    history.push ('/');
    setAuthedUser (null);
  };

  render () {
    const {authenticated, authedUser, user} = this.props;
    return (
      <div className="ui secondary menu teal">

        <NavLink className="item" to="/" exact activeClassName="active">
          Home
        </NavLink>
        <NavLink className="item" to="/new" activeClassName="active">
          New Question
        </NavLink>
        <NavLink className="item" to="/leaderboard" activeClassName="active">
          Leaderboard
        </NavLink>

        {authenticated &&
          <div className="right menu">
            <div className="item">
              <img
                className="ui avatar image"
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`}
              />
              <span>{user.name}</span>
            </div>
            <div className="item">
              <div
                className="ui fluid large submit button teal"
                onClick={this.handleLogout}
              >
                Logout
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    authenticated: authedUser !== null,
    user: users[authedUser],
  };
}

function mapDispatchToProps (dispatch) {
  return {
    setAuthedUser: id => {
      dispatch (setAuthedUser (id));
    },
  };
}

export default withRouter (connect (mapStateToProps, mapDispatchToProps) (Nav));
