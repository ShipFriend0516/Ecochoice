import styles from "../Styles/MyPage.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
const OrderBox = ({ orderItem }) => {
  return (
    <div className={`border mb-1 rounded pt-3 px-3 pb-1 d-flex flex-row ${styles.orderBox}`}>
      <div className={styles.orderLeft}>
        {orderItem.status === "CANCELLED" ? (
          <FaExclamationCircle size={1.5 + "em"} color="orange" />
        ) : (
          <FaCheckCircle size={1.5 + "em"} color="green" />
        )}
      </div>
      <div className={styles.orderRight} key={orderItem.id}>
        <p>주문 번호 : {orderItem.id}</p>
        {orderItem.status === "CANCELLED" ? (
          <></>
        ) : (
          <>
            <p>주문자 이름 : {orderItem.recipientName}</p>
            <p>
              주문 상품 : {orderItem.items[0].productName}
              {orderItem.items.length > 1 && " 외" + (orderItem.items.length - 1) + " 개"}
            </p>
            <p>주문 금액 : {orderItem.price.toLocaleString()}원</p>
            <p>배송지 : {orderItem.deliveryAddress}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderBox;
