import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import logo from "../Images/logo.jpg";
import { useState } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { IconContext } from "react-icons";

const ErrorPage = () => {
  const navigate = useNavigate();
  const [isOnMouse, setIsOnMouse] = useState(false);
  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center bg-white">
      <Header isFixed={true} />
      <div className="errorPageWrapper d-flex flex-column align-items-center">
        <img className="rounded-5 img-thumbnail w-25" src={logo} />
        <p className="fs-1 bold">404Error!</p>
        <p>데이터베이스 연결에 실패했습니다..</p>
        <button
          className="btn btn-success w-25"
          onClick={(e) => {
            navigate("/");
          }}
          onMouseEnter={() => setIsOnMouse(true)}
          onMouseLeave={() => setIsOnMouse(false)}
        >
          {isOnMouse ? (
            <IconContext.Provider value={{ size: `1.2em`, className: "arrow" }}>
              <BsArrowReturnLeft />
            </IconContext.Provider>
          ) : (
            "돌아가기"
          )}
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
