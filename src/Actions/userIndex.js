import * as types from './actionTypes';

// actions
export const defineUser = (user) => {
    return {
        type: types.DEFINE,
        user,
    };
};
  
export const deleteUser = () => {
    return {
      type: types.DELETE,
    };
};

// action creator
export const actionCreators = {
    defineUser,
    deleteUser,
};