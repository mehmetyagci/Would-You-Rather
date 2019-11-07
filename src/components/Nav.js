import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Nav extends Component {

  render() {
    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/new" activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leaderboard
            </NavLink>
          </li>         
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({authedUser,users}) {
    console.log('Nav->mapStateToProps,authedUser',authedUser);

    return {
      authedUser,
      user: users[authedUser]
    };
  }
  
  export default connect (mapStateToProps) (Nav);
