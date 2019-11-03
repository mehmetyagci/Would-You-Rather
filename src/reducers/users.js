import {RECEIVE_USERS} from '../actions/users';
import {ANSWER_QUESTION} from '../actions/questions';

export default function users (state = {}, action) {
  console.log ('reducers->users->');
  console.log (action);
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.id]: action.answer,
          },
        },
      };
    default:
      return state;
  }
}
