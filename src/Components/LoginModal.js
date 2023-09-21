import styles from "../Styles/LoginPage.module.css";
import { useState } from "react";
import axios from "axios";

const LoginPage = ({ loginOnClick, isOpen }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [id, setID] = useState("");
  const [pw, setPW] = useState("");

  const canvasOnClick = () => {
    loginOnClick();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.get(`http://localhost:3001/`);
    } catch (e) {
      console.error("로그인 실패:", e);
    }
  };

  const onRegisterClick = (e) => {
    e.preventDefault();
    setIsRegistered((prev) => !prev);
  };

  const onChangeID = (e) => {
    setID(e.target.value);
  };

  return (
    <>
      {isOpen && (
        <>
          <div className={styles.loginPage}>
            {isRegistered ? (
              <form className={styles.loginForm + " " + styles.register} onSubmit={onSubmit}>
                <div className="fs-2 text-center d-flex flex-column">
                  회원가입
                  <small>Eco Choice</small>
                </div>
                <div className="">
                  <label htmlFor="id">아이디</label>
                  <input
                    onChange={onChangeID}
                    id="id"
                    className={"form-control"}
                    type="email"
                  ></input>
                </div>
                <div>
                  <label htmlFor="pw">비밀번호</label>
                  <input id="pw" className={"form-control"} type="password"></input>
                </div>
                <div>
                  <label htmlFor="pw">비밀번호 확인</label>
                  <input id="pw" className={"form-control"} type="password"></input>
                </div>
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
                    value={"회원가입"}
                  />
                </div>
                <span>이미 회원이라면 로그인해주세요.</span>
                <button onClick={onRegisterClick} className="btn btn-outline-dark">
                  로그인
                </button>
              </form>
            ) : (
              <form className={styles.loginForm} onSubmit={onSubmit}>
                <div className="fs-2 text-center d-flex flex-column">
                  로그인
                  <small>Eco Choice</small>
                </div>
                <div className="">
                  <label htmlFor="id">아이디</label>
                  <input
                    onChange={(e) => setID(e.target.value)}
                    id="id"
                    className={"form-control"}
                    type="email"
                  ></input>
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
                    value={"로그인"}
                  />
                </div>
                <span>아직 회원이 아니라면?</span>
                <button onClick={onRegisterClick} className="btn btn-outline-dark">
                  회원가입
                </button>
              </form>
            )}
          </div>
          <div onClick={canvasOnClick} className={styles.canvas}></div>
        </>
      )}
    </>
  );
};

export default LoginPage;
