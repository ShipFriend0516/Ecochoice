import { useState, useEffect } from "react";
import logoTitle from "../Images/logoTitle.png";
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

  return (
    <>
      <nav className={`navbar ${isScrolled && "fixed"} ${isFixed && "fixed"}`}>
        <div className="scrollSpy">
          <span className="bar" style={{ width: `${percent(scrollY, documentHeight)}%` }}></span>
        </div>
        <span className="cursor-pointer" onClick={MoveToTop}>
          EcoChoice
        </span>
        <ul>
          <li>BEST🌏</li>
          <li>NEW🌱</li>
          <li>오늘의할인</li>
          <li>의류 및 패션</li>
          <li>생활용품</li>
          <li>건강 및 뷰티</li>
          <li>식품</li>
          <li>재활용 제품</li>
          <li>에너지 절약용품</li>
          <li>캠핑용품</li>
          <li>사무용품</li>
          <li>장식</li>
          <li>
            <input type="search"></input>
            <AiOutlineSearch />
          </li>
          <li>
            <Link to={"/mypage"}>마이페이지</Link>
          </li>
          <li>장바구니</li>
          <li onClick={loginOnClick}>로그인</li>
        </ul>
      </nav>
      <LoginModal loginOnClick={loginOnClick} isOpen={isVisible} />
    </>
  );
};

export default Header;
