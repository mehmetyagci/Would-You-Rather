import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from './Question';
import {bindActionCreators} from 'redux';

import {VisibilityFilters, setVisibilityFilter} from '../actions/questions';

class Dashboard extends Component {
  handleSend = message => {
    this.props.setVisibilityFilter (message);
  };

  render () {
    console.log ('Dashboard->render:this.props', this.props);
    return (
      <div>
        <div className="ui divided list">
          <div className="item">
            <div className="ui segment">
              <div className="ui right buttons">
                <div
                  className="ui button"
                  onClick={() =>
                    this.props.setVisibilityFilter (
                      VisibilityFilters.SHOW_UNANSWERED
                    )}
                >
                  Unanswered
                </div>
                <div className="or" />
                <div
                  className="ui button"
                  onClick={() =>
                    this.props.setVisibilityFilter (
                      VisibilityFilters.SHOW_ANSWERED
                    )}
                >
                  Answered
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ui items">
          {Object.values (this.props.questions).map (question => (
            <div className="item" key={question.id}>
              <Question id={question.id} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const getVisibleQuestions = (questions, authedUser, filter) => {
  console.log ('getVisibleTodos->questions:', questions);
  console.log ('getVisibleTodos->filter:', authedUser);
  console.log ('getVisibleTodos->filter:', filter);

  switch (filter) {
    case VisibilityFilters.SHOW_ANSWERED:
      var answeredQuestions = Object.values (questions).filter (function (q) {
        console.log ('inner query1:', q);
        return (
          q.optionOne.votes.includes (authedUser) ||
          q.optionTwo.votes.includes (authedUser)
        );
      });
      console.log ('answeredQuestions1:', answeredQuestions);
      console.log (
        'answeredQuestions[0].timestamp:',
        answeredQuestions[0].timestamp
      );
      //return answeredQuestions;

      //answeredQuestions.sort((a, b) => b.last_nom.localeCompare(b.last_nom));

      var answeredQuestionsSorted = answeredQuestions.sort (
        (a, b) => b.timestamp - a.timestamp
      );
      console.log ('answeredQuestionsSorted2:', answeredQuestionsSorted);
      return answeredQuestionsSorted;
    default:
      var unansweredQuestions = Object.values (questions).filter (function (q) {
        console.log ('inner query2:', q);
        return !(q.optionOne.votes.includes (authedUser) ||
          q.optionTwo.votes.includes (authedUser));
      });
      console.log ('unansweredQuestions1:', unansweredQuestions);
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
});

// function mapStateToProps({authedUser, questions}) {
//   return {
//     loading: questions === null,
//     authenticated: authedUser !== null,
//     authedUser,
//   };
// }

// function mapStateToProps({authedUser, questions}) {
//   return {
//     loading: questions === null,
//     authenticated: authedUser !== null,
//     authedUser,
//   };
// }
function mapDispatchToProps (dispatch) {
  return {
    setVisibilityFilter: bindActionCreators (setVisibilityFilter, dispatch),
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (Dashboard);
