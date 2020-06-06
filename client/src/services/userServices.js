export const authenticateUser = (email, password) => {
  return fetch("/api/v1/users/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("User authentication failed");
      return res.json();
    })
    .catch((err) => {
      console.log(`User authentication error: ${err}`);
      return null;
    });
};

export const checkIfAuthenticated = () => {
  return fetch("/api/v1/users/loggedin")
    .then((res) => {
      if (!res.ok) throw new Error("User authentication failed");
      return res.json();
    })
    .catch((err) => {
      console.log(`User authentication error: ${err}`);
      return null;
    });
};
