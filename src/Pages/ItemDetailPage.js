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
import LoginModal from "../Components/LoginModal";

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
  const [user, setUser] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // 로그인
  const [isVisible, setIsVisible] = useState(false);

  const getProduct = async () => {
    try {
      const user = sessionStorage.getItem("user");

      const userToken = await JSON.parse(user).accessToken;

      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

      const response = await axios.get(`http://localhost:8080/products/${id}/details`);
      const result = await response.data;
      console.log(result);
      setProduct(result);
      setLoading(false);
    } catch (err) {
      console.error("상품 세부 정보를 불러오는데 실패했습니다.", err);
      // navigate("/error");
    }
  };

  const getUser = async () => {
    const userData = sessionStorage.getItem("user");
    const userToken = JSON.parse(userData).accessToken;
    setUser(userToken);
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
    getUser();
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

  const toggleModal = () => {
    setIsVisible((prev) => !prev);
  };

  const onCartClick = async () => {
    // 장바구니 버튼 클릭시
    if (userValidate()) {
      console.log("장바구니 클릭");
      axios.defaults.headers.common["Authorization"] = `Bearer ${user}`;
      const response = await axios.post("http://localhost:8080/carts", {
        item: {
          productId: id,
          productOptionId: 1,
          quantity: 1,
        },
      });
      console.log(response);
    } else {
      toggleModal();
    }
  };
  const onBuyClick = () => {
    // 구매하기 버튼 클릭시
    if (userValidate()) {
    } else {
      toggleModal();
    }
  };

  const userValidate = () => {
    if (user) return true;
    return false;
  };

  const onStarClick = (star) => {
    if (userValidate()) {
      setRating(star);
    } else {
      toggleModal();
    }
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
            <Header isFixed={true} modalOpen={isVisible} />
            {isVisible && (
              <LoginModal
                loginOnClick={toggleModal}
                isOpen={isVisible}
                errMsg="로그인이 필요한 서비스입니다."
              />
            )}
            <div className={`${styles.detailWrapper}`}>
              <div className={`${styles.detailTop} d-flex flex-row`}>
                {/* 이미지 */}
                <div className={`${styles.imgWrapper}`}>
                  <img src={product.thumbnailImageUrl} alt="상품디테일" />
                </div>
                {/* 설명 */}
                <div className={`${styles.itemInfoWrapper} d-flex flex-column`}>
                  <div className="d-flex flex-column">
                    <small>상품번호 : {product.productId}</small>
                    <span className={`${styles.productTitle}`}>{product.title}</span>
                    <span className={`${styles.productPrice}`}>
                      가격 : {product.representativeOption.price.toLocaleString()}원
                    </span>
                    <p>{product.description}</p>
                  </div>
                  <div>
                    <div>
                      <div className={`${styles.btn_group}`}>
                        <button
                          className="btn btn-secondary btn-sm dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          상품옵션
                        </button>
                        <ul className="dropdown-menu">
                          {product.options.map((option, i) => (
                            <>
                              <>{i !== 0 && <hr style={{ margin: "3px" }} />}</>
                              <li key={option.productOptionId}>
                                {option.title}: 가격 {option.price.toLocaleString()}원, 수량{" "}
                                {option.quantity}개{" "}
                              </li>
                            </>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className={styles.buttonsWrapper}>
                      <button onClick={() => setIsLiked((prev) => !prev)}>
                        <IconContext.Provider value={{ color: "#6A9C89", size: "1.5em" }}>
                          {isLiked ? (
                            <FaHeart className={isLiked && `${styles.heart}`} />
                          ) : (
                            <FaRegHeart />
                          )}
                        </IconContext.Provider>
                      </button>
                      <button onClick={onCartClick}>장바구니</button>
                      <button onClick={onBuyClick}>구매하기</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.itemDetailWrapper}>
                <div className={`${styles.detailBottom}`}>
                  <div className={`d-flex flex-column`}>
                    <span className="fs-2">{product.title}</span>
                    <span>가격 : {product.representativeOption.price.toLocaleString()}원</span>
                    <p>{product.contents}</p>
                    <img src={product.thumbnailImageUrl} alt="상품이미지" />
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
                          <IconContext.Provider value={{ color: "#6A9C89", size: "1.5em" }}>
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
