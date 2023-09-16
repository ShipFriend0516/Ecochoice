import styles from "../Styles/ItemCard.module.css";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";

const ItemCard = ({ img, price, name, brand }) => {
  return (
    <div className={styles.ItemCard}>
      <div className={styles.img}>
        <div className={styles.cover}>
          <button>자세히 보기</button>
        </div>
        <img className={styles.img} src={img} alt={name} />
      </div>
      <div className={styles.info}>
        <div className={styles.price}>{price.toLocaleString()}원</div>
        <div className={styles.name}>{name}</div>
        <div className={styles.brand}>{brand}</div>
        <div className={styles.cart}>
          <div className={styles.review}>(리뷰: 0)</div>
          <div>
            <button>
              <AiOutlineHeart />
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

export default ItemCard;
