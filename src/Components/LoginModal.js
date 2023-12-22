import styles from "../Styles/LoginPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Store/authSlice";
import useToast from "../hooks/toast";
import logo from "../Images/logo.jpg";

const LoginModal = ({ loginOnClick, isOpen, errMsg = "" }) => {
  const dispatch = useDispatch();

  const [isRegistered, setIsRegistered] = useState(true);
  const [id, setID] = useState("");
  const [pw, setPW] = useState("");

  // 회원가입 상태
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pwCheck, setPWCheck] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [profileShow, setProfileShow] = useState(false);

  const [error, setError] = useState("");

  // 토스트
  const { addToast } = useToast();

  const canvasOnClick = () => {
    loginOnClick();
    setError("");
    setID("");
    setPW("");
    setPWCheck("");
    setName("");
    setPhone("");
    setProfileImg("");
    setProfileShow(false);
    setIsRegistered(true);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isRegistered) {
      try {
        let validateCode = LoginValidate();
        if (validateCode === true) {
          const response = await axios.post(`http://localhost:8080/auth/sign-in`, {
            email: id,
            password: pw,
          });

          const result = await response.data;
          if (result) {
            console.log("로그인 성공");
            // result => 객체

            const userJSON = JSON.stringify(result);
            console.log("userJSON", userJSON);

            dispatch(login(userJSON));
            addToast({ type: "success", text: "로그인 성공! 환영합니다." });
            console.log("유저 정보 기록");
            loginOnClick();
          } else {
            console.log("로그인 실패");
            setError("로그인에 실패했습니다.");
          }
        } else {
          console.log("유효성 검사 실패");
          setError(validateCode);
          console.log(validateCode);
        }
      } catch (e) {
        console.error("로그인 실패:", e);
        setError(105);
      }
    } else {
      try {
        let validateCode = RegisterValidate();
        if (validateCode === true) {
          console.log("유효성 검사 통과");
          // 회원가입 유효성 검사 통과시
          console.log("id", id, "pw", pw, "pwcheck", pwCheck);
          const response = await axios.post(`http://localhost:8080/auth/sign-up`, {
            email: id,
            password: pw,
            nickname: name,
            phoneNumber: phone,
            profileImageUrl: profileImg,
          });
          if (response) {
            console.log(id, "회원가입 성공!!");
          }
          console.log(response);
          addToast({ type: "success", text: "회원가입 성공, 환영합니다!" });
          canvasOnClick();
          loginOnClick();
        } else {
          console.log("유효성 검사 실패");
          setError(validateCode);
          console.log(validateCode);
        }
      } catch (err) {
        console.error("회원가입 실패:", e);
        addToast({ type: "danger", text: "회원가입 실패! 다시 시도해주세요" });
      }
    }
  };
  const LoginValidate = () => {
    // 로그인 유효성 검사 함수
    // 아이디 8글자 이상
    if (id.length < 8) {
      return 101;
    }

    return true;
  };

  const RegisterValidate = () => {
    // 회원가입 유효성 검사 함수
    // 아이디 8글자 이상
    if (name.length < 1) {
      return 103;
    }
    if (phone.length !== 11) {
      return 104;
    }
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

  useEffect(() => {
    setError(errMsg);
  }, []);

  const renderModal = () => {
    return (
      <>
        <div className={styles.loginPage}>
          <form
            className={`${styles.loginForm} ${!isRegistered ? styles.register : styles.login}`}
            onSubmit={onSubmit}
          >
            <div className="fs-2 text-center d-flex flex-column">
              {isRegistered ? "로그인" : "회원가입"}
              {errMsg === "" ? (
                <small>Eco Choice</small>
              ) : (
                <small className={styles.errorMsg}>{errMsg}</small>
              )}
              {isRegistered ? (
                <></>
              ) : (
                <div className={`${styles.profileImg}`}>
                  {profileShow ? (
                    <>
                      <div className="d-flex justify-content-between">
                        <input
                          onChange={(e) => {
                            setProfileImg(e.target.value);
                          }}
                          placeholder="프로필사진의 URL"
                          id="profileImg"
                          className={`form-control form-control-sm ${styles.profileImgInput}`}
                          type="url"
                        ></input>
                        <button
                          className={`btn btn-sm text-nowrap ${styles.profileShowBtn}`}
                          onClick={() => {
                            setProfileShow((prev) => !prev);
                          }}
                        >
                          미리보기
                        </button>
                      </div>
                    </>
                  ) : (
                    <img
                      srcSet={[profileImg, logo]}
                      alt="profileImg"
                      onClick={() => {
                        setProfileShow((prev) => !prev);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
            {!isRegistered && (
              <div>
                <label htmlFor="pw">이름</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  id="userName"
                  className={"form-control form-control-sm"}
                  type="text"
                ></input>
                {error === 103 ? (
                  <small className={styles.errorMsg}>이름은 필수입니다.</small>
                ) : null}
              </div>
            )}
            {!isRegistered && (
              <div>
                <label htmlFor="pw">휴대폰 번호</label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  id="userPhone"
                  className={"form-control form-control-sm"}
                  type="tel"
                ></input>
                {error === 104 ? (
                  <small className={styles.errorMsg}>휴대폰 번호는 (-)를 제외한 11자입니다.</small>
                ) : null}
              </div>
            )}
            <div className="">
              <label htmlFor="id">아이디</label>
              <input
                onChange={onChangeID}
                id="id"
                className={"form-control form-control-sm"}
                type="email"
              ></input>
              {error === 100 || error === 101 ? (
                <small className={styles.errorMsg}>아이디는 8글자 이상이어야합니다.</small>
              ) : null}
            </div>
            <div>
              <label htmlFor="pw">비밀번호</label>
              <input
                onChange={(e) => setPW(e.target.value)}
                id="pw"
                className={"form-control form-control-sm"}
                type="password"
              ></input>
            </div>
            {!isRegistered && (
              <div>
                <label htmlFor="pw">비밀번호 확인</label>
                <input
                  onChange={(e) => setPWCheck(e.target.value)}
                  id="pwCheck"
                  className={"form-control form-control-sm"}
                  type="password"
                ></input>
                {error === 100 || error === 102 ? (
                  <small className={styles.errorMsg}>비밀번호가 일치하지 않습니다.</small>
                ) : null}
              </div>
            )}
            {error === 105 && (
              <small className={`${styles.errorMsg}`}>
                로그인에 실패했습니다. 다시 시도해주세요.
              </small>
            )}
            <div className="d-flex justify-content-between gap-3">
              <input
                onClick={canvasOnClick}
                className={`btn btn-outline-danger btn-sm mt-3 flex-grow-1 ${styles.btn_outline_lightcoral}`}
                type="button"
                value={"취소"}
              />
              <input
                className={`btn btn-outline-success btn-sm mt-3 flex-grow-1 ${styles.btn_outline_lightgreen}`}
                type="submit"
                value={isRegistered ? "로그인" : "회원가입"}
              />
            </div>
            <span className="small">
              {!isRegistered ? "이미 회원이라면 로그인해주세요." : "아직 회원이 아니라면?"}
            </span>
            <button onClick={onRegisterClick} className={"btn btn-outline-dark btn-sm "}>
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

export default LoginModal;
