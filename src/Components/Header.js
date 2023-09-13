import { useState, useEffect } from "react";
import logoTitle from "../Images/logoTitle.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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

  return (
    <nav className={`navbar ${isScrolled && "fixed"}`}>
      <div className="scrollSpy">
        <span className="bar"></span>
      </div>
      <span>EcoChoice</span>
      <ul>
        <li>BEST🌏</li>
        <li>NEW🌱</li>
        <li>MADE</li>
        <li>오늘의할인</li>
        <li>리뷰인증</li>
        <li>아우터</li>
        <li>니트</li>
        <li>티셔츠</li>
        <li>블라우스/셔츠</li>
        <li>스커트</li>
        <li>팬츠</li>
        <li>언더웨어</li>
      </ul>
    </nav>
  );
};

export default Header;
