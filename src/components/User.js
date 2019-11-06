import React, {Component} from 'react';
import {connect} from 'react-redux';

class User extends Component {
  render () {
    const {user} = this.props;
    const {name, avatarURL, questions, answers} = user;
    const questionsLength = questions.length;
    const answersLength = Object.keys (answers).length;

    console.log ('User->user:', user);

    if (user === null) return <p>This User doesn't exist</p>;

    return (
      <div>
        <h1>{name}</h1>
        <img src={avatarURL} alt={`Avatar of ${user.name}`} />
        <h3>Question asked: {questionsLength}</h3>
        <h3>Question answered: {answersLength}</h3>
        <h2>Total Score: {questionsLength + answersLength}</h2>
        <hr />
      </div>
    );
  }
}

function mapStateToProps ({users}, {id}) {
  const user = users[id];

  return {
    user,
  };
}

export default connect (mapStateToProps) (User);
