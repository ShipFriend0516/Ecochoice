import styles from "../Styles/Review.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import logo from "../Images/logo.jpg";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const Review = ({ reviewId, userId, rating, reviewText, deleteReview }) => {
  // 상태 관리
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const ratingRender = (rating = 0) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} />);
    }
    for (let i = 0; i < 5 - rating; i++) {
      stars.push(<FaRegStar key={5 - i} />);
    }
    return <>{stars}</>;
  };

  // 유저 정보를 불러오는 API
  const getUser = async () => {
    const userSession = sessionStorage.getItem("user");
    const userAccessToken = JSON.parse(userSession).accessToken;
    axios.defaults.headers.common["Authorization"] = `Bearer ${userAccessToken}`;

    const response = await axios.get("http://localhost:8080/users");
    console.log(response);

    setUser(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={styles.review}>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <div className={`${styles.leftSide}`}>
            <div>
              <img srcSet={[user.profileImageUrl, logo]} alt="프로필사진"></img>
              <div className={`${styles.name}`}>{user.nickname}</div>
            </div>
            <div className={`${styles.membership}`}>멤버십: {user.rank}</div>
          </div>
          <div className={`${styles.rightSide}`}>
            <div className="d-flex justify-content-between">
              <div className={`${styles.rating}`}>{ratingRender(rating)}</div>
              <div className="dropdown">
                <span onClick={() => setIsOpen((prev) => !prev)} className={`${styles.more} `}>
                  <IconContext.Provider value={{ size: "1.2em" }}>
                    <FiMoreHorizontal />
                  </IconContext.Provider>
                </span>
                {isOpen && (
                  <ul className={styles.dropdownMenu}>
                    <li>수정</li>
                    <li
                      onClick={() => {
                        deleteReview(reviewId);
                      }}
                    >
                      삭제
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className={`${styles.boughtProduct}`}>구매한 제품</div>
            <div className={`${styles.reviewText}`}>{reviewText}</div>
          </div>
        </>
      )}
    </div>
  );
};

Review.propTypes = {};

export default Review;
