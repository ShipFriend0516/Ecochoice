import Header from "../Components/Header";
import styles from "../Styles/Category.module.css";
import ItemCard from "../Components/ItemCard";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryID } = useParams();
  const navigate = useNavigate();
  const getProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/products/`, {
        params: { categoryID: categoryID },
      });

      const json = await response.data;
      setProducts(json);
      console.log(json);
    } catch (error) {
      console.error(error);
      console.error("카테고리별 제품 가져오기 실패");
    }
  };

  const getCategoryName = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/categories/`, {
        params: {
          categoryID,
        },
      });
      setCategoryName(response.data[0].categoryName);
      setLoading(false);
    } catch (error) {
      console.error(error);
      console.error("카테고리 이름 불러오기 실패");
      navigate("/error");
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
          <div className="d-flex vh-100 flex-column align-items-center fs-1">Loading...</div>
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
