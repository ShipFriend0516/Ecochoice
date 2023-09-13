import styles from "../Styles/ItemCard.module.css";

const ItemCard = ({ img, price, name, brand }) => {
  return (
    <div className={styles.ItemCard}>
      <img className={styles.img} src={img} />
      <div className={styles.info}>
        <div className={styles.price}>{price}원</div>
        <div className={styles.name}>{name}</div>
        <div className={styles.brand}>{brand}</div>
        <div className={styles.cart}>
          <button>좋아요</button>
          <button>장바구니</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
