import * as types from '../Actions/actionTypes';

// initial state
const initialState = [
  {
    id: 0,
    name: "",
    creator: {
      username: ""
    },
    followers: 0,
  },
];

// reducers
export const routineReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET:
      return action.routine;
    default:
      return state;
  }
};
