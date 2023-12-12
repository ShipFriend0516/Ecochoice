import axios from "axios";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

const ItemShelf = ({ categoryId }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // const getReviews = async () => {
  //   const response = await axios.get("http://localhost:8080/reviews");
  //   const result = await response.data;
  //   setReviews(result);
  //   setReviewLoading(false);
  // };

  const getProducts = async (categoryId) => {
    try {
      if (categoryId === "2") {
        // NEW 카테고리
        const response = await axios.post("http://localhost:8080/products", {
          // sort: "new",
          size: 10,
        });
        const json = await response.data.list;
        return json.reverse().slice(0, 20);
      } else {
        const response = await axios.post("http://localhost:8080/products", {
          categoryId: parseInt(categoryId),
          size: 10,
        });
        console.log(response);
        const json = await response.data.list;
        // setProducts(json);
        // console.log(json);
        setProducts(json);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      console.error("카테고리별 제품 가져오기 실패");
    }
  };

  useEffect(() => {
    getProducts(categoryId);
  }, []);

  useEffect(() => {
    // getReviews();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    products.map((product, index) => (
      <ItemCard
        key={product.productId}
        id={product.productId}
        img={product.thumbnailImageUrl}
        name={product.title}
        brand={product.brandName}
        price={product.representativeOption.price}
        // reviews={reviews.filter((review) => review.productID === product.id).length}
      />
    ))
  );
};

export default ItemShelf;
