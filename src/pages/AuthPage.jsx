import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const AuthPage = () => {
  const [showLoginPage, setShowLoginPage] = useState(true);
  return showLoginPage ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <LoginPage showLoginPage={setShowLoginPage} />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <RegisterPage showLoginPage={setShowLoginPage} />
    </div>
  );
};

export default AuthPage;
