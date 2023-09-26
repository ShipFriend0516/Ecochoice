import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../Styles/ItemDetailPage.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import Header from "../Components/Header";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import Review from "../Components/Review";
import logo from "../Images/logo.jpg";

const ItemDetailPage = ({ imgPath }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/products/${id}`);
      const result = await response.data;
      setProduct(result);
      setLoading(false);
    } catch (err) {
      console.error("상품 세부 정보를 불러오는데 실패했습니다.", err);
      navigate("/error");
    }
  };

  const getReviews = async () => {
    const response = await axios.get(`http://localhost:3001/reviews`, {
      params: {
        productID: id,
      },
    });
    const result = await response.data;
    setReviews(result);
    setReviewLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    getReviews();
  }, []);

  let dummyUser = {
    UID: 1,
    id: "orbita@example.com",
    pw: "1234",
    nickName: "오르비타",
    membership: "Bronze",
    profileImage: "https://i.gifer.com/5K4w.gif",
  };

  let anonymousUser = {
    UID: 2,
    profileImage:
      "https://phinf.pstatic.net/contact/20210727_207/1627329785715shmqc_JPEG/image.jpg?type=s160",
    nickName: "익명",
    membership: "Bronze",
  };

  const onCartClick = () => {
    // 장바구니 버튼 클릭시
  };
  const onBuyClick = () => {
    // 구매하기 버튼 클릭시
  };

  return (
    <div className={styles.detailPageWrapper}>
      {loading ? (
        <>
          <Header />
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center fs-1 bold">
            Loading..
          </div>
        </>
      ) : (
        <>
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
                    <span className={`${styles.productTitle}`}>{product.name}</span>
                    <span className={`${styles.productPrice}`}>
                      가격 : {product.price.toLocaleString()}원
                    </span>
                    <p>{product.description}</p>
                  </div>

                  <div className={styles.buttonsWrapper}>
                    <button onClick={() => setIsLiked((prev) => !prev)}>
                      <IconContext.Provider value={{ color: "#9e7470", size: "1.5em" }}>
                        {isLiked ? (
                          <FaHeart className={isLiked && `${styles.heart}`} />
                        ) : (
                          <FaRegHeart />
                        )}
                      </IconContext.Provider>
                    </button>
                    <button>장바구니</button>
                    <button>구매하기</button>
                  </div>
                </div>
              </div>
              <div className={styles.itemDetailWrapper}>
                <div className={`${styles.detailBottom}`}>
                  <div className={`d-flex flex-column`}>
                    <span className="fs-2">{product.name}</span>
                    <span>가격 : {product.price.toLocaleString()}원</span>
                    <p>{product.description}</p>
                    <img src={product.imagePath} />
                  </div>
                </div>
                <div className={styles.reviews}>
                  <hr />
                  <div className={styles.reviewTitle}>리뷰</div>
                  {reviewLoading ? (
                    <div>리뷰가 없습니다.</div>
                  ) : (
                    <>
                      <Review user={dummyUser} rating={4} reviewText={"이거 진짜 좋아요"} />
                      {reviews.map((review) => {
                        return (
                          <Review
                            key={review.summary}
                            user={anonymousUser}
                            rating={review.rating}
                            reviewText={review.summary}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default ItemDetailPage;
