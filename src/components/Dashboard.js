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

const getVisibleQuestions = (questions, filter) => {
  console.log ('getVisibleTodos->questions:', questions);
  console.log ('getVisibleTodos->filter:', filter);

  switch (filter) {
    case VisibilityFilters.SHOW_ANSWERED:
      return Object.values (questions).filter (function (q) {
        console.log ('inner query:', q);
        return q.optionOne.votes.length + q.optionTwo.votes.length > 0;
      });
    default:
      return Object.values (questions).filter (function (q) {
        console.log ('inner query:', q);
        return q.optionOne.votes.length + q.optionTwo.votes.length === 0;
      });
  }
};

const mapStateToProps = state => ({
  questions: getVisibleQuestions (state.questions, state.visibilityFilter),
});

function mapDispatchToProps (dispatch) {
  return {
    setVisibilityFilter: bindActionCreators (setVisibilityFilter, dispatch),
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (Dashboard);
