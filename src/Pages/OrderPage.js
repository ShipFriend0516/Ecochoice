import Header from "../Components/Header";
import styles from "../Styles/OrderPage.module.css";
import { useState, useEffect, useRef } from "react";
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import tossLogo from "../Images/Toss_Logo_Secondary_Gray.png";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";

const OrderPage = () => {
  const clientKey = process.env.REACT_APP_TOSSPAYMENTS_CLIENT_KEY;
  const apiKey = process.env.REACT_APP_TOSSPAYMENTS_SECRET_KEY;

  const paymentWidgetRef = useRef(null);

  const [paymentWay, setPaymentWay] = useState(0);

  // 상품 상태
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  let totalPrice = 0;
  const deliveryFee = 2000;
  let salePrice = 0;

  // 배송지 및 결제 정보
  const [userPayInfo, setUserPayInfo] = useState([]); // 유저 정보
  const [deliveryInfo, setDeliveryInfo] = useState([]); // 배송정보

  const [userName, setUserName] = useState(""); //
  const [userPhoneFirst, setUserPhoneFirst] = useState("010");
  const [userPhoneSecond, setUserPhoneSecond] = useState("");
  const [userPhoneThird, setUserPhoneThird] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryAddress1, setDeliveryAddress1] = useState("");
  const [deliveryAddress2, setDeliveryAddress2] = useState("");
  const [deliveryZip, setDeliveryZip] = useState(0);
  const [deliveryRequest, setDeliveryRequest] = useState("");

  const [error, setError] = useState(null);

  // 주문 상태
  const [orderId, setOrderId] = useState(null);

  // 주문을 만드는 함수
  const createOrder = async () => {
    try {
      const user = sessionStorage.getItem("user");

      if (user) {
        const userToken = JSON.parse(user).accessToken;
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      }

      const response = await axios.post("http://localhost:8080/orders", {
        cartItemIds: cart.map((cartItem) => cartItem.cartId),
      });

      console.log(response);
      return response.data.orderId;
    } catch (error) {
      console.error("CreateOrder Fail", error);
    }
  };

  // 주문 취소 API
  const cancleOrder = async () => {
    const response = await axios.delete(`http://localhost:8080/orders/${orderId}`);
    console.log(response);
  };

  const deleteCart = async () => {
    try {
      const response = await axios.post("http://localhost:8080/carts/delete", {
        items: cart.map((cartItem) => {
          return {
            productId: cartItem.productId,
            productOptionId: cartItem.productOptionId,
            quantity: cartItem.quantity,
          };
        }),
      });
      console.log("결제완료되어 상품이 장바구니에서 제거됨!", response);
    } catch (error) {
      console.error(error);
    }
  };

  // 주문 완료 API
  const completeOrder = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(`http://localhost:8080/orders/${data.orderId}/complete`, {
        recipientName: deliveryName,
        address: deliveryAddress1,
        detailedAddress: deliveryAddress2,
        zipCode: deliveryZip,
        phoneNumber: userPhoneFirst + userPhoneSecond + userPhoneThird,
        requestNote: deliveryRequest,
      });
      await deleteCart();
      navigate(
        `/success?paymentKey=${data.paymentKey}&orderId=${data.orderId}&amount=${data.amount}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 로딩
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 로그인 여부
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // 상품 정보 조회 API
  const getCartItems = async () => {
    const user = sessionStorage.getItem("user");

    if (user) {
      const userToken = JSON.parse(user).accessToken;
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

      const response = await axios.get("http://localhost:8080/carts");
      const userCartList = await response.data.items;
      // URL에서 매개변수 추출
      const queryParams = new URLSearchParams(window.location.search);
      const checkedItemsString = queryParams.get("checkedItems");
      if (checkedItemsString) {
        // 쉼표로 구분된 문자열을 다시 배열로 변환
        const checkedItemsArray = checkedItemsString.split(",");
        console.log(checkedItemsArray);
        const selectedCartList = userCartList.filter((cartItem) =>
          checkedItemsArray.includes(cartItem.productId.toString())
        );

        setCart(selectedCartList);
        return selectedCartList;
      }

      setCart(userCartList);

      return userCartList;
    } else {
      console.log("User not found");
      return null;
    }
  };

  const getCartItemsDetail = async () => {
    const cartItems = await getCartItems();
    // 상품 정보 디테일을 담을 빈 배열 선언
    const cartItemsDetails = [];
    if (cart) {
      try {
        for (const cartItem of cartItems) {
          const productID = cartItem.productId; // await 제거
          const productDetail = await axios.get(
            `http://localhost:8080/products/${productID}/details`
          );
          cartItemsDetails.push(productDetail.data);
        }
        setProducts(cartItemsDetails);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const infoValidate = () => {
    if (!userName) {
      setError("이름은 필수 항목입니다.");
      return false;
    }
    if (!(userPhoneFirst && userPhoneSecond && userPhoneThird)) {
      setError("휴대폰번호가 잘못된 입력입니다.");
      return false;
    }
    if (!userEmail) {
      setError("이메일은 필수 항목입니다.");
      return false;
    }
    if (!deliveryName) {
      setError("받는 분 이름은 필수입니다.");
      return false;
    }
    if (!(deliveryAddress1 && deliveryAddress2)) {
      setError("배송지 주소를 다시 한번 확인해주세요");
      return false;
    }
    if (!deliveryZip) {
      setError("우편번호는 필수입니다.");
      return false;
    }
    return true;
  };

  // 로그인 여부 확인
  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        navigate("/");
      }
    }
  }, [loading, isLoggedIn]);

  // 상품의 정보를 읽어오는 요청
  useEffect(() => {
    getCartItemsDetail();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:8080/users");
      const customerKey = CryptoJS.SHA256(response.data.userId).toString().slice(0, 40);
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      const payPrice = totalPrice + deliveryFee;
      paymentWidget.renderPaymentMethods("#payment-widget", payPrice);
      paymentWidgetRef.current = paymentWidget;
    })();
  }, [loading]);

  const payBtnClick = async () => {
    setError(null);

    const newOrderId = await createOrder();
    setOrderId(newOrderId);
    if (newOrderId && infoValidate()) {
      try {
        const paymentWidget = paymentWidgetRef.current;
        setUserPayInfo({
          userName,
          userEmail,
          userPhone: userPhoneFirst + userPhoneSecond + userPhoneThird,
        });

        setDeliveryInfo({
          deliveryName,
          deliveryZip,
          deliveryAddress: `${deliveryAddress1} ${deliveryAddress2}`,
          deliveryRequest,
        });

        await paymentWidget
          ?.requestPayment({
            orderId: newOrderId,
            orderName:
              products.length >= 2
                ? products[0].title + " 외 " + products.length
                : products[0].title,
            customerName: userName,
            customerEmail: userEmail,
            // successUrl: `${window.location.origin}/success`,
            // failUrl: `${window.location.origin}/fail`,
          })
          .then(async (data) => {
            await completeOrder(data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
        cancleOrder();
      }
    } else {
      cancleOrder();
    }
  };

  // 상품 가격과 상품 선택
  const findKeyByValue = (arr, value) => {
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].productOptionId === value) {
        return index;
      }
    }
    return -1; // 찾지 못한 경우
  };

  return (
    <div>
      <Header isFixed={true} />
      <div className={`${styles.bg}`}>
        {loading ? (
          <div className="w-100 p-5 d-flex justify-content-center">
            <div className="spinner-grow text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className={`d-block bold text-center ${styles.titleBox}`}>
              <span className={`${styles.title}`}>주문서 작성</span>
            </div>
            <div className={`bg-white ${styles.bill}`}>
              <p className="bold fs-5 mb-2">주문 상품 목록({cart.length})</p>
              <div className={`${styles.itemGrid}`}>
                <div className={`${styles.gridheader} bold`}>
                  <span>상품 정보</span>
                  <span>옵션</span>
                  <span>가격</span>
                  <span>수량</span>
                  <span>총 금액</span>
                </div>
                {products.map((product, index) => {
                  const optionId = parseInt(cart[index].productOptionId);
                  const optionIndex = parseInt(findKeyByValue(product.options, optionId));
                  const price = product.options[optionIndex].price;
                  const quantity = parseInt(cart[index].quantity);
                  totalPrice += price * quantity;
                  return (
                    <div className={styles.productRow} key={product.productId}>
                      <span className="d-flex flex-row justify-content-between">
                        <img
                          onClick={() => {
                            navigate(`/products/${product.productId}`);
                          }}
                          src={product.thumbnailImageUrl}
                          alt={product.title + "이미지"}
                        ></img>
                        <span
                          onClick={() => {
                            navigate(`/products/${product.productId}`);
                          }}
                          className="flex-grow-1"
                        >
                          {product.title}
                        </span>
                      </span>
                      <span>{product.options[optionIndex].title}</span>
                      <span>{price.toLocaleString()}원</span>
                      <span>{cart[index].quantity}</span>
                      <span>{(price * parseInt(cart[index].quantity)).toLocaleString()}원</span>
                    </div>
                  );
                })}
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
                            <input
                              onChange={(e) => setUserName(e.target.value)}
                              className="form-control"
                              type="text"
                            />
                          </td>
                        </tr>
                        <tr className={`${styles.phone}`}>
                          <th scope="row">휴대폰번호</th>
                          <td>
                            <div className="row">
                              <div className="col">
                                <select
                                  defaultValue="010"
                                  onChange={(e) => setUserPhoneFirst(e.target.value)}
                                  className="required form-select"
                                >
                                  <option value="010">010</option>
                                  <option value="011">011</option>
                                  <option value="016">016</option>
                                  <option value="017">017</option>
                                  <option value="019">019</option>
                                </select>{" "}
                              </div>
                              -{" "}
                              <div className="col">
                                <input
                                  onChange={(e) => setUserPhoneSecond(e.target.value)}
                                  className="form-control"
                                  maxLength={4}
                                  type="text"
                                />
                              </div>
                              -{" "}
                              <div className="col">
                                <input
                                  onChange={(e) => setUserPhoneThird(e.target.value)}
                                  className="form-control"
                                  maxLength={4}
                                  type="text"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className={`${styles.email}`}>
                          <th scope="row">이메일</th>
                          <td>
                            <input
                              onChange={(e) => setUserEmail(e.target.value)}
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
                            <input
                              onChange={(e) => setDeliveryName(e.target.value)}
                              className="form-control"
                              type="text"
                            />
                          </td>
                        </tr>
                        <tr className={`${styles.address}`}>
                          <th scope="row">주소</th>
                          <td>
                            <div className="row">
                              <div className="col">
                                <input
                                  onChange={(e) => setDeliveryZip(e.target.value)}
                                  className="form-control"
                                  type="text"
                                  placeholder="우편 번호"
                                />
                              </div>
                              <div className="col">
                                <button>우편번호 찾기</button>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <input
                                  onChange={(e) => setDeliveryAddress1(e.target.value)}
                                  className="form-control"
                                  type="text"
                                  placeholder="주소"
                                />
                              </div>
                              <div className="col">
                                <input
                                  onChange={(e) => setDeliveryAddress2(e.target.value)}
                                  className="form-control"
                                  type="text"
                                  placeholder="상세 주소"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className={`${styles.email}`}>
                          <th scope="row">배송 요청사항</th>
                          <td>
                            <input
                              onChange={(e) => setDeliveryRequest(e.target.value)}
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
                          <td>{totalPrice.toLocaleString()}원</td>
                        </tr>
                        <tr>
                          <td>배송비</td>
                          <td>{deliveryFee.toLocaleString()}원</td>
                        </tr>
                        <tr>
                          <td>할인혜택</td>
                          <td>- {salePrice.toLocaleString()}원</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="mt-3 d-flex flex-row justify-content-between align-items-center">
                      <p style={{ fontWeight: "bold" }}>총 결제금액</p>
                      <p style={{ fontWeight: "bold", color: "red" }}>
                        {(totalPrice + deliveryFee - salePrice).toLocaleString()}원
                      </p>
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
                  <span className={styles.errorMsg}>{error}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
