import { BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
import routes from "./routes";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Components/LoginModal";
import MyPage from "./Pages/MyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route key={"/"} path={"/"} element={<HomePage />}></Route>
        <Route key={"/login"} path={"/login"} element={<LoginPage />}></Route>
        <Route key={"/mypage"} path={"/mypage"} element={<MyPage />}></Route>
      </Routes>
      <></>
    </Router>
  );
}

export default App;
