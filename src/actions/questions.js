import {saveQuestionAnswer, saveQuestion} from '../utils/api';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';


function addQuestion (question,authedUser) {
  return {
    type: ADD_QUESTION,
    question,
    authedUser,
  };
}

export function handleAddQuestion (optionOne, optionTwo) {
  return (dispatch, getState) => {
    const {authedUser} = getState ();

    dispatch (showLoading ());

    return saveQuestion ({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    })
      .then (question => dispatch (addQuestion (question,authedUser)))
      .then (() => dispatch (hideLoading ()));
  };
}


/* Normal Action Creator */
function answerQuestion({id, authedUser, answer}) {
  return {
    type: ANSWER_QUESTION,
    id,
    authedUser,
    answer,
  };
}

export function handleAnswerQuestion (info) {
  console.log("handleAnswerQuestion", info);
  return dispatch => {
    dispatch (answerQuestion (info));

    return saveQuestionAnswer (info)
    .catch (e => {
      console.warn ('Error in handleAnswerQuestion:', e);
      //dispatch(saveQuestionAnswer(info))
      alert ('The was an error answering the question. Try again.');
    });
  };
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

export const VisibilityFilters = {
  SHOW_UNANSWERED: 'SHOW_UNANSWERED',
  SHOW_ANSWERED: 'SHOW_ANSWERED',
};
