import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/movies",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/movies/:id",
    element: <MovieDetailPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
        errorElement: <NotFoundPage />,
      },
      // ...other routes
    ],
    errorElement: <NotFoundPage />,
  },
  // ...other routes
]);

export default router;
