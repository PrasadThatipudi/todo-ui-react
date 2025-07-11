import API from "./api";

const addTodo = (payload) => async (thunkDispatch) => {
  await API.addTodo(payload.title);

  const state = await API.fetchTodos();
  thunkDispatch({ payload: { state } });
};

const addTask = (payload) => async (thunkDispatch) => {
  await API.addTask(payload.todoId, payload.description);

  const state = await API.fetchTodos();
  thunkDispatch({ payload: { state } });
};

const toggleTask = (state, action) => {
  return state.map((todo) => {
    if (todo.id === action.payload.todoId) {
      return {
        ...todo,
        tasks: todo.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, done: !task.done }
            : task
        ),
      };
    }
    return todo;
  });
};

const deleteTask = (state, action) => {
  return state.map((todo) => {
    if (todo.id === action.payload.todoId) {
      return {
        ...todo,
        tasks: todo.tasks.filter((task) => task.id !== action.payload.taskId),
      };
    }
    return todo;
  });
};

const loadTodos = () => async (thunkDispatch) => {
  const state = await API.fetchTodos();

  thunkDispatch({ payload: { state } });
};

export { loadTodos, addTodo, addTask, toggleTask, deleteTask };
