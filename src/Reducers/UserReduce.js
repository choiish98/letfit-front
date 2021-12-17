import * as types from '../Actions/actionTypes';

// initial state
const initialState = {
  id: 0,
  username: "",
  email: "",
  tier: "",
  profile_message: "",
  accumulated_exercise_day: 0,
  continued_exercise_day: 0,
  exercise_success_number: 0,
  exercise_goal_number: 0,
  avatar: "",
  my_routines: [],
};

// reducers
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DEFINE:
      return action.user;
    case types.DELETE:
      return {};
    default:
      return state;
  }
};
