import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from './Question';
import {bindActionCreators} from 'redux';

import {VisibilityFilters, setVisibilityFilter} from '../actions/questions';

class Dashboard extends Component {
  handleSend = message => {
    console.log ('Dashboard->handleSend->message:', message);
    this.props.setVisibilityFilter (message);
  };

  render () {
    console.log ('Dashboard->render:this.props', this.props);
    console.log ('Dashboard->render:this.props.filter', this.props.filter);
    return (
      <div>

        <div className="ui divided list">

          <div
            className="ui right buttons"
            style={{display: 'flex'}}
          >
            <div
              className={
                'ui button teal ' +
                  (this.props.filter === VisibilityFilters.SHOW_UNANSWERED
                    ? 'active'
                    : '')
              }
              onClick={() =>
                this.props.setVisibilityFilter (
                  VisibilityFilters.SHOW_UNANSWERED
                )}
            >
              Unanswered
            </div>
            <div className="or" />
            <div
              className={
                'ui button teal ' +
                  (this.props.filter === VisibilityFilters.SHOW_ANSWERED
                    ? 'active'
                    : '')
              }
              onClick={() =>
                this.props.setVisibilityFilter (
                  VisibilityFilters.SHOW_ANSWERED
                )}
            >
              Answered
            </div>
          </div>

        </div>

        <div className="ui divided items">
          {Object.values (this.props.questions).map (question => (
            <div className="item" key={question.id}>
              <Question id={question.id} />
            </div>
          ))}
          <br />
        </div>
      </div>
    );
  }
}

const getVisibleQuestions = (questions, authedUser, filter) => {
  // console.log ('getVisibleTodos->questions:', questions);
  // console.log ('getVisibleTodos->authedUser:', authedUser);
  // console.log ('getVisibleTodos->filter:', filter);

  switch (filter) {
    case VisibilityFilters.SHOW_ANSWERED:
      var answeredQuestions = Object.values (questions).filter (function (q) {
        //console.log ('inner query1:', q);
        return (
          q.optionOne.votes.includes (authedUser) ||
          q.optionTwo.votes.includes (authedUser)
        );
      });
      //console.log ('answeredQuestions1:', answeredQuestions);
      //console.log ('answeredQuestions[0].timestamp:',answeredQuestions[0].timestamp);
      //return answeredQuestions;

      //answeredQuestions.sort((a, b) => b.last_nom.localeCompare(b.last_nom));

      var answeredQuestionsSorted = answeredQuestions.sort (
        (a, b) => b.timestamp - a.timestamp
      );
      //console.log ('answeredQuestionsSorted2:', answeredQuestionsSorted);
      return answeredQuestionsSorted;
    default:
      var unansweredQuestions = Object.values (questions).filter (function (q) {
        //console.log ('inner query2:', q);
        return !(q.optionOne.votes.includes (authedUser) ||
          q.optionTwo.votes.includes (authedUser));
      });
      //console.log ('unansweredQuestions1:', unansweredQuestions);
      var unansweredQuestionsSorted = unansweredQuestions.sort (
        (a, b) => b.timestamp - a.timestamp
      );
      return unansweredQuestionsSorted;
  }
};

const mapStateToProps = state => ({
  questions: getVisibleQuestions (
    state.questions,
    state.authedUser,
    state.visibilityFilter
  ),
  filter: state.visibilityFilter,
});

function mapDispatchToProps (dispatch) {
  return {
    setVisibilityFilter: bindActionCreators (setVisibilityFilter, dispatch),
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (Dashboard);
