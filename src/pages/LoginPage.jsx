import React, { useState } from "react";

const LoginPage = ({ setShowLoginPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();

    setError({
      email: "",
      password: "",
    });

    if (!email) {
      setError((error) => ({ ...error, email: "Email is required" }));
      return;
    }

    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError((error) => ({ ...error, email: "Invalid email format" }));
      return;
    }

    if (!password) {
      setError((error) => ({ ...error, password: "Password is required" }));
      return;
    }

    if (password.length < 6) {
      setError((error) => ({
        ...error,
        password: "Password must be at least 6 characters",
      }));
      return;
    }

    console.log("Login successful", { email, password });
  };

  return (
    <form
      className="w-80 bg-white p-6 rounded shadow-md"
      onSubmit={handleLogin}
    >
      <input
        type="text"
        placeholder="Email"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error.email && <p className="text-red-500">{error.email}</p>}
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error.password && <p className="text-red-500">{error.password}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setShowLoginPage(false)}
        >
          Register
        </span>
      </p>
    </form>
  );
};

export default LoginPage;
