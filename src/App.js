import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Components/LoginModal";
import MyPage from "./Pages/MyPage";
import ItemDetailPage from "./Pages/ItemDetailPage";
import CategoryPage from "./Pages/CategoryPage";
import ErrorPage from "./Pages/ErrorPage";
import SearchPage from "./Pages/SearchPage";
import ItemCartPage from "./Pages/ItemCartPage";
import { useState } from "react";
import Payments from "./Components/Payments";
import OrderPage from "./Pages/OrderPage";
import SellPage from "./Pages/SellPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  return (
    <Router>
      <Routes>
        <Route
          key={"/"}
          path={"/"}
          element={<HomePage onLoginSuccess={handleLoginSuccess} />}
        ></Route>
        <Route key={"/mypage"} path={"/mypage"} element={<MyPage />}></Route>
        <Route key={"/products/:id"} path={"/products/:id"} element={<ItemDetailPage />}></Route>
        <Route
          key={"/category/:categoryID"}
          path={"/category/:categoryID"}
          element={<CategoryPage />}
        ></Route>
        <Route key={"/error"} path={"/error"} element={<ErrorPage errorCode={404} />}></Route>
        <Route key={"/search"} path={"/search/:searchText"} element={<SearchPage />}></Route>
        <Route key={"/cart"} path={"/cart"} element={<ItemCartPage />}></Route>
        <Route key={"/order"} path={"/order"} element={<OrderPage />}></Route>
        <Route key={"/pay"} path={"/pay"} element={<Payments />}></Route>
        <Route key={"/sell"} path={"/sell"} element={<SellPage />}></Route>
        <Route key={"/not"} path={"*"} element={<ErrorPage errorCode={404} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
