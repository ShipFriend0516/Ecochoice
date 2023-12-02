import Header from "../Components/Header";
import styles from "../Styles/Category.module.css";
import ItemCard from "../Components/ItemCard";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import useToast from "../hooks/toast";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryID } = useParams();
  const navigate = useNavigate();

  const { addToast } = useToast();

  const getProducts = async () => {
    try {
      if (categoryID === "2") {
        // NEW 카테고리
        const response = await axios.get(`http://localhost:3001/products/`);
        const json = await response.data;
        json.reverse();
        setProducts(json.slice(0, 20));
      } else {
        const response = await axios.get(`http://localhost:3001/products/`, {
          params: { categoryID: categoryID },
        });
        const json = await response.data;
        setProducts(json);
        console.log(json);
      }
    } catch (error) {
      console.error(error);
      console.error("카테고리별 제품 가져오기 실패");
    }
  };

  const getCategoryName = async () => {
    try {
      const user = sessionStorage.getItem("user");

      const userToken = await JSON.parse(user).accessToken;

      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      const response = await axios.get(`http://localhost:8080/categories`);
      const categoryList = response.data;
      const categoryIndex = categoryList.findIndex((data) => data.id === parseInt(categoryID));

      setCategoryName(categoryList[categoryIndex].title);
      setLoading(false);
    } catch (error) {
      console.error(error);
      console.error("카테고리 이름 불러오기 실패");
      addToast({
        type: "danger",
        text: "카테고리 이름 불러오기 실패",
      });
    }
  };

  useEffect(() => {
    getProducts();
    getCategoryName();
  }, [categoryID]);

  return (
    <div className={styles.categoryPageWrapper}>
      <Header isFixed={true} />
      <div className={styles.categoryWrapper}>
        {loading ? (
          <div className="d-flex p-5 h-100 flex-column align-items-center fs-1">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className={styles.categoryDetailWrapper}>
            <div className={styles.categoryTitleWrapper}>
              <p>{categoryName}</p>
            </div>
            <div className="ItemList">
              {products.length !== 0 ? (
                products.map((product) => {
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
                })
              ) : (
                <div className="noItem text-nowrap d-flex justify-content-center">
                  상품이 없습니다. 😢
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
