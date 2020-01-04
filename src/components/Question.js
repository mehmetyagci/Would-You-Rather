import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { formatQuestion } from "../utils/helpers";
import { handleAnswerQuestion } from "../actions/questions";

class Question extends Component {
  handleAnswer = (e, answer) => {
    e.preventDefault();
    const { dispatch, question, authedUser } = this.props;
    dispatch(
      handleAnswerQuestion({
        id: question.id,
        answer: answer,
        authedUser
      })
    );
  };

  render() {
    const { question } = this.props;

    if (question == null) {
      return <p>This Question doesn't exist</p>;
    }

    return (
      <Fragment>
        <div className="image">
          <img
            src={question.author.avatarURL}
            alt={`Avatar of ${question.author.name}`}
          />
        </div>

        <div className="content">
          <div className="header"> {question.author.name} asked:</div>
          <div className="meta">
            <span> Would you rather </span>
          </div>
          <br />
          <div className="middle aligned content">
            {question.optionOne.text}
          </div>
          <div className="extra">...OR...</div>
          <div className="middle aligned content">
            {question.optionTwo.text}
          </div>
          <br />
          <div className="bottom aligned">
            <Link to={`/questions/${question.id}`}>
              <button className="ui fluid large submit button teal">
                View Poll
              </button>
            </Link>
          </div>
        </div>
        <br />
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const answered =
    question.optionOne.votes.length + question.optionTwo.votes.length > 0
      ? true
      : false;
  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser, answered)
      : null
  };
}

export default withRouter(connect(mapStateToProps)(Question));
