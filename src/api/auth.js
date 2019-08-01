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

export async function getCurrentUser() {
  const response = await fetch(`http://localhost:5001/auth/getCurrentUser`, {
    headers: {"Content-Type": "application/json"},
    method: "GET",
    withCredentials: true
  });
  if (response === null) {
    console.log("No current user ERROR!!!");
    return "getCurrentUser error!";
  }
  console.log(response, "api");
  return response.json();
}

export async function signUpUser(email, password, name) {
    return await (await fetch(`http://localhost:5001/auth/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: email,
        password: password,
        name: name
      })
    })).json();
  }

  export async function allUsers() {
    return await (await fetch(`http://localhost:5001/auth/users`)).json();
  }