// auth.js

async function authenticateUser(login_id, password) {
  const authenticationURL =
    "https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp";

  const credentials = {
    login_id,
    password
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  };

  try {
    const response = await fetch(authenticationURL, requestOptions);

    if (!response.ok) {
      throw new Error(`Authentication failed with status: ${response.status}`);
    }

    const data = await response.json();
    const bearerToken = data.token;

    return bearerToken;
  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
}

// Export the authenticateUser function
export { authenticateUser };
