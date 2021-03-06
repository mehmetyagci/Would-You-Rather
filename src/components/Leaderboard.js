import React, { Component } from "react";
import { connect } from "react-redux";

import User from "./User";

class Leaderboard extends Component {
  render() {
    return (
      <div>
        <div className="ui divided list">
          {this.props.userIds.map((id, index) => (
            <div className="item" key={id}>
              <User id={id} rank={index + 1} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users).sort(
      (a, b) =>
        users[b].questions.length +
        Object.keys(users[b].answers).length -
        (users[a].questions.length + Object.keys(users[a].answers).length)
    )
  };
}

export default connect(mapStateToProps)(Leaderboard);
