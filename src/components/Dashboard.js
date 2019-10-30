import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { answerFilter: "answered" };
  }

  render() {
    console.log("Dashboard->render");
    console.log(this.props);
    return (

      <div>

<div>
  Answer: {this.state.answerFilter}
</div>

        <div className="ui divided list">
          <div className="item">
            <div className="ui segment">
              <h4 className="ui left">Payment method</h4>
              <div className="ui right buttons">
                <div className="ui button">Unanswered</div>
                <div className="or"></div>
                <div className="ui button">Answered</div>
              </div>
            </div>
          </div>
        </div>

        <h1>Questions</h1>

        <div className="ui items">
          {this.props.questionIds.map(id => (
            <div className="item" key={id}>
              <Question id={id} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions }, ownProps) {
  console.log("Dashboard->mapStateToProps");
  console.log("questions:", questions);
  //console.log("this.state.answerFilter", this.state.answerFilter);
  const filteredQuestions =  questions.filter(question => question.OptionOne.votes.length > 0);
  console.log("filteredQuestions:", filteredQuestions);
  return {    
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    )
  };
}

export default connect(mapStateToProps)(Dashboard);
