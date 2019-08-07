export async function loginUser(email, password) {
  const response = await fetch(`auth/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      username: email,
      password: password
    })
  });
  if (response.statusText === "Unauthorized") {
    console.log("Can not login!");
    return "Email or password is incorrect";
  }
  return response.json();
}

export async function logoutUser() {
  const response = await fetch(`auth/logout`, {
    method: "POST",
    headers: { "Content-type": "application/json" }
  });
  if (response === null) {
    console.log("Cannot logout!");
    return "getCurrentUser error!";
  }
}

export async function getCurrentUser() {
  const response = await fetch(`auth/getCurrentUser`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    method: "GET"
  });
  if (response === null) {
    console.log("No current user ERROR!!!");
    return "getCurrentUser error!";
  }
  return response.json();
}

export async function signUpUser(email, password, name) {
  return await (await fetch(`auth/signup`, {
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
  return await (await fetch(`auth/users`)).json();
}
