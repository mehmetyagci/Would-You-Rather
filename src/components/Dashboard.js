import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from './Question';
import {bindActionCreators} from 'redux';

import {VisibilityFilters, setVisibilityFilter} from '../actions/questions';

class Dashboard extends Component {
  render () {
    return (
      <div>

        <div className="ui divided list">

          <div className="ui right buttons" style={{display: 'flex'}}>
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
  switch (filter) {
    case VisibilityFilters.SHOW_ANSWERED:
      var answeredQuestions = Object.values (questions).filter (function (q) {
        return (
          q.optionOne.votes.includes (authedUser) ||
          q.optionTwo.votes.includes (authedUser)
        );
      });
      var answeredQuestionsSorted = answeredQuestions.sort (
        (a, b) => b.timestamp - a.timestamp
      );
      return answeredQuestionsSorted;
    default:
      var unansweredQuestions = Object.values (questions).filter (function (q) {
        return !(q.optionOne.votes.includes (authedUser) ||
          q.optionTwo.votes.includes (authedUser));
      });
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
