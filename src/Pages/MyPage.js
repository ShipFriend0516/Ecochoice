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

const MyPage = () => {
  const [modalHandle, setModalHandle] = React.useState(false);
  const [user, setUser] = useState("");

  // 주문 정보 조회 부분
  const [orderLoading, setOrderLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);

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

  useEffect(() => {
    if (!orderLoading) getOrder(orderList.list[0].id);
  }, [orderLoading]);

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
          <div>
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
            </div>

            <hr />
            <div className={styles.orderList}>
              <div className="fs-3 text-center mt-3">주문 정보 조회</div>
              {orderLoading ? (
                <div className="w-100 d-flex justfiy-content-center">
                  <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
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
                      <div
                        className={`border mb-1 rounded pt-3 px-3 pb-1 d-flex flex-row ${styles.orderBox}`}
                      >
                        <div className={styles.orderLeft}>
                          <FaCheckCircle size={1.2 + "em"} color="green" />
                        </div>
                        <div className={styles.orderRight} key={orderItem.id}>
                          <p>주문 번호 : {orderItem.id}</p>
                          <p>주문자 이름 : {orderItem.recipientName}</p>
                          <p>
                            주문 상품 : {orderItem.items[0].productName}
                            {orderItem.items.length > 1 &&
                              " 외" + (orderItem.items.length - 1) + " 개"}
                          </p>
                          <p>주문 금액 : {orderItem.price.toLocaleString()}원</p>
                        </div>
                      </div>
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
