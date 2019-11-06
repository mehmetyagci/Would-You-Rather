import React, {Component} from 'react';
import {connect} from 'react-redux';

import User from './User';

class Leaderboard extends Component {
  render () {
    return (
      <div>
        <h1> Leaderboard </h1>
        <ul className="dashboard-list">
          {this.props.userIds.map (id => (
            <li key={id}>
              <User id={id} />
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

function mapStateToProps({users}) {
  console.log ('mapStateToProps', users);
  console.log ('users[0].questions.length:', users['johndoe'].questions.length);

  console.log (
    'users[0].answers.length:',
    Object.keys (users['johndoe'].answers).length
  );

  return {
    userIds: Object.keys (users).sort (
      (a, b) =>
        (users[b].questions.length + Object.keys (users[b].answers).length) -
        (users[a].questions.length + Object.keys (users[a].answers).length)
    ),
  };
}

export default connect (mapStateToProps) (Leaderboard);
