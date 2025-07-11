import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const AuthPage = () => {
  const [showLoginPage, setShowLoginPage] = useState(true);

  return (
    <AuthContext.Provider value={{ showLoginPage, setShowLoginPage }}>
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <section className="all-movies">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
              <h1 className="text-2xl font-bold mb-4">
                {showLoginPage ? "Login" : "Register"}
              </h1>
              <Outlet />
            </div>
          </section>
        </div>
      </main>
    </AuthContext.Provider>
  );
};

export default AuthPage;
