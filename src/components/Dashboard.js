import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { object } from "prop-types";
import { bindActionCreators } from 'redux';

import { VisibilityFilters, setVisibilityFilter } from "../actions/questions";

class Dashboard extends Component {
  handleSend = message => {
    this.props.setVisibilityFilter(message);
  };

  render() {
    console.log("Dashboard->render:this.props", this.props);
    return (
      <div>
        <div className="ui divided list">
          <div className="item">
            <div className="ui segment">
              <div className="ui right buttons">
                <div
                  className="ui button"
                  onClick={() => this.props.setVisibilityFilter(VisibilityFilters.SHOW_UNANSWERED)}
                >
                  Unanswered
                </div>
                <div className="or"></div>
                <div
                  className="ui button"
                  onClick={() => this.props.setVisibilityFilter(VisibilityFilters.SHOW_ANSWERED)}
                >
                  Answered
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1>Questions</h1>

        <div className="ui items">
          {console.log(
            "this.props.questions1:",
            Object.entries(this.props.questions)
          )}
          {console.log("this.props.questions2:", typeof this.props.questions)}
          {console.log("this.props.questions3:", this.props.questions)}
          {console.log(
            "this.props.questions4:",
            this.props.questions["6ni6ok3ym7mf1p33lnez"]
          )}
          {console.log(
            "this.props.questions5:",
            Object.values(this.props.questions)
          )}

          {Object.values(this.props.questions).map(question => (
            <div className="item">
              <Question id={question.id} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const getVisibleTodos = (questions, filter) => {
  console.log("getVisibleTodos->questions:", questions);
  console.log("getVisibleTodos->filter:", filter);

  switch (filter) {
    case VisibilityFilters.SHOW_ANSWERED:
      return Object.values(questions).filter(function(q) {
        console.log("inner query:", q);
        return q.optionOne.votes.length + q.optionTwo.votes.length > 0;
      });
    default:
      return Object.values(questions).filter(function(q) {
        console.log("inner query:", q);
        return q.optionOne.votes.length + q.optionTwo.votes.length === 0;
      });
  }
};

const mapStateToProps = state => ({
  questions: getVisibleTodos(state.questions, state.visibilityFilter)
});

function mapDispatchToProps(dispatch) {
  return {
    setVisibilityFilter:bindActionCreators(setVisibilityFilter, dispatch)
  };
}

// const mapDispatchToProps = dispatch => {
//   return {
//     setVisibilityFilter: () => dispatch(setVisibilityFilter({visibilityFilter: VisibilityFilters.SHOW_UNANSWERED}))
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   sendVisibilityUnanswered: () => dispatch(setVisibilityFilter(VisibilityFilters.SHOW_UNANSWERED)),
// })

// const mapDispatchToProps = dispatch => {
//   return {
//     setVisibilityFilter: filter => dispatch(setVisibilityFilter(filter))
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   decrement: () => dispatch(setVisibilityFilter(VisibilityFilters.SHOW_UNANSWERED)),
// });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
