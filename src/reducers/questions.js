import {
  RECEIVE_QUESTIONS,
  ANSWER_QUESTION,
  ADD_QUESTION,
} from '../actions/questions';

export default function questions (state = {}, action) {
  //console.log ('reducers->questions');
  //console.log (state);
  //console.log (action);
  //console.log (Object.keys (action));
  //console.log (Object.values (action));
  //const answer = action.answer;
  //console.log (answer);
  //console.log ('action.type', action.type);
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      //console.log ('RECEIVE_QUESTIONS->working');
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      //console.log ('ADD_QUESTION->working');
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case ANSWER_QUESTION:
      //console.log ('ANSWER_QUESTION->working');
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.answer]: {
            ...state[action.id][action.answer],
            votes: state[action.id][action.answer].votes.concat ([
              action.authedUser,
            ]),
          },
        },
      };
    // return {
    //   ...state,
    //   [action.id]: {
    //     ...state[action.id],
    //     optionOne: action.answer === 'optionOne'
    //       ? state[action.id].optionOne.votes.concat ([action.authedUser])
    //       : state[action.id].optionOne,
    //     optionTwo: action.answer === 'optionTwo'
    //       ? state[action.id].optionTwo.votes.concat ([action.authedUser])
    //       : state[action.id].optionTwo,
    //   },
    // };
    default:
      return state;
  }
}
