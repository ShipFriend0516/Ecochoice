import { BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
import routes from "./routes";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Components/LoginModal";

function App() {
  return (
    <Router>
      <Routes>
        <Route key={"/"} path={"/"} element={<HomePage />}></Route>
        <Route key={"/login"} path={"/login"} element={<LoginPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
