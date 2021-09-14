import { createStore } from "redux";

// initial state
const initialState = {
  accumulated_exercise_day: 0,
  continued_exercise_day: 0,
  email: "",
  exercise_goal_number: 0,
  exercise_success_number: 0,
  id: 0,
  profile_message: "",
  tier: "",
  username: "",
};

// types
const DEFINE = "DEFINE";
const DELETE = "DELETE";

// actions
const defineUser = (user) => {
  return {
    type: DEFINE,
    user,
  };
};

const deleteUser = () => {
  return {
    type: DELETE,
  };
};

export const actionCreators = {
  defineUser,
  deleteUser,
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DEFINE:
      return action.user;
    case DELETE:
      return {};
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
