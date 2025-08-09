import API from "./api.jsx";

const addTodo = (payload) => async (thunkDispatch) => {
  await API.addTodo(payload.title);

  const state = await API.fetchTodos();
  thunkDispatch({ payload: { state } });
};

const addTask = (payload) => async (thunkDispatch) => {
  const { todoId, description } = payload;
  await API.addTask(todoId, description);

  const state = await API.fetchTodos();
  thunkDispatch({ payload: { state } });
};

const toggleTask = (payload) => async (thunkDispatch) => {
  const { todoId, taskId } = payload;
  console.log("Toggling task:", todoId, taskId);
  await API.toggleTask(todoId, taskId);

  const state = await API.fetchTodos();
  thunkDispatch({ payload: { state } });
};

const editTodoTitle = (payload) => async (thunkDispatch) => {
  const { todo_id, title } = payload;
  await API.editTodoTitle(todo_id, title);

  const state = await API.fetchTodos();
  thunkDispatch({ payload: { state } });
};

const deleteTodo = (payload) => async (thunkDispatch) => {
  const { todoId } = payload;
  await API.deleteTodo(todoId);

  const state = await API.fetchTodos();
  thunkDispatch({ payload: { state } });
};

const deleteTask = (payload) => async (thunkDispatch) => {
  const { todoId, taskId } = payload;
  await API.deleteTask(todoId, taskId);

  const state = await API.fetchTodos();
  thunkDispatch({ payload: { state } });
};

const loadTodos = () => async (thunkDispatch) => {
  const state = await API.fetchTodos();
  console.log("Loading todos:", state);

  thunkDispatch({ payload: { state } });
};

export {
  loadTodos,
  addTodo,
  addTask,
  toggleTask,
  deleteTask,
  editTodoTitle,
  deleteTodo,
};
