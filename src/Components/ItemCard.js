import { useEffect, useState } from "react";
import styles from "../Styles/ItemCard.module.css";
import card2 from "../Styles/ItemCard2.module.css";
import { AiFillHeart, AiOutlineHeart, AiOutlineShopping, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.jpg";
import { BsMenuButton } from "react-icons/bs";
import axios from "axios";

const ItemCard = ({
  id,
  img,
  price,
  name,
  brand,
  optionID,
  quantity,
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

  const onDeleteClick = async () => {
    // 장바구니 상품 취소 버튼 클릭이벤트
    try {
      const response = await axios.post("http://loaclhost:8080/carts/delete", {
        items: {
          productId: id,
          productOptionId: optionID,
          quantity: quantity,
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // 상품 소개용
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

  // 장바구니용
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
          <img onClick={onClickDetail} className={card2.img} srcSet={(logo, img)} alt={name} />
        </div>
        <div className={card2.info}>
          <div onClick={onClickDetail} className={card2.name + " cursor-pointer"}>
            {name}
          </div>
          <div className={card2.price}>{price.toLocaleString()}원</div>
          <div className={card2.brand}>{brand}</div>
        </div>
        <div>
          <input
            type="number"
            style={{ width: 40 + "px" }}
            className="border rounded text-center"
            defaultValue={quantity}
          />
        </div>
        <div className={card2.buttonWrap}>
          <button onClick={onDeleteClick}>
            <AiOutlineClose />
          </button>
        </div>
      </div>
    );
  };

  return cardStyle === 0 ? renderCard1() : renderCard2();
};

export default ItemCard;
