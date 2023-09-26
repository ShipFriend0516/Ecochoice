import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../Styles/ItemDetailPage.module.css";
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import Header from "../Components/Header";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import Review from "../Components/Review";
import logo from "../Images/logo.jpg";

const ItemDetailPage = ({ imgPath }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

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

  const onStarClick = (star) => {
    setRating(star);
  };

  const postReview = async () => {
    try {
      if (reviewValidate()) {
        console.log(typeof parseInt(id, 10), dummyUser.UID, summary, rating);
        const productID = parseFloat(id, 10);
        axios
          .post("http://localhost:3001/reviews", {
            productID,
            authorID: dummyUser.UID,
            summary,
            rating,
          })
          .then((response) => {
            setSummary("");
            setRating(0);
            console.log(response);
            getReviews();
          })
          .catch((error) => console.log(error));
      }
    } catch (err) {
      console.error("리뷰 작성 실패!", err);
    }
  };

  const reviewValidate = () => {
    if (summary.length < 5 && rating === 0) {
      setError("리뷰는 최소 5글자 이상 작성하고, 별점을 선택해주세요.");
      return false;
    } else if (summary.length < 5) {
      setError("리뷰는 최소 5글자 이상 작성해주셔야합니다.");
      return false;
    } else if (rating === 0) {
      setError("별점을 선택해주세요!");
      return false;
    }
    return true;
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
                  <div className={`${styles.reviewWriteWrapper}`}>
                    <div className={`${styles.rating}`}>
                      <span className="me-2">별점을 선택해주세요.</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => onStarClick(star)}
                          className={`${styles.star}`}
                          style={{ cursor: "pointer" }}
                        >
                          <IconContext.Provider value={{ color: "#9e7470", size: "1.5em" }}>
                            {star <= rating ? <FaStar /> : <FaRegStar />}
                          </IconContext.Provider>
                        </span>
                      ))}
                    </div>
                    <textarea
                      className={`form-control ${styles.reviewTextArea}`}
                      placeholder={
                        isLoggedIn
                          ? `상품을 구매하셨나요? 리뷰를 작성해보세요!`
                          : `로그인 후 리뷰 작성하기`
                      }
                      onChange={(e) => setSummary(e.target.value)}
                      value={summary}
                      maxLength={500}
                      rows={3}
                    />
                    <div className="d-flex justify-content-between">
                      <span styles="visibility: hidden;" className={styles.errorMsg}>
                        {error}
                      </span>

                      <button className="btn btn-success mt-1" onClick={postReview}>
                        등록
                      </button>
                    </div>
                  </div>
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
