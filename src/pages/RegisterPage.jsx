import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const RegisterPage = () => {
  const { setShowLoginPage } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();

    setError({
      email: "",
      password: "",
      confirmPassword: "",
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

    if (!confirmPassword) {
      setError((error) => ({
        ...error,
        confirmPassword: "Confirm Password is required",
      }));
      return;
    }

    if (password !== confirmPassword) {
      setError((error) => ({
        ...error,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    console.log("Registration successful", { email, password });
  };

  return (
    <form
      className="w-80 bg-white p-6 rounded shadow-md"
      onSubmit={handleRegister}
    >
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error.email && <p className="text-red-500">{error.email}</p>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      {error.password && <p className="text-red-500">{error.password}</p>}
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      {error.confirmPassword && (
        <p className="text-red-500">{error.confirmPassword}</p>
      )}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Register
      </button>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setShowLoginPage(true)}
        >
          Login
        </span>
      </p>
    </form>
  );
};

export default RegisterPage;
