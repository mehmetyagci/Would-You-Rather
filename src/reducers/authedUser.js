import {SET_AUTHED_USER} from '../actions/authedUser';

export default function authedUser (state = null, action) {
  console.log ('authedUser->action.id:', action.id);
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;
    default:
      return state;
  }
}
