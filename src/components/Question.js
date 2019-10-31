import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import ShadowWrapper from "react-shadow-wrapper";

class Question extends Component {
  render() {
    const { question } = this.props;
    console.log("Question", question);

    if (question == null) {
      // TODO: this line go to 404 page
      return <p>This Question doesn't exist</p>;
    }

    return (
      <ShadowWrapper>
        <div className="ui image">
          <img
            src={question.author.avatarURL}
            alt={`Avatar of ${question.author.name}`}
          />
        </div>

        <div className="content">
          <div className="header"> {question.author.name} asks:</div>
          <div className="meta">
            <span> Would you rather </span>
          </div>
          <div className="description">
            <p>...{question.optionOne.text.substring(0, 15)}...</p>
          </div>

          <div className="extra content">
            <div className="ui submit button">View Poll</div>
          </div>
        </div>
      </ShadowWrapper>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  console.log("components->Question->mapStateToProps");
  console.log(question);
  const answered =
    question.optionOne.votes.length + question.optionTwo.votes.length > 0
      ? true
      : false;
  console.log(
    `optionOne.votes:${question.optionOne.votes.length} optionTwo.votes:${question.optionTwo.votes.length} answered:${answered} `
  );

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser, answered)
      : null
  };
}

export default connect(mapStateToProps)(Question);
