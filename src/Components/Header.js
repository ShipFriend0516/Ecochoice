import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";

const Header = ({ isFixed }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const documentHeight = document.body.scrollHeight - window.innerHeight;

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const MoveToTop = () => {
    // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
    if (window.location.pathname !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loginOnClick = () => {
    setIsVisible((prev) => !prev);
  };

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
    navigate(`/search/${searchText}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
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
            ></input>
            <AiOutlineSearch onClick={onSubmit} />
          </li>
          <li>
            <Link to={"/mypage"}>마이페이지</Link>
          </li>
          <li>
            <Link to={"/cart"}>장바구니</Link>
          </li>
          <li id="login" onClick={loginOnClick}>
            로그인
          </li>
        </ul>
      </nav>
      <LoginModal loginOnClick={loginOnClick} isOpen={isVisible} />
    </>
  );
};

export default Header;
