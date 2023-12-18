import React from "react";
import Header from "../Components/Header";
import styles from "../Styles/MyPage.module.css";
import profileImg from "../Images/logo.jpg";
import CouponModal from "../Components/CouponModal";
import { Link, json } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../Components/ItemCard";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderBox from "../Components/OrderBox";

const MyPage = () => {
  const [modalHandle, setModalHandle] = React.useState(false);
  const [user, setUser] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  // 주문 정보 조회 부분
  const [orderLoading, setOrderLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);

  // 로그인 여부
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

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
      setUserLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // 마이페이지에서 로그아웃 될 경우
  useEffect(() => {
    if (!userLoading && !orderLoading) {
      if (!isLoggedIn) {
        navigate("/");
      }
    }
  }, [userLoading, orderLoading, isLoggedIn]);

  const getOrderList = async () => {
    try {
      const userdata = sessionStorage.getItem("user");
      if (userdata) {
        const userToken = JSON.parse(userdata).accessToken;
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      }

      const response = await axios.get("http://localhost:8080/orders");
      console.log(response);
      setOrderList(response.data);
      setOrderLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrder = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:8080/orders/${orderId}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <div>
      <Header isFixed={true} />
      <div className={`d-flex flex-column align-items-center h-100 ${styles.myPage}`}>
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
              <div className="text-white">등급: {user.rank}</div>
              <button
                className={`btn btn-light ${styles.coupon_b}`}
                onClick={() => {
                  navigate("/sell");
                }}
              >
                상품 판매하기
              </button>
            </div>
            <div className={styles.right_contents}>
              <div>현재 가진 쿠폰</div>
              <div className={`fs-1 ${styles.count_coupon}`}>0개</div>
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
          <div>
            <div className="fs-3 text-center mt-3">회원정보</div>
            <hr className={styles.top_hr} />
            <div className="ms-3 me-3">
              {userLoading ? (
                <div className="w-100 d-flex justfiy-content-center">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <table className={`table ${styles.tb}`}>
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
                          <p>{user.phoneNumber}</p>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <div>
                    <Link className="btn btn-light" to={`/user`}>
                      수정
                    </Link>
                  </div>
                </>
              )}
            </div>

            <hr />
            <div className={styles.orderList}>
              <div className="fs-3 text-center mt-3">주문 정보 조회</div>
              {orderLoading ? (
                <div className="w-100 d-flex justfiy-content-center">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  <span className="mb-3">
                    <span className="bold">{user.nickname}</span>님의 주문{" "}
                    <span className="bold">{orderList.list.length}</span>
                    개를 조회했습니다.
                  </span>
                  <div className="mt-3">
                    {orderList.list.map((orderItem) => (
                      <OrderBox orderItem={orderItem} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {modalHandle && <CouponModal closeModal={() => setModalHandle(false)} />}
    </div>
  );
};

export default MyPage;
