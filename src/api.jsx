async function handleFetch(url, options) {
  const response = await fetch(url, options);
  console.log(response);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

const API = {
  async fetchTodos() {
    return await handleFetch("/todo-api/todos");
  },

  async addTodo(title) {
    return await handleFetch("/todo-api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
  },

  async addTask(todoId, description) {
    return await handleFetch(`/todos/${todoId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
  },

  async toggleTask(todoId, taskId) {
    return await handleFetch(`/todos/${todoId}/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
  },

  async deleteTask(todoId, taskId) {
    return await handleFetch(`/todos/${todoId}/tasks/${taskId}`, {
      method: "DELETE",
    });
  },
};

export default API;
