import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
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

  render () {
    const {question} = this.props;
    console.log ('Question->render');
    console.log (question);

    if (question == null) {
      // TODO: this line go to 404 page
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
          <div className="extra">
            ...OR...
          </div>
          <div className="middle aligned content">
            {question.optionTwo.text}
          </div>
          <br />
          <div className="bottom aligned">
            <Link to={`/question/${question.id}`}>
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

export default withRouter (connect (mapStateToProps) (Question));
