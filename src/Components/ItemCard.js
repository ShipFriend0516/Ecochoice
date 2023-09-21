import { useState } from "react";
import styles from "../Styles/ItemCard.module.css";
import { AiFillHeart, AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.jpg";

const ItemCard = ({ id, img, price, name, brand }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const onLikeClick = () => {
    setIsLiked((prev) => !prev);
  };

  const onClickDetail = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className={styles.ItemCard}>
      <div className={styles.img}>
        <div className={styles.cover}>
          <button onClick={onClickDetail}>자세히 보기</button>
        </div>
        <img className={styles.img} srcSet={(logo, img)} alt={name} />
      </div>
      <div className={styles.info}>
        <div className={styles.price}>{price.toLocaleString()}원</div>
        <div className={styles.name}>{name}</div>
        <div className={styles.brand}>{brand}</div>
        <div className={styles.cart}>
          <div className={styles.review}>(리뷰: 0)</div>
          <div>
            <button onClick={onLikeClick}>{isLiked ? <AiFillHeart /> : <AiOutlineHeart />}</button>
            <button>
              <AiOutlineShopping />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
