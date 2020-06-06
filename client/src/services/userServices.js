const authenticateUser = (email, password) => {
  return fetch("/api/v1/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("signup failed");
      return res.json();
    })
    .catch((err) => {
      console.log(`Error creating user: ${err}`);
      return null;
    });
};
