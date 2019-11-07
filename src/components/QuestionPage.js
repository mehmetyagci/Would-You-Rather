import React, { Component } from "react";
import { connect } from "react-redux";

import { handleAnswerQuestion } from "../actions/questions";

class QuestionPage extends Component {
  handleAnswer = (e, answer) => {
    e.preventDefault();

    const { dispatch, question, authedUser } = this.props;

    // console.log (`Question->handleAnswer1:this.props:`);
    // console.log (this.props);
    // console.log (Object.keys(this.props));
    // console.log (Object.values(this.props));
    // console.log (`Question->handleAnswer2:question:${question} autherUser:${authedUser}`);

    dispatch(
      handleAnswerQuestion({
        id: question.id,
        answer: answer,
        authedUser
      })
    );
  };

  renderQuestion() {
    const { authedUser, question, questionUser } = this.props;
    const userAnswered =
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser);

    console.log("userAnswered:", userAnswered);
    if (userAnswered) {
      return (
        <div>
          <div>
            <p>{authedUser} Answered this poll</p>
          </div>
          <div className="ui image medium">
            <img
              src={questionUser.avatarURL}
              alt={`Avatar of ${questionUser.name}`}
            />
          </div>
          <div className="content">
            <div className="header"> {questionUser.name} asked:</div>
            <div className="meta">
              <span> Would you rather </span>
            </div>
            <br/>
            <br/>

            <div className="description">
              <h2>{question.optionOne.text}</h2>
              <span>
                {question.optionOne.votes.length} out of{" "}
                {question.optionOne.votes.length +
                  question.optionTwo.votes.length}{" "}
                votes{" "}
              </span>
              {question.optionOne.votes.includes(authedUser) && (
                <div>You Voted Option One</div>
              )}
            </div>

            <hr/>

            <div className="description">
              <h2>{question.optionTwo.text}</h2>
              <span>
                {question.optionTwo.votes.length} out of{" "}
                {question.optionOne.votes.length +
                  question.optionTwo.votes.length}{" "}
                votes{" "}
              </span>
              {question.optionTwo.votes.includes(authedUser) && (
                <div>You Voted Option Two</div>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <p>{authedUser} Not Answered this poll</p>
          </div>
          <div className="ui image medium">
            <img
              src={questionUser.avatarURL}
              alt={`Avatar of ${questionUser.name}`}
            />
          </div>
          <div className="content">
            <div className="header"> {questionUser.name} asked:</div>
            <div className="meta">
              <span> Would you rather </span>
            </div>

            <div className="description">
              <p>...{question.optionOne.text}...</p>

              <button
                className="replying-to"
                onClick={e => this.handleAnswer(e, "optionOne")}
              >
                Vote OptionOne
              </button>
            </div>

            <div className="description">
              <p>...{question.optionTwo.text}...</p>

              <button
                className="replying-to"
                onClick={e => this.handleAnswer(e, "optionTwo")}
              >
                Vote OptionTwo
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    console.log("QuestionPage->render");
    console.log(this.props);
    const { question } = this.props;

    if (question == null) {
      // TODO: this line go to 404 page
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
