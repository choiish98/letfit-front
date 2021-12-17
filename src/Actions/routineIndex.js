import * as types from './actionTypes';

// actions
export const defineRoutine = (routine) => {
    return {
        type: types.GET,
        routine,
    };
};

// action creator
export const routineActionCreators = {
    defineRoutine,
};