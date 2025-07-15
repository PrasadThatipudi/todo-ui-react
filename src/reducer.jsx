import {
  addTask,
  addTodo,
  deleteTask,
  loadTodos,
  toggleTask,
} from "./actions.jsx";

const createControlledDispatch = (thunkDispatch) => (action) => {
  const actions = {
    "ADD-TODO": (payload) => thunkDispatch(addTodo(payload)),
    "ADD-TASK": (payload) => thunkDispatch(addTask(payload)),
    "TOGGLE-TASK": (payload) => thunkDispatch(toggleTask(payload)),
    "DELETE-TASK": (payload) => thunkDispatch(deleteTask(payload)),
    "LOAD-TODOS": () => thunkDispatch(loadTodos()),
  };

  if (actions[action.type]) {
    actions[action.type](action.payload);
  }
};

const reducer = (_state, action) => {
  return action.payload.state;
};

export { reducer, createControlledDispatch };
