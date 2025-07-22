import { API_BASE_URL, API_OPTIONS } from "../utils/constants";

export const login = async (credentials, { signal }) => {
  const endpoint = `${API_BASE_URL}/auth/login`;

  try {
    const response = await fetch(endpoint, {
      ...API_OPTIONS,
      method: "POST",
      body: JSON.stringify(credentials),
      signal: signal,
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const validateToken = async (token, { signal }) => {
  if (!token) {
    throw new Error("No token provided");
  }

  const endpoint = `${API_BASE_URL}/auth/validate`;

  try {
    const response = await fetch(endpoint, {
      ...API_OPTIONS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: signal,
    });

    if (!response.ok) {
      throw new Error("Invalid token");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Token validation failed:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
  return Promise.resolve();
};

export const getUser = async () => {
  try {
    // Assuming you have a way to get the current user's token
  } catch (error) {
    console.error("Failed to get user data:", error);
    throw error;
  }
};

export const AuthApi = {
  login,
  validateToken,
};
