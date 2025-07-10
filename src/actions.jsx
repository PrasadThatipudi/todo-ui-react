import API from "./api";

const addTodo = (payload) => async (dispatch) => {
  await API.addTodo(payload.title);

  const state = await API.fetchTodos();
  dispatch({ payload: { state } });
};

const addTask = (state, action) => {
  return state.map((todo) => {
    if (todo.id === action.payload.todoId) {
      return {
        ...todo,
        tasks: [
          ...todo.tasks,
          {
            id: todo.tasks.length,
            description: action.payload.description,
            done: false,
          },
        ],
      };
    }
    return todo;
  });
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

const loadTodos = () => async (dispatch) => {
  const state = await API.fetchTodos();

  dispatch({ payload: { state } });
};

export { loadTodos, addTodo, addTask, toggleTask, deleteTask };
