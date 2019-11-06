import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShadowWrapper from 'react-shadow-wrapper';
import {Link, withRouter} from 'react-router-dom';

import {formatQuestion} from '../utils/helpers';
import {handleAnswerQuestion} from '../actions/questions';

class Question extends Component {
  handleAnswer = (e, answer) => {
    e.preventDefault ();

    const {dispatch, question, authedUser} = this.props;

    // console.log (`Question->handleAnswer1:this.props:`);
    // console.log (this.props);
    // console.log (Object.keys(this.props));
    // console.log (Object.values(this.props));
    // console.log (`Question->handleAnswer2:question:${question} autherUser:${authedUser}`);

    dispatch (
      handleAnswerQuestion ({
        id: question.id,
        answer: answer,
        authedUser,
      })
    );
  };

  toParent = (e, id) => {
    e.preventDefault ();
    this.props.history.push (`/question/${id}`);
    // todo: Redirect to parent Tweet.
    console.log (`Question->toParent:e:${e} id:${id}`);
  };

  render () {
    const {question} = this.props;
    console.log ('Question->render');
    console.log (question);

    if (question == null) {
      // TODO: this line go to 404 page
      return <p>This Question doesn't exist</p>;
    }

    return (
      <Link to={`/question/${question.id}`}>
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
              <p>...{question.optionOne.text}...</p>

              <button
                className="replying-to"
                onClick={e => this.handleAnswer (e, 'optionOne')}
              >
                Vote OptionOne
              </button>

            </div>

            <div className="extra content">
              <div className="ui submit button">View Poll</div>
            </div>

            <div className="description">
              <p>...{question.optionTwo.text}...</p>

              <button
                className="replying-to"
                onClick={e => this.handleAnswer (e, 'optionTwo')}
              >
                Vote OptionTwo
              </button>

            </div>

          </div>
        </ShadowWrapper>
      </Link>
    );
  }
}

function mapStateToProps ({authedUser, users, questions}, {id}) {
  const question = questions[id];
  console.log (`components->Question->mapStateToProps->question:${question}`);
  const answered = question.optionOne.votes.length +
    question.optionTwo.votes.length >
    0
    ? true
    : false;
  console.log (
    `optionOne.votes:${question.optionOne.votes.length} optionTwo.votes:${question.optionTwo.votes.length} answered:${answered}`
  );

  return {
    authedUser,
    question: question
      ? formatQuestion (question, users[question.author], authedUser, answered)
      : null,
  };
}

export default connect (mapStateToProps) (Question);
