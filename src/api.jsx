async function handleFetch(url, options) {
  const response = await fetch(url, options);
  const resultJSON = await response.json();
  console.log(resultJSON);

  if (!response.ok) {
    throw new Error(resultJSON.message);
  }

  return resultJSON;
}

const API = {
  placeholder: "todo-api",

  async login(username, password) {
    return await handleFetch(`/${this.placeholder}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  },

  async signup(username, password) {
    return await handleFetch(`/${this.placeholder}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  },
  async fetchTodos() {
    return await handleFetch(`/${this.placeholder}/todos`);
  },

  async addTodo(title) {
    return await handleFetch(`/${this.placeholder}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
  },

  async addTask(todoId, description) {
    return await handleFetch(`/${this.placeholder}/todos/${todoId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
  },

  async toggleTask(todoId, taskId) {
    return await handleFetch(
      `/${this.placeholder}/todos/${todoId}/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    );
  },

  async editTodoTitle(todo_id, title) {
    return await handleFetch(`/${this.placeholder}/todos/${todo_id}/title`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
  },

  async deleteTask(todoId, taskId) {
    return await handleFetch(
      `/${this.placeholder}/todos/${todoId}/tasks/${taskId}`,
      {
        method: "DELETE",
      }
    );
  },
};

export default API;
