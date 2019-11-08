export const RECEIVE_USERS = "RECEIVE_USERS";

export function receiveUsers(users) {
  console.log("actions->users->receiveUsers");
  return {
    type: RECEIVE_USERS,
    users
  };
}
