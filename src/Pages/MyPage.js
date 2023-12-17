import React from "react";
import Header from "../Components/Header";
import styles from "../Styles/MyPage.module.css";
import profileImg from "../Images/logo.jpg";
import CouponModal from "../Components/CouponModal";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MyPage = () => {
  const [modalHandle, setModalHandle] = React.useState(false);
  const [user, setUser] = useState("");

  const getUser = async () => {
    try {
      const userdata = sessionStorage.getItem("user");

      if (userdata) {
        const userToken = JSON.parse(userdata).accessToken;
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      }
      const response = await axios.get("http://localhost:8080/users");
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Header isFixed={true} />
      <div
        className={`d-flex flex-column justify-content-center align-items-center h-100 ${styles.myPage}`}
      >
        <div className={styles.mytop}>
          <div className={styles.top_info}>
            <div className={styles.left_contents}>
              <div className={styles.profile}>
                <div className={styles.profile_pic}>
                  <img srcSet={[user.profileImageUrl, profileImg]} alt="profileImg"></img>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{user.nickname}님</div>
              </div>
              <div className="rank"></div>
            </div>
            <div className={styles.center_contents}>
              <div>등급 {user.rank}</div>
              <div>주문정보조회</div>
            </div>
            <div className={styles.right_contents}>
              <div>현재 가진 쿠폰</div>
              <div className={`fs-1 ${styles.count_coupon}`}>1개</div>
              <button
                className={`btn btn-light ${styles.coupon_b}`}
                onClick={() => {
                  setModalHandle(true);
                }}
              >
                쿠폰 등록하기
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles.myPageDetail}`}>
          <div className="fs-3 text-center mt-3">회원정보</div>
          <hr className={styles.top_hr} />
          <div className="ms-3 me-3">
            <div>
              <table className={styles.tb}>
                <tr>
                  <th>회원번호</th>
                  <td>
                    <p>{user.userId}</p>
                  </td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td>
                    <p>{user.nickname}</p>
                  </td>
                </tr>
                <tr>
                  <th>회원등급</th>
                  <td>
                    <p>{user.rank}</p>
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>
                    <p>{user.email}</p>
                  </td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>
                    <p> {user.phoneNumber}</p>
                  </td>
                </tr>
              </table>
            </div>

            <div>
              <Link className="btn btn-light" to={`/user`}>
                수정
              </Link>
            </div>
          </div>
        </div>
      </div>
      {modalHandle && <CouponModal closeModal={() => setModalHandle(false)} />}
    </div>
  );
};

export default MyPage;
