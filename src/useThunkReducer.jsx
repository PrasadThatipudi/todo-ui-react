import { useReducer } from "react";
import { controlledDispatch } from "./reducer";

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const thunkDispatch = (action) => {
    if (typeof action === "function") {
      return action(thunkDispatch, state);
    }

    return dispatch(action);
  };

  return [state, controlledDispatch(thunkDispatch)];
};

export { useThunkReducer };
