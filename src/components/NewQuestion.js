import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {handleAddQuestion} from '../actions/questions';

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  };

  handleOptionOneChange = e => {
    const optionOne = e.target.value;

    this.setState (() => ({
      optionOne,
    }));
  };

  handleOptionTwoChange = e => {
    const optionTwo = e.target.value;

    this.setState (() => ({
      optionTwo,
    }));
  };

  handleSubmit = e => {
    e.preventDefault ();

    const {optionOne, optionTwo} = this.state;
    const {dispatch} = this.props;

    dispatch (handleAddQuestion (optionOne, optionTwo));

    this.setState (() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true,
    }));
  };

  render () {
    const {optionOne, optionTwo, toHome} = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.handleSubmit} className="ui form">
        <h1 className="ui dividing header">Create New Question</h1>
        <h2 className="">Woud you rather... </h2>
        <div className="field">
          <label>Option One</label>
          <input
            value={optionOne}
            placeholder="Option One"
            onChange={this.handleOptionOneChange}
          />
        </div>
        <div className="field">
          <label>Option Two</label>
          <input
            value={optionTwo}
            placeholder="Option Two"
            onChange={this.handleOptionTwoChange}
          />
        </div>
        <div>
          <button
            className="ui button teal"
            disabled={optionOne === '' || optionTwo === ''}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default connect () (NewQuestion);
