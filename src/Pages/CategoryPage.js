import Header from "../Components/Header";
import styles from "../Styles/Category.module.css";
import ItemCard from "../Components/ItemCard";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import useToast from "../hooks/toast";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryID } = useParams();
  const navigate = useNavigate();

  const { addToast } = useToast();

  // 무한 스크롤 구현
  const [scrollLoading, setScrollLoading] = useState(false);
  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (scrollLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          setScrollLoading(true);
          await additionalGetProducts();
          setScrollLoading(false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [scrollLoading]
  );

  const additionalGetProducts = async () => {
    try {
      if (!products.isLast) {
        if (categoryID === "2") {
          const response = await axios.post("http://localhost:8080/products", {
            sort: "NEW",
            page: products.nextPage,
          });
          console.log("추가 로딩", response);
          setProducts((prevproducts) => ({
            list: [...prevproducts.list, ...response.data.list],
            isLast: response.data.isLast,
            nextPage: response.data.nextPage,
          }));
        } else {
          const response = await axios.post("http://localhost:8080/products", {
            categoryId: parseInt(categoryID),
            page: products.nextPage,
          });
          console.log("추가 로딩", response);
          setProducts((prevproducts) => ({
            list: [...prevproducts.list, ...response.data.list],
            isLast: response.data.isLast,
            nextPage: response.data.nextPage,
          }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      if (categoryID === "2") {
        // NEW 카테고리
        const response = await axios.post("http://localhost:8080/products", {
          sort: "NEW",
        });
        const json = response.data;
        setProducts(json);
      } else {
        const response = await axios.post("http://localhost:8080/products", {
          categoryId: parseInt(categoryID),
        });
        console.log(response);
        const json = response.data;
        setProducts(json);

        console.log(json);
      }
      setLoading(false);
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
    setLoading(true);
    setProducts((prev) => ({ list: [] }));
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
              {products.list.length !== 0 ? (
                products.list.map((product, index) => {
                  if (index === products.list.length - 1) {
                    return (
                      <>
                        <ItemCard
                          key={product.productId}
                          id={product.productId}
                          img={product.thumbnailImageUrl}
                          name={product.title}
                          brand={product.brandName}
                          price={product.representativeOption.price}
                        ></ItemCard>
                        <div ref={lastItemRef}></div>
                      </>
                    );
                  }
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
            {scrollLoading && <p>Loading more items...</p>}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
