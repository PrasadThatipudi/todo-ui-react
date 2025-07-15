async function handleFetch(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

const API = {
  placeholder: "todo-api",

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
      `/${this.placeholder}/todos/${todoId}/tasks/${taskId}/status`,
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
