import logoWide from "../Images/logo-wide.jpg";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="footer-block">
          <div>
            <span className="bold">Delivery</span>
            <p>교환 및 반품 주소지:</p>
            <p>천안시</p>
          </div>
          <div>
            <span className="bold">Customer Center</span>
            <p>빠르고 친절한 상담으로 안내드리겠습니다.</p>
          </div>
        </div>
        <div className="footer-block">
          <div>
            <span className="bold">Notice</span>
            <p>-2023년 추석연휴 배송지연 공지</p>
            <p>-2024년 추석연휴 배송지연 공지</p>
            <p>-2025년 추석연휴 배송지연 공지</p>
          </div>
          <div>
            <span className="bold">About EcoChoice</span>
            <p>우리는 아주 좋은 물건들을 판매합니다.</p>
            <p>환경을 생각하는 마음으로 운영하겠습니다.</p>
            <p>에코 초이스를 선택해주셔서 감사합니다.</p>
          </div>
          <div>
            <p className="copyright">Copyright (c) EcoChoice. All Rights Reserved.</p>
          </div>
        </div>
        <div className="footer-block">
          <div>
            <span className="bold">ONLY EcoChoice</span>
            <p>◎ 다양한 배송시스템 - 오늘출발,오늘도착,새벽도착</p>
            <p>◎ 스마트한 사이트 - 스마트서치,스마트렌즈</p>
            <p>◎ 2천평규모의 물류서비스 - 스팀케어부터 클린커버까지</p>
          </div>
          <div>
            <img
              src={logoWide}
              alt="logoWide"
              style={{ width: 58 + "%", borderRadius: `${20}px` }}
            />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="bottomwrap">
          <div>
            <ul className="bold">
              <li>이용안내 </li>
              <li>이용약관 </li>
              <li
                onClick={() => {
                  navigate("/notice");
                }}
              >
                개인정보처리방침{" "}
              </li>
              <li>파트너쉽 </li>
              <li>멤버쉽 </li>
              <li>리크루트 </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
