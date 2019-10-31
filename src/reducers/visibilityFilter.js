import { VisibilityFilters } from "../actions/questions";

const visibilityFilter = (state = VisibilityFilters.SHOW_UNANSWERED, action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;
