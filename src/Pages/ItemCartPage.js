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
  const getProducts = async () => {
    user = dummyUser;
    const response = await axios.get(`http://localhost:3001/users`, {
      params: {
        UID: user.UID,
      },
    });
    const userCartList = await response.data[0].cartProductsID;
    console.log(userCartList);

    const cartProducts = await userCartList.map((productID) => {
      console.log(`http://localhost:3001/products/${productID}`);
      return axios.get(`http://localhost:3001/products/${productID}`);
    });
    console.log(cartProducts);
    setCart(cartProducts);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
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
        <div className={`${styles.ItemCart}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="ItemList">
              {/* {cart.map((product) => {
                return (
                  <ItemCard
                    key={product.id}
                    id={product.id}
                    img={product.imagePath}
                    name={product.name}
                    brand={product.brand}
                    price={product.price}
                  />
                );
              })} */}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemCartPage;
