import { useEffect, useState } from "react";
import Header from "../Components/Header";
import styles from "../Styles/OrderComplete.module.css";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/toast";

const OrderCompletePage = ({ isSuccess }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  // 상태 관리
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderInfo, setOrderInfo] = useState(null);
  // 유저의 주문 정보를 불러오는 API
  const getOrder = async () => {
    const currentUrl = window.location.href;
    console.log(currentUrl);

    const url = new URL(currentUrl);
    const searchParams = new URLSearchParams(url.search);

    if (!searchParams.get("orderId")) {
      // alert("잘못된 접근입니다!!");
      navigate("/");
      addToast({
        type: "danger",
        text: "잘못된 접근입니다.",
      });
      return;
    }

    setOrderInfo({
      orderId: searchParams.get("orderId"),
      paymentKey: searchParams.get("paymentKey"),
      amount: parseFloat(searchParams.get("amount")), // 혹은 parseInt 사용
    });
  };

  // const completeOrder = async () => {
  //   const response = await axios.post(`http://localhost:8080/orders/${orderId}/complete`);
  //   console.log(response);
  // };

  // 유저 정보를 불러오는 API
  const getUser = async () => {
    const userSession = sessionStorage.getItem("user");
    const userAccessToken = JSON.parse(userSession).accessToken;
    axios.defaults.headers.common["Authorization"] = `Bearer ${userAccessToken}`;

    const response = await axios.get("http://localhost:8080/users");

    setUser(response.data);
    setLoading(false);
  };

  // 주문 정보 및 유저 정보 불러오기
  useEffect(() => {
    getUser();
    getOrder();
  }, []);

  return (
    <div>
      <Header isFixed={true} />
      <div className={styles.bg}>
        <span className={styles.title}></span>
        {loading ? (
          <></>
        ) : (
          <>
            <div className={styles.completeWrapper}>
              <IoIosCheckmarkCircleOutline size={50} color="green" />
              <span className={`${styles.title2}`}>
                {isSuccess === true ? "결제 성공" : "결제 실패"}
              </span>
              <p>
                <span className="bold">{user.nickname}</span>님의 결제가{" "}
                {isSuccess ? "성공" : "실패"}
                했습니다!
              </p>
              {isSuccess && (
                <>
                  <p className={`rounded text-white px-3 py-1 ${styles.orderId}`}>
                    주문 번호 : {orderInfo.orderId}
                  </p>
                  <p>
                    <span>{orderInfo.amount.toLocaleString()}원 결제</span>
                  </p>
                  <p>{}상품을 구매했습니다.</p>
                  <p className={` ${styles.thank}`}>이용해주셔서 감사합니다.</p>
                </>
              )}
            </div>
            <div className={`${styles.btnWrapper}`}>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className={"button-57"}
              >
                <span>확인</span>
                <span>홈으로</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCompletePage;
