import { addTask, addTodo, deleteTask, loadTodos, toggleTask } from "./actions";

const controlledDispatch = (dispatch) => (action) => {
  const actions = {
    "ADD-TODO": (payload) => dispatch(addTodo(payload)),
    "ADD-TASK": (payload) => dispatch(addTask(payload)),
    "TOGGLE-TASK": (payload) => dispatch(toggleTask(payload)),
    "DELETE-TASK": (payload) => dispatch(deleteTask(payload)),
    "LOAD-TODOS": () => dispatch(loadTodos()),
  };

  if (actions[action.type]) {
    actions[action.type](action.payload);
  }
};

const reducer = (_state, action) => {
  return action.payload.state;
};

export { reducer, controlledDispatch };
