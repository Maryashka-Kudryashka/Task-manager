export async function getTasks(email) {
  return await (await fetch(`/task/${email}`)).json();
}

export async function postTask(task) {
  return await (await fetch(`/task/add`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(task)
  })).json();
}

export async function deleteTask(id) {
  return await (await fetch(`/task/delete`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id })
  })).json();
}
