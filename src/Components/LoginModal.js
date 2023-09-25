import styles from "../Styles/LoginPage.module.css";
import { useState } from "react";
import axios from "axios";

const LoginPage = ({ loginOnClick, isOpen }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [id, setID] = useState("");
  const [pw, setPW] = useState("");
  const [pwCheck, setPWCheck] = useState("");
  const [error, setError] = useState("");
  const canvasOnClick = () => {
    loginOnClick();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (isRegistered) {
      try {
        const response = axios.get(`http://localhost:3001/`);
      } catch (e) {
        console.error("로그인 실패:", e);
      }
    } else {
      try {
        let validateCode = RegisterValidate();
        if (validateCode === true) {
          console.log("유효성 검사 통과");
        } else {
          console.log("유효성 검사 실패");
          setError(validateCode);
          console.log(validateCode);
        }
      } catch (err) {
        console.error("회원가입 실패:", e);
      }
    }
  };

  const RegisterValidate = () => {
    // 회원가입 유효성 검사 함수
    // 비밀번호 규칙 4글자 이상, 아이디 4글자 이상
    if (id.length < 8 && pw !== pwCheck) {
      return 100;
    } else if (id.length < 8) {
      return 101;
    } else if (pw !== pwCheck) {
      return 102;
    }

    return true;
  };

  const onRegisterClick = (e) => {
    e.preventDefault();
    setIsRegistered((prev) => !prev);
    setError("");
  };

  const onChangeID = (e) => {
    setID(e.target.value);
  };

  const renderModal = () => {
    return (
      <>
        <div className={styles.loginPage}>
          <form className={styles.loginForm + " " + styles.register} onSubmit={onSubmit}>
            <div className="fs-2 text-center d-flex flex-column">
              {isRegistered ? "로그인" : "회원가입"}
              <small>Eco Choice</small>
            </div>
            <div className="">
              <label htmlFor="id">아이디</label>
              <input onChange={onChangeID} id="id" className={"form-control"} type="email"></input>
              {error === 100 || error === 101 ? (
                <small className={styles.errorMsg}>아이디는 8글자 이상이어야합니다.</small>
              ) : null}
            </div>
            <div>
              <label htmlFor="pw">비밀번호</label>
              <input
                onChange={(e) => setPW(e.target.value)}
                id="pw"
                className={"form-control"}
                type="password"
              ></input>
            </div>
            {!isRegistered && (
              <div>
                <label htmlFor="pw">비밀번호 확인</label>
                <input
                  onChange={(e) => setPWCheck(e.target.value)}
                  id="pwCheck"
                  className={"form-control"}
                  type="password"
                ></input>
                {error === 100 || error === 102 ? (
                  <small className={styles.errorMsg}>비밀번호가 일치하지 않습니다.</small>
                ) : null}
              </div>
            )}
            <div className="d-flex justify-content-between gap-3">
              <input
                onClick={loginOnClick}
                className="btn btn-danger mt-3 flex-grow-1"
                type="button"
                value={"취소"}
              />
              <input
                className="btn btn-success mt-3 flex-grow-1"
                type="submit"
                value={isRegistered ? "로그인" : "회원가입"}
              />
            </div>
            <span>
              {!isRegistered ? "이미 회원이라면 로그인해주세요." : "아직 회원이 아니라면?"}
            </span>
            <button onClick={onRegisterClick} className="btn btn-outline-dark">
              {!isRegistered ? "로그인" : "회원가입"}
            </button>
          </form>
        </div>
        <div onClick={canvasOnClick} className={styles.canvas}></div>
      </>
    );
  };

  return <>{isOpen && renderModal()}</>;
};

export default LoginPage;
