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
        const response = await axios.post("http://localhost:8080/products", {
          // sort: "new",
        });
        const json = await response.data.list;
        json.reverse();
        setProducts(json.slice(0, 20));
      } else {
        const response = await axios.post("http://localhost:8080/products", {
          categoryId: parseInt(categoryID),
          size: 20,
        });
        console.log(response);
        const json = await response.data.list;
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
            <hr className={styles.hrStyle} />
            <div className="ItemList">
              {products.length !== 0 ? (
                products.map((product) => {
                  return (
                    <ItemCard
                      key={product.productId}
                      id={product.productId}
                      img={product.thumbnailImageUrl}
                      name={product.title}
                      brand={product.brandName}
                      price={product.representativeOption.price}
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
