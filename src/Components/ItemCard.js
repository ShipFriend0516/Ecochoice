import { useEffect, useState } from "react";
import styles from "../Styles/ItemCard.module.css";
import card2 from "../Styles/ItemCard2.module.css";
import { AiFillHeart, AiOutlineHeart, AiOutlineShopping, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.jpg";
import { BsMenuButton } from "react-icons/bs";

const ItemCard = ({
  id,
  img,
  price,
  name,
  brand,
  reviews = 0,
  cardStyle = 0,
  onCheckChange,
  checked = false,
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const onLikeClick = () => {
    setIsLiked((prev) => !prev);
  };

  const onClickDetail = () => {
    navigate(`/products/${id}`);
  };

  const onCheckboxChange = () => {
    onCheckChange(id); // 체크박스 상태를 부모 컴포넌트로 전달
  };

  const onDeleteClick = () => {
    // 장바구니 상품 취소 버튼 클릭이벤트
  };

  const renderCard1 = () => {
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
            <div className={styles.review}>(리뷰: {reviews})</div>
            <div>
              <button onClick={onLikeClick}>
                {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
              <button>
                <AiOutlineShopping />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCard2 = () => {
    return (
      <div className={card2.ItemCard}>
        <input
          type="checkbox"
          className={`form-check-input ${card2.check}`}
          onChange={onCheckboxChange}
          checked={checked}
        ></input>

        <div className={card2.img}>
          <div className={card2.cover}>
            <button onClick={onClickDetail}>자세히 보기</button>
          </div>
          <img className={card2.img} srcSet={(logo, img)} alt={name} />
        </div>
        <div className={card2.info}>
          <div className={card2.name}>{name}</div>
          <div className={card2.price}>{price.toLocaleString()}원</div>
          <div className={card2.brand}>{brand}</div>
        </div>
        <div className={card2.buttonWrap}>
          <button>
            <AiOutlineClose />
          </button>
        </div>
      </div>
    );
  };

  return cardStyle === 0 ? renderCard1() : renderCard2();
};

export default ItemCard;
