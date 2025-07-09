async function handleFetch(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

const API = {
  async fetchTodos() {
    return handleFetch("/todos");
  },

  async addTodo(title) {
    return handleFetch("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
  },

  async addTask(todoId, description) {
    return handleFetch(`/todos/${todoId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
  },

  async toggleTask(todoId, taskId) {
    return handleFetch(`/todos/${todoId}/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
  },

  async deleteTask(todoId, taskId) {
    return handleFetch(`/todos/${todoId}/tasks/${taskId}`, {
      method: "DELETE",
    });
  },
};

export default API;
