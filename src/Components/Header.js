import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import logo from "../Images/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../Store/authSlice";
import useToast from "../hooks/toast";
import axios from "axios";

const Header = ({ isFixed, modalOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const documentHeight = document.body.scrollHeight - window.innerHeight;

  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  // 토스트
  const { addToast } = useToast();
  const navigate = useNavigate();

  const MoveToTop = () => {
    // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
    if (window.location.pathname !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loginOnClick = () => {
    setError("");
    setIsVisible((prev) => !prev);
  };

  const cartOnClick = () => {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      loginOnClick();
      setError("로그인이 필요한 서비스입니다.");
    }
  };

  const myPageOnClick = () => {
    if (isLoggedIn) {
      navigate("/mypage");
    } else {
      loginOnClick();
      setError("로그인이 필요한 서비스입니다.");
    }
  };

  useEffect(() => {
    if (modalOpen) {
      loginOnClick();
    }
  }, []);

  const getUser = async () => {
    try {
      const userdata = sessionStorage.getItem("user");

      if (userdata) {
        const userToken = JSON.parse(userdata).accessToken;
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      }
      const response = await axios.get("http://localhost:8080/users");
      console.log(response.data);
      setUserProfile(response.data);
      setUserLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const userLoad = async () => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      dispatch(login(userData));
      const userInfo = await JSON.parse(sessionStorage.getItem("user"));
      setUser(userInfo);
    }
  };

  const logOut = () => {
    dispatch(logout());
    addToast({
      type: "danger",
      text: "로그아웃되었습니다.",
    });
  };

  useEffect(() => {
    try {
      userLoad();
      getUser();
    } catch (e) {
      console.error("유저 정보가 없음", e);
    } finally {
      console.log("user access token", user, "로그인 여부", isLoggedIn);
    }
  }, [userLoading]);

  // ScrollSpy
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const percent = (n, tN) => {
    return ((n / tN) * 100).toFixed(2);
  };

  // 검색 기능
  const [searchText, setSearchText] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (searchValidate()) {
      navigate(`/search/${searchText}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  const searchValidate = () => {
    if (searchText === "") {
      return false;
    }
    return true;
  };

  return (
    <>
      <nav className={`navbar ${isScrolled && "fixed"} ${isFixed ? "fixed" : ""}`}>
        <div className="scrollSpy">
          <span className="bar" style={{ width: `${percent(scrollY, documentHeight)}%` }}></span>
        </div>
        <span className="cursor-pointer" onClick={MoveToTop}>
          EcoChoice
        </span>
        <ul>
          <li>
            <Link to={"/category/1"}>BEST🌏</Link>
          </li>
          <li>
            <Link to={"/category/2"}>NEW🌱</Link>
          </li>
          <li>
            <Link to={"/category/3"}>오늘의할인</Link>
          </li>
          <li>
            <Link to={"/category/4"}>의류 및 패션</Link>
          </li>
          <li>
            <Link to={"/category/5"}>생활용품</Link>
          </li>
          <li>
            <Link to={"/category/6"}>건강 및 뷰티</Link>
          </li>
          <li>
            <Link to={"/category/7"}>식품</Link>
          </li>
          <li>
            <Link to={"/category/8"}>재활용 제품</Link>
          </li>
          <li>
            <Link to={"/category/9"}>에너지 절약용품</Link>
          </li>
          <li>
            <Link to={"/category/10"}>캠핑용품</Link>
          </li>
          <li>
            <Link to={"/category/11"}>사무용품</Link>
          </li>
          <li>
            <Link to={"/category/12"}>장식</Link>
          </li>
          <li>
            <input
              type="search"
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ color: "white" }}
            ></input>
            <AiOutlineSearch onClick={onSubmit} />
          </li>
          <li>
            <div onClick={myPageOnClick} className="px-1">
              마이페이지
            </div>
          </li>
          <li>
            <div onClick={cartOnClick} className="px-1" to={"/cart"}>
              장바구니
            </div>
          </li>
          {isLoggedIn ? (
            <li onClick={logOut}>
              {!userLoading && (
                <img
                  className="profileImg"
                  srcSet={[userProfile.profileImageUrl, logo]}
                  alt="profile"
                />
              )}
            </li>
          ) : (
            <li id="login" onClick={loginOnClick}>
              로그인
            </li>
          )}
        </ul>
      </nav>
      <LoginModal
        loginOnClick={loginOnClick}
        isOpen={isVisible}
        errMsg={user ? null : error}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
};

export default Header;
