import Header from "../Components/Header";
import styles from "../Styles/OrderPage.module.css";
import { useState, useEffect, useRef } from "react";
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import tossLogo from "../Images/Toss_Logo_Secondary_Gray.png";
import { useNavigate } from "react-router";

const OrderPage = () => {
  const clientKey = process.env.REACT_APP_TOSSPAYMENTS_CLIENT_KEY;
  const apiKey = process.env.REACT_APP_TOSSPAYMENTS_SECRET_KEY;

  const customerKey = "fdafiodjv231ksjf";
  const paymentWidgetRef = useRef(null);
  const price = 50_000;

  const [paymentWay, setPaymentWay] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      console.log(clientKey);
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      paymentWidget.renderPaymentMethods("#payment-widget", price);

      paymentWidgetRef.current = paymentWidget;
    })();
  }, []);

  const payBtnClick = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: "지구를 지켜요 후드티",
        customerName: "지구인",
        customerEmail: "orbita@gmail.com",
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header isFixed={true} />

      <div className={`${styles.bg}`}>
        <div className={`d-block bold text-center ${styles.titleBox}`}>
          <span className={`${styles.title}`}>주문서 작성</span>
        </div>

        <div className={`bg-white ${styles.bill}`}>
          <p className="bold fs-5 mb-2">주문 상품 목록()</p>
          <div className={`${styles.itemGrid}`}>
            <div className={`${styles.gridheader} bold`}>
              <span>상품 정보</span>
              <span>옵션</span>
              <span>가격</span>
              <span>수량</span>
              <span>총 금액</span>
            </div>
            <div>
              <span>지구를 지켜요 후드티</span>
              <span>free size</span>
              <span>{(50000).toLocaleString()}원</span>
              <span>1</span>
              <span>{(50000).toLocaleString()}원</span>
            </div>
          </div>
          <div className={`d-flex flex-row`}>
            <div className={`mt-3 flex-grow-3 ${styles.leftSide}`}>
              <div className={`${styles.section}`}>
                <p className="bold fs-5 mb-2">할인 혜택</p>
                <div>
                  쿠폰 : 0장
                  <button className="ms-3">쿠폰 선택</button>
                </div>
                <div>총 할인 혜택 : 0원</div>
              </div>
              <div className={`${styles.section}`}>
                <p className="bold fs-5 mb-2">주문자 정보</p>
                <table className={`${styles.tbl_order}`}>
                  <tbody>
                    <tr>
                      <th scope="row">이름</th>
                      <td>
                        <input className="form-control" type="text" />
                      </td>
                    </tr>
                    <tr className={`${styles.tel}`}>
                      <th scope="row">전화번호</th>
                      <td>
                        <div className="row">
                          <div className="col">
                            <input className="form-control" type="text" />
                          </div>
                          -{" "}
                          <div className="col">
                            <input className="form-control" type="text" />
                          </div>
                          -{" "}
                          <div className="col">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className={`${styles.phone}`}>
                      <th scope="row">휴대폰번호</th>
                      <td>
                        <div className="row">
                          <div className="col">
                            <select name="cp[]" defaultValue="010" className="required form-select">
                              <option value="010">010</option>
                              <option value="011">011</option>
                              <option value="016">016</option>
                              <option value="017">017</option>
                              <option value="019">019</option>
                            </select>{" "}
                          </div>
                          -{" "}
                          <div className="col">
                            <input className="form-control" type="text" />
                          </div>
                          -{" "}
                          <div className="col">
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className={`${styles.email}`}>
                      <th scope="row">이메일</th>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          data-require_msg="이메일주소를"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={`${styles.section}`}>
                <p className="bold fs-5 mb-2">배송지 정보</p>
                <table className={`${styles.tbl_order}`}>
                  <tbody>
                    <tr>
                      <th scope="row">받는 분 이름</th>
                      <td>
                        <input className="form-control" type="text" />
                      </td>
                    </tr>
                    <tr className={`${styles.address}`}>
                      <th scope="row">주소</th>
                      <td>
                        <div className="row">
                          <div className="col">
                            <input className="form-control" type="text" placeholder="우편 번호" />
                          </div>
                          <div className="col">
                            <button>우편번호 찾기</button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <input className="form-control" type="text" placeholder="주소" />
                          </div>
                          <div className="col">
                            <input className="form-control" type="text" placeholder="상세 주소" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className={`${styles.email}`}>
                      <th scope="row">배송 요청사항</th>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          data-require_msg="배송요청사항"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={`${styles.section}`}>
                <p className="bold fs-5 mb-2">결제 방법 선택</p>
                <div className={` ${styles.paymentWays}`}>
                  <button
                    onClick={() => {
                      setPaymentWay(0);
                    }}
                    className={`${styles.toss} ${paymentWay === 0 ? styles.tossChecked : ""}`}
                  ></button>
                  <button
                    onClick={() => {
                      setPaymentWay(1);
                    }}
                    className={paymentWay === 1 ? `${styles.checked}` : ""}
                  >
                    계좌이체
                  </button>
                </div>
              </div>
            </div>
            <div className={`flex-grow-2 ${styles.rightSide}`}>
              <div className={`${styles.box}`}>
                <p style={{ fontWeight: "bold" }}>결제정보</p>
                <table>
                  <tbody>
                    <tr>
                      <td>총 상품금액</td>
                      <td>{(50000).toLocaleString()}원</td>
                    </tr>
                    <tr>
                      <td>배송비</td>
                      <td>{(0).toLocaleString()}원</td>
                    </tr>
                    <tr>
                      <td>할인혜택</td>
                      <td>-{(0).toLocaleString()}원</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-3 d-flex flex-row justify-content-between align-items-center">
                  <p style={{ fontWeight: "bold" }}>총 결제금액</p>
                  <p style={{ fontWeight: "bold", color: "red" }}>{(50000).toLocaleString()}원</p>
                </div>
              </div>
              <button onClick={payBtnClick}>결제하기</button>
              <button
                onClick={() => {
                  navigate(-1);
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
