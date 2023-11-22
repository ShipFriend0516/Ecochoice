import { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import styles from "../Styles/ItemCartPage.module.css";
import ItemCard from "../Components/ItemCard";
import axios from "axios";
import { useNavigate } from "react-router";

const ItemCartPage = () => {
  // props로 유저를 받아와, 유저마다 다른 장바구니를 적용
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const getProductsID = async () => {
    const user = sessionStorage.getItem("user");

    if (user) {
      const userToken = await JSON.parse(user).accessToken;
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

      const response = await axios.get("http://localhost:8080/carts");

      const userCartList = await response.data.items;
      return userCartList;
    } else {
      console.log("User not found");
      return null;
    }
  };

  // 상품 정보를 조회하고 cart 스테이트에 추가하는 함수
  const fetchAndAddToCart = async () => {
    try {
      // 사용자의 장바구니 상품 ID 목록을 얻어옴
      console.log("장바구니를 불러옵니다..");
      const userCartList = await getProductsID();
      console.log(userCartList[0]);
      // 상품 정보를 담을 빈 배열
      const cartItems = [];

      // 각 상품 ID에 대해 정보 조회
      for (const product of userCartList) {
        // 각 상품 정보를 조회하는 axios 요청을 생성
        const productResponse = await axios.get(
          `http://localhost:3001/products/${product.productId}`
        );

        // 조회한 상품 정보를 cartItems 배열에 추가
        cartItems.push(productResponse.data);
      }

      // cart 스테이트에 상품 정보를 추가
      setCart(cartItems);
      setLoading(false);

      const initialCheckedItems = userCartList.reduce((acc, id) => {
        acc[id] = false; // 각 아이디를 키로 가지고 초기값을 false로 설정
        return acc;
      }, {});
      setCheckedItems(initialCheckedItems);
    } catch (error) {
      console.error("상품 정보 조회 오류:", error);
    }
  };

  // fetchAndAddToCart 함수를 호출하여 상품 정보를 조회하고 cart 스테이트에 추가

  useEffect(() => {
    fetchAndAddToCart();
  }, []);

  let dummyUser = {
    UID: 1,
    id: "orbita@example.com",
    pw: "1234",
    nickName: "오르비타",
    membership: "Bronze",
    profileImage: "https://i.gifer.com/5K4w.gif",
    cartProductsID: [1, 2, 3, 4, 7, 8],
  };

  const countCheckedItems = () => {
    const checkedItemValues = Object.values(checkedItems);
    const checkedCount = checkedItemValues.filter((value) => value).length;
    return checkedCount;
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };

  const calCheckedPrices = () => {
    const checkedItemValues = Object.values(checkedItems);
    let totalPrice = 0;

    cart.map((cartItem, index) => {
      if (checkedItemValues[index]) totalPrice += cartItem.price;
    });
    return totalPrice;
  };

  const calTotalPrices = () => {
    let totalPrice = 0;
    cart.map((cartItem) => (totalPrice += cartItem.price));

    return totalPrice;
  };

  const handleAllCheckboxChange = () => {
    // 현재 전체 선택 상태의 반대 값을 설정합니다.
    setIsAllChecked((prevIsAllChecked) => !prevIsAllChecked);

    // 모든 상품의 체크 상태를 전체 선택 상태로 설정합니다.
    const newCheckedItems = {};

    // cart 배열의 각 상품에 대해 isCheckedItems의 키를 만들고 값을 전체 선택 상태로 설정합니다.
    cart.forEach((cartItem) => {
      newCheckedItems[cartItem.id] = !isAllChecked;
    });

    setCheckedItems(newCheckedItems);
  };

  return (
    <div className={`${styles.ItemCartPageWrapper}`}>
      <Header isFixed={true} />
      <div className={`${styles.ItemCartWrapper}`}>
        <div className={`${styles.ItemCartTitle}`}>장바구니</div>
        <div className={`${styles.ItemCartSub}`}>
          <p>
            {countCheckedItems()}개 상품 선택됨
            <button
              onClick={handleAllCheckboxChange}
              className="btn btn-outline-success btn-sm ms-2"
            >
              {isAllChecked ? "전체 해제" : "전체 선택"}
            </button>
          </p>
          <p>
            {dummyUser.nickName}님의 장바구니에 <b>{dummyUser.cartProductsID.length}</b>개의 상품이
            존재합니다.
          </p>
        </div>
        <div className={`${styles.ItemCart}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div className="ItemList2 px-5">
                {cart.map((cartItem) => {
                  return (
                    <ItemCard
                      key={cartItem.id}
                      id={cartItem.id}
                      img={cartItem.imagePath}
                      price={cartItem.price}
                      name={cartItem.name}
                      brand={cartItem.brand}
                      cardStyle={1}
                      onCheckChange={handleCheckboxChange}
                      checked={checkedItems[cartItem.id]}
                    />
                  );
                })}
              </div>
              <div className={styles.pricesWrapper}>
                선택 상품 가격 : {calCheckedPrices().toLocaleString()}원 / 총 가격 :{" "}
                {calTotalPrices().toLocaleString()}원
              </div>
              <div className={styles.buttonWrap}>
                <button className={`btn btn-outline-dark btn-lg`}>모두 취소하기</button>
                <button
                  onClick={() => {
                    navigate("/order");
                  }}
                  className={`btn btn-outline-dark btn-lg`}
                >
                  모두 결제하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemCartPage;
