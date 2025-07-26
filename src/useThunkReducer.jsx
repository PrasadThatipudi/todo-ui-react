import { useReducer } from "react";
import { createControlledDispatch } from "./reducer.jsx";

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const thunkDispatch = (action) => {
    if (typeof action === "function") {
      return action(thunkDispatch, state);
    }

    return dispatch(action);
  };

  return [state, createControlledDispatch(thunkDispatch)];
};

export { useThunkReducer };
