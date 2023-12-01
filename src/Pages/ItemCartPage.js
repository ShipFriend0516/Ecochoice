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
  const [products, setProducts] = useState([]);
  const [optionIdArray, setOptionIdArray] = useState([]);
  const [optionIdIndexArray, setOptionIdIndexArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // 상품 정보 조회 API
  const getCartItems = async () => {
    const user = sessionStorage.getItem("user");

    if (user) {
      const userToken = JSON.parse(user).accessToken;
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

      const response = await axios.get("http://localhost:8080/carts");
      const userCartList = response.data.items;

      setCart(userCartList);

      setOptionIdArray(userCartList.map((cartItem) => cartItem.productOptionId));
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
  };

  useEffect(() => {
    getCartItems();
    getCartItemsDetail();
  }, []);

  const findKeyByValue = (arr, value) => {
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].productOptionId === value) {
        return index;
      }
    }
    return -1; // 찾지 못한 경우
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
      if (checkedItemValues[index]) {
        const optionId = cartItem.productOptionId;
        const optionIndex = products[index].options.findIndex(
          (option) => option.productOptionId === optionId
        );

        const price = products[index].options[optionIndex].price;

        totalPrice += price;
      }
    });
    return totalPrice;
  };

  const calTotalPrices = () => {
    let totalPrice = 0;

    totalPrice = products.reduce((acc, product, index) => {
      const optionId = parseInt(cart[index].productOptionId);
      const optionIndex = parseInt(findKeyByValue(product.options, optionId));
      return acc + product.options[optionIndex].price;
    }, 0);

    return totalPrice;
  };

  const handleAllCheckboxChange = () => {
    // 현재 전체 선택 상태의 반대 값을 설정합니다.
    setIsAllChecked((prevIsAllChecked) => !prevIsAllChecked);

    // 모든 상품의 체크 상태를 전체 선택 상태로 설정합니다.
    const newCheckedItems = {};

    // cart 배열의 각 상품에 대해 isCheckedItems의 키를 만들고 값을 전체 선택 상태로 설정합니다.
    cart.forEach((cartItem) => {
      newCheckedItems[cartItem.productId] = !isAllChecked;
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
            {""}님의 장바구니에 <b>{cart.length}</b>개의 상품이 존재합니다.
          </p>
        </div>
        <div className={`${styles.ItemCart}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div className="ItemList2 px-5">
                {products.length === 0 && (
                  <p
                    style={{
                      padding: `40px 0`,
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    [ 장바구니에 담은 상품이 없습니다. 상품을 담아보세요! ]
                  </p>
                )}
                {products.map((product, index) => {
                  const optionId = parseInt(cart[index].productOptionId);
                  const optionIndex = parseInt(findKeyByValue(product.options, optionId));
                  return (
                    <ItemCard
                      key={product.productId}
                      id={product.productId}
                      img={product.thumbnailImageUrl}
                      price={product.options[optionIndex].price}
                      name={product.title}
                      optionID={optionId}
                      // brand={products.brand}
                      quantity={cart[index].quantity}
                      cardStyle={1}
                      onCheckChange={handleCheckboxChange}
                      checked={checkedItems[product.productId]}
                      isUpdated={false}
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
