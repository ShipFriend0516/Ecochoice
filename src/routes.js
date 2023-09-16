import HomePage from "./Pages/HomePage";
import LoginPage from "./Components/LoginModal";
const routes = [
  {
    element: <HomePage />,
    path: "/",
  },
  {
    element: <LoginPage />,
    path: "/login",
  },
  {
    element: <HomePage />,
    path: "*",
  },
];

export default routes;
