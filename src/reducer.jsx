import {
  addTask,
  addTodo,
  deleteTask,
  deleteTodo,
  loadTodos,
  toggleTask,
  editTodoTitle,
} from "./actions.jsx";

const createControlledDispatch = (thunkDispatch) => (action) => {
  const actions = {
    "ADD-TODO": addTodo,
    "ADD-TASK": addTask,
    "TOGGLE-TASK": toggleTask,
    "DELETE-TASK": deleteTask,
    "DELETE-TODO": deleteTodo,
    "LOAD-TODOS": loadTodos,
    "EDIT-TODO-TITLE": editTodoTitle,
  };

  if (actions[action.type]) {
    thunkDispatch(actions[action.type](action.payload));
  }
};

const reducer = (_state, action) => {
  return action.payload.state;
};

export { reducer, createControlledDispatch };
