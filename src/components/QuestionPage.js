import React, { Component } from "react";
import { connect } from "react-redux";

import { handleAnswerQuestion } from "../actions/questions";

class QuestionPage extends Component {
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

  renderDiv(optionVoteCount, totalCount) {
    const percentageValue = Math.round((optionVoteCount * 100) / totalCount);
    return (
      <div className="ui teal progress" data-percent={percentageValue}>
        <div className="bar" style={{ width: `${percentageValue}%` }}>
          <div className="progress">{percentageValue}%</div>
        </div>
      </div>
    );
  }

  renderQuestion() {
    const { authedUser, question, questionUser } = this.props;
    const userAnswered =
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser);

    if (userAnswered) {
      return (
        <div className="ui grid internally celled">
          <div className="row">
            <div className="four wide floated column">
              <div className="header">
                <h1 className="ui header">{questionUser.name} asked:</h1>
              </div>
            </div>
            <div className="twelve wide floated column">
              <h1 className="ui header">Results:</h1>
            </div>
          </div>

          <div className="row">
            <div className="four wide floated column">
              <img
                className="medium"
                src={questionUser.avatarURL}
                alt={`Avatar of ${questionUser.name}`}
              />
            </div>

            <div className="twelve wide floated column">
              <div className="ui segment">
                <h2 className="ui header">{question.optionOne.text}</h2>

                <span>
                  {question.optionOne.votes.includes(authedUser) && (
                    <div className="ui teal ribbon label">
                      <i className="star icon" /> Your Vote
                    </div>
                  )}
                </span>

                {this.renderDiv(
                  question.optionOne.votes.length,
                  question.optionOne.votes.length +
                    question.optionTwo.votes.length
                )}

                <p>
                  {question.optionOne.votes.length} out of{" "}
                  {question.optionOne.votes.length +
                    question.optionTwo.votes.length}{" "}
                  votes{" "}
                </p>
              </div>
              <div className="ui segment">
                <h2 className="ui header">{question.optionTwo.text}</h2>

                <span>
                  {question.optionTwo.votes.includes(authedUser) && (
                    <div className="ui teal ribbon label">
                      <i className="star icon" /> Your Vote
                    </div>
                  )}
                </span>

                {this.renderDiv(
                  question.optionTwo.votes.length,
                  question.optionOne.votes.length +
                    question.optionTwo.votes.length
                )}

                <p>
                  {question.optionTwo.votes.length} out of{" "}
                  {question.optionOne.votes.length +
                    question.optionTwo.votes.length}{" "}
                  votes{" "}
                </p>

                <div />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui grid internally celled">
          <div className="row">
            <div className="four wide floated column">
              <div className="header">
                <h1 className="ui header">{questionUser.name} asked:</h1>
              </div>
            </div>
            <div className="twelve wide floated column">
              <h1 className="ui header">Would You Rather...</h1>
            </div>
          </div>

          <div className="row">
            <div className="four wide floated column">
              <img
                className="medium"
                src={questionUser.avatarURL}
                alt={`Avatar of ${questionUser.name}`}
              />
            </div>

            <div className="twelve wide floated column">
              <div className="ui two column stackable center aligned grid segment">
                <div className="column">
                  <button
                    className="ui submit button teal"
                    onClick={e => this.handleAnswer(e, "optionOne")}
                  >
                    {question.optionOne.text}
                  </button>
                </div>
                <div className="ui vertical divider">or</div>
                <div className="column">
                  <button
                    className="ui submit button teal"
                    onClick={e => this.handleAnswer(e, "optionTwo")}
                  >
                    {question.optionTwo.text}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const { question } = this.props;

    if (question == null) {
      return <p>This Question doesn't exist</p>;
    }
    return <div>{this.renderQuestion()}</div>;
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const questionUser = users[question.author];
  return {
    authedUser,
    question,
    questionUser
  };
}

export default connect(mapStateToProps)(QuestionPage);
