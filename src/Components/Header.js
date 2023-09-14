import { useState, useEffect } from "react";
import logoTitle from "../Images/logoTitle.png";
import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const documentHeight = document.body.scrollHeight - window.innerHeight;

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
    <nav className={`navbar ${isScrolled && "fixed"}`}>
      <div className="scrollSpy">
        <span className="bar" style={{ width: `${percent(scrollY, documentHeight)}%` }}></span>
      </div>
      <span className="cursor-pointer">EcoChoice</span>
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
        <li>마이페이지</li>
        <li>장바구니</li>
        <li>로그인</li>
      </ul>
    </nav>
  );
};

export default Header;
