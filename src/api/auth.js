export async function loginUser(email, password) {
  return await (await fetch(`http://localhost:5001/auth/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      username: email,
      password: password
    })
  })).json();
}

export async function logoutUser() {
  const response = await fetch(`http://localhost:5001/auth/logout`, {
    method: "POST",
    headers: { "Content-type": "application/json" }
  });
  if (response === null) {
    console.log("Cannot logout!");
    return "getCurrentUser error!";
  }
}
