import styles from "../Styles/Review.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import logo from "../Images/logo.jpg";

const Review = ({ user, rating, reviewText }) => {
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

  return (
    <div className={styles.review}>
      <div className={`${styles.leftSide}`}>
        <div>
          <img src={user.profileImage} alt="프로필사진"></img>
          <div className={`${styles.name}`}>{user.nickName}</div>
        </div>
        <div className={`${styles.membership}`}>멤버십: {user.membership}</div>
      </div>
      <div className={`${styles.rightSide}`}>
        <div className={`${styles.rating}`}>{ratingRender(rating)}</div>
        <div className={`${styles.boughtProduct}`}>구매한 제품</div>
        <div className={`${styles.reviewText}`}>{reviewText}</div>
      </div>
    </div>
  );
};

export default Review;
