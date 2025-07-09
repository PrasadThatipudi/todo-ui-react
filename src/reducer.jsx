const addTodo = (state, action) => {
  return [
    ...state,
    {
      id: state.length,
      title: action.payload.title,
      tasks: [],
    },
  ];
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

const reducer = (state, action) => {
  const actions = {
    "ADD-TODO": addTodo,
    "ADD-TASK": addTask,
    "TOGGLE-TASK": toggleTask,
    "DELETE-TASK": deleteTask,
  };

  if (actions[action.type]) {
    return actions[action.type](state, action);
  }

  console.warn(`Unknown action type: ${action.type}`);
  return state;
};

export default reducer;
