const API_URL = "http://localhost:8000/api";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Failed to log in");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Rethrow for handling in component
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) throw new Error("Failed to register");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Rethrow for handling in component
  }
};

export const getTasks = async (token) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Rethrow for handling in component
  }
};

// More functions for create, update, and delete tasks...
