import axios from "axios";
import { useEffect, useState } from "react";

const FetchTest = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  console.log("테스트용 컴포넌트입니다.");
  // 로그인 테스트

  //

  const indexing = async () => {
    try {
      const user = sessionStorage.getItem("user");

      const userToken = await JSON.parse(user).accessToken;

      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      const response = await axios.post("http://localhost:8080/admin/products/reindexing");

      // console.log(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    indexing();
  }, []);

  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div style={{ color: "white", fontSize: "30px" }}>
          FetchTestComponent
          <div className={"d-flex flex-row"}>
            {/* 이미지 */}
            <div className={""}>
              <img src={product.thumbnailImageUrl} alt="상품디테일" />
            </div>
            {/* 설명 */}
            <div className={" d-flex flex-column"}>
              <div className="d-flex flex-column">
                <small>상품번호 : {product.productId}</small>
                <span className={""}>{product.title}</span>
                <span className={``}>
                  가격 : {product.representativeOption.price.toLocaleString()}원
                </span>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchTest;

// const a = {
//   items: [
//     [
//       { cartId: 7, productId: 15, productOptionId: 17, quantity: 1 },
//       { cartId: 6, productId: 2, productOptionId: 4, quantity: 1 },
//       { cartId: 1, productId: 5, productOptionId: 7, quantity: 1 },
//     ],
//   ],
// };

const b = {
  items: [
    [
      { productId: 15, productOptionId: 17, quantity: 1 },
      { productId: 2, productOptionId: 4, quantity: 1 },
      { productId: 5, productOptionId: 7, quantity: 1 },
    ],
  ],
};
