import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false
  };

  handleOptionOneChange = e => {
    const optionOne = e.target.value;

    this.setState(() => ({
      optionOne
    }));

    console.log(this.state.optionOne);
  };

  handleOptionTwoChange = e => {
    const optionTwo = e.target.value;

    this.setState(() => ({
      optionTwo
    }));

    console.log(this.state.optionTwo);
  };

  handleSubmit = e => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;

    // todo: Add New Question to the Store

    console.log("New Question: ", optionOne + " - " + optionTwo);

    dispatch(handleAddQuestion(optionOne, optionTwo));

    this.setState(() => ({
      optionOne: "",
      optionTwo: "",
      toHome: true
    }));
  };

  render() {
    const { optionOne, optionTwo, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h3>New Question</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            value={optionOne}
            placeholder="Option One"
            onChange={this.handleOptionOneChange}
          />
          <br />
          <input
            value={optionTwo}
            placeholder="Option Two"
            onChange={this.handleOptionTwoChange}
          />
          <br />
          <button disabled={optionOne === "" || optionTwo === ""}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewQuestion);
