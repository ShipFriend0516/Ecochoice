import { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import styles from "../Styles/ItemCartPage.module.css";
import ItemCard from "../Components/ItemCard";
import axios from "axios";

const ItemCartPage = ({ user }) => {
  // props로 유저를 받아와, 유저마다 다른 장바구니를 적용
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const getProductsID = async () => {
    user = dummyUser;
    const response = await axios.get(`http://localhost:3001/users`, {
      params: {
        UID: user.UID,
      },
    });
    const userCartList = await response.data[0].cartProductsID;
    return userCartList;
  };

  // 상품 정보를 조회하고 cart 스테이트에 추가하는 함수
  const fetchAndAddToCart = async () => {
    try {
      // 사용자의 장바구니 상품 ID 목록을 얻어옴
      const userCartList = await getProductsID();

      // 상품 정보를 담을 빈 배열
      const cartItems = [];

      // 각 상품 ID에 대해 정보 조회
      for (const productID of userCartList) {
        // 각 상품 정보를 조회하는 axios 요청을 생성
        const productResponse = await axios.get(`http://localhost:3001/products/${productID}`);

        // 조회한 상품 정보를 cartItems 배열에 추가
        cartItems.push(productResponse.data);
      }

      // cart 스테이트에 상품 정보를 추가
      setCart(cartItems);
      setLoading(false);
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
    cartProductsID: [1, 2, 3, 4, 5, 8],
  };

  return (
    <div className={`${styles.ItemCartPageWrapper}`}>
      <Header isFixed={true} />
      <div className={`${styles.ItemCartWrapper}`}>
        <div className={`${styles.ItemCartTitle}`}>장바구니</div>
        <div className={`${styles.ItemCartSub}`}>
          <p>
            {dummyUser.nickName}님의 장바구니에 <b>{dummyUser.cartProductsID.length}</b>개의 상품이
            존재합니다.
          </p>
        </div>
        <div className={`${styles.ItemCart}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="ItemList">
              {cart.map((cartItem) => {
                return (
                  <ItemCard
                    id={cartItem.id}
                    img={cartItem.imagePath}
                    price={cartItem.price}
                    name={cartItem.name}
                    brand={cartItem.brand}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemCartPage;
