export async function getTasks() {
  return await (await fetch(`http://localhost:5000/task/alltasks`)).json();
}

export async function postTask(task) {
  return await ( await fetch(`http://localhost:5000/task/add`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(task)
  })).json();
}

export async function deleteTask(id) {
  return await (await fetch(`http://localhost:5000/task/delete`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id })
  })).json();
}
