import { useEffect, useState } from "react";
import Header from "../Components/Header";
import styles from "../Styles/OrderComplete.module.css";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import axios from "axios";

const OrderCompletePage = ({ isSuccess }) => {
  // 상태 관리
  const [user, setUser] = useState(null);

  // 유저의 주문 정보를 불러오는 API
  const getOrder = () => {};

  // 유저 정보를 불러오는 API
  const getUser = async () => {
    const userSession = sessionStorage.getItem("user");
    const userAccessToken = JSON.parse(userSession).accessToken;
    axios.defaults.headers.common["Authorization"] = `Bearer ${userAccessToken}`;

    const response = await axios.get("http://localhost:8080/users");

    setUser(response.data);
  };

  // 주문 정보 및 유저 정보 불러오기
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Header isFixed={true} />
      <div className={styles.bg}>
        <span className={styles.title}>{isSuccess === true ? "결제 성공" : "결제 실패"}</span>
        <div className={styles.completeWrapper}>
          <IoIosCheckmarkCircleOutline size={50} color="green" />
          <span className={`${styles.title2}`}>
            {isSuccess === true ? "결제 성공" : "결제 실패"}
          </span>
          <p>
            <span className="bold">{user.nickname}</span>님의 결제가 {isSuccess ? "성공" : "실패"}
            했습니다!
          </p>
          <p>
            <span>{}원 결제</span>
          </p>
          <p>{}상품을 구매했습니다.</p>
        </div>
        <div className={`${styles.btnWrapper}`}>
          <button className={"button-57"}>
            <span>확인</span>
            <span>홈으로</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCompletePage;
