import React, {Component} from 'react';
import {connect} from 'react-redux';

import {handleAnswerQuestion} from '../actions/questions';

class QuestionPage extends Component {
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

  renderDiv2 () {
    return (
      <div className="ui progress" data-percent="19">
        <div className="bar" style={{transition: '300ms', width: '19%'}}>
          <div className="progress">19%</div>
        </div>
      </div>
    );
  }

  renderDiv (optionVoteCount, totalCount) {
    const percentageValue = (optionVoteCount * 100 / totalCount).toFixed (1);
    //const stylePercentageValue = `transition: '300ms', width: '19%'`;

    const stylePercentageValue = `transition: all 300ms ease 0s; width: 19%;`;

    console.log ('percentageValue:', percentageValue);
    console.log ('stylePercentageValue:', stylePercentageValue);

    return (
      <div className="ui progress" data-percent={percentageValue}>
        <div className="bar" style={{stylePercentageValue}}>
          <div className="progress">{percentageValue}%</div>
        </div>
      </div>
    );

    //const percentageValue = (optionVoteCount * 100 / totalCount).toFixed (1);
    //const stylePercentageValue = `width: '${percentageValue}%'`;

    return (
      <div>
        <h1>{optionVoteCount}</h1>
        <h2>{totalCount}</h2>
        <h3>percentageValue</h3>

        <div className="ui progress" data-percent={percentageValue}>
          <div className="bar" style={{stylePercentageValue}}>
            <div className="progress">{percentageValue}%</div>
          </div>
        </div>
      </div>
    );
  }

  renderQuestion () {
    const {authedUser, question, questionUser} = this.props;
    const userAnswered =
      question.optionOne.votes.includes (authedUser) ||
      question.optionTwo.votes.includes (authedUser);

    console.log ('userAnswered:', userAnswered);
    if (userAnswered) {
      return (
        <div className="ui grid internally celled">
          <div className="row">
            <div className="four wide floated column">
              <div className="header">{questionUser.name} asked:</div>
            </div>
            <div className="eight wide floated column">
              Results:
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

            <div className="eight wide floated column">
              <div className="ui segment">
                <h3 className="ui header">{question.optionOne.text}</h3>
                <p>
                  {question.optionOne.votes.length} out of{' '}
                  {question.optionOne.votes.length +
                    question.optionTwo.votes.length}
                  {' '}
                  votes{' '}
                </p>

                {this.renderDiv (
                  question.optionOne.votes.length,
                  question.optionOne.votes.length +
                    question.optionTwo.votes.length
                )}

                {this.renderDiv2 ()}

                <span>
                  {question.optionOne.votes.includes (authedUser) &&
                    <div className="ui teal ribbon label">
                      <i className="star icon" /> Your Vote
                    </div>}
                </span>
              </div>

              <div className="ui segment">

                <h3 className="ui header">{question.optionTwo.text}</h3>

                <span>
                  {question.optionTwo.votes.includes (authedUser) &&
                    <div className="ui teal ribbon label">
                      <i className="star icon" /> Your Vote
                    </div>}
                </span>

                <p>
                  {question.optionTwo.votes.length} out of{' '}
                  {question.optionOne.votes.length +
                    question.optionTwo.votes.length}
                  {' '}
                  votes{' '}
                </p>

                <div />

              </div>

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
                onClick={e => this.handleAnswer (e, 'optionOne')}
              >
                Vote OptionOne
              </button>
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
        </div>
      );
    }
  }

  render () {
    console.log ('QuestionPage->render');
    console.log (this.props);
    const {question} = this.props;

    if (question == null) {
      // TODO: this line go to 404 page
      return <p>This Question doesn't exist</p>;
    }
    return <div>{this.renderQuestion ()}</div>;
  }
}

function mapStateToProps ({authedUser, questions, users}, props) {
  const {id} = props.match.params;
  const question = questions[id];
  const questionUser = users[question.author];
  return {
    authedUser,
    question,
    questionUser,
  };
}

export default connect (mapStateToProps) (QuestionPage);
