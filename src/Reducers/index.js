import { userReducer } from "./UserReduce";
import { routineReducer } from "./RoutineReduce";

import { combineReducers } from "redux";

const reducers = combineReducers({
    userData: userReducer,
    routineData: routineReducer,
});

export default reducers;