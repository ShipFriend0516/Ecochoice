import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../Styles/ItemDetailPage.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";

const ItemDetailPage = ({ imgPath }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const getProduct = async () => {
    const response = await axios.get(`http://localhost:3001/products/${id}`);
    console.log(response);
    const result = await response.data;
    setProduct(result);
    setLoading(false);
    return result;
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Header />
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center fs-1 bold">
            Loading..
          </div>
        </>
      ) : (
        <div>
          <Header isFixed={true} />
          <div className={`${styles.detailWrapper}`}>
            <div className={`${styles.detailTop} d-flex flex-row`}>
              {/* 이미지 */}
              <div className={`${styles.imgWrapper}`}>
                <img src={product.imagePath} alt="상품디테일" />
              </div>
              {/* 설명 */}
              <div className={`${styles.itemInfoWrapper} d-flex flex-column`}>
                <div className="d-flex flex-column">
                  <small>상품번호 : {product.id}</small>
                  <span className="fs-2">{product.name}</span>
                  <span>가격 : {product.price.toLocaleString()}원</span>
                  <p>{product.description}</p>
                </div>
                <div className={styles.buttonsWrapper}>
                  <button className="btn btn-outline-dark">
                    <AiOutlineHeart />
                  </button>
                  <button className="btn btn-outline-dark">장바구니</button>
                  <button className="btn btn-outline-dark">구매하기</button>
                </div>
              </div>
            </div>
          </div>
          <div className="itemDetailWrapper">
            <div className={styles.reviews}>
              <div className={styles.reviewTitle}>리뷰</div>
              <div>리뷰가 없습니다.</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetailPage;
