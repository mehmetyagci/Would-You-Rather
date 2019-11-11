import React, { Component } from "react";
import { connect } from "react-redux";

class User extends Component {
  render() {
    const { user, rank } = this.props;
    const { name, avatarURL, questions, answers } = user;
    const questionsLength = questions.length;
    const answersLength = Object.keys(answers).length;

    console.log("User->user:", user);

    if (user === null) return <p>This User doesn't exist</p>;

    return (
      <div className="ui grid internally celled">
        <div className="row">
          <div className="four wide floated column">
            <div className="header">
              <h1 className="ui header centered">{name}</h1>
            </div>
          </div>
          <div className="twelve wide floated column"></div>
        </div>
        <div className="row">
          <div className="four wide floated column">
            <div className="ui fluid image">
              <div className="ui large ribbon teal label">Rank:{rank}</div>
              <img
                className="medium"
                src={avatarURL}
                alt={`Avatar of ${name}`}
              />
            </div>
          </div>
          <div className="twelve wide floated column">
            <div className="ui segment">
              <div className="ui statistics">
                <div className="statistic teal">
                  <div className="value">{questionsLength}</div>
                  <div className="label">Question asked</div>
                </div>
                <div className="statistic teal">
                  <div className="value">{answersLength}</div>
                  <div className="label">Question answered</div>
                </div>
                <div className="statistic teal">
                  <div className="value">{questionsLength + answersLength}</div>
                  <div className="label">Total Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  const user = users[id];

  return {
    user
  };
}

export default connect(mapStateToProps)(User);
