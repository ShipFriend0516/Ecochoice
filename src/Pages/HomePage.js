import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ItemCard from "../Components/ItemCard";
import SubTitle from "../Components/SubTitle";
import Intro from "../Components/Intro";
import axios from "axios";
import { useEffect, useState } from "react";
import MoreBtn from "../Components/MoreBtn";
import logo from "../Images/logo.jpg";
import Slider from "../Components/Slider";
import FetchTest from "../Components/FetchTest";

const Home = ({ onLoginSuccess }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);

  const getProducts = async (categoryId) => {
    try {
      const user = sessionStorage.getItem("user");

      const userToken = JSON.parse(user).accessToken;
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      if (categoryId === "2") {
        // NEW 카테고리
        const response = await axios.post("http://localhost:8080/products", {
          // sort: "new",
        });
        const json = await response.data.list;
        json.reverse();
        setProducts(json.slice(0, 20));
      } else {
        const response = await axios.post("http://localhost:8080/products", {
          categoryId: parseInt(categoryId),
        });
        console.log(response);
        const json = await response.data.list;
        setProducts(json);
        console.log(json);
      }
    } catch (error) {
      console.error(error);
      console.error("카테고리별 제품 가져오기 실패");
    }
  };

  const getReviews = async () => {
    const response = await axios.get(`http://localhost:3001/reviews`);
    const result = await response.data;
    setReviews(result);
    setReviewLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getReviews();
  }, []);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const renderItemList = (categoryID) => {
    if (categoryID === 2) {
      return products.map((product, index) => {
        if (index < 10) {
          return (
            <ItemCard
              key={product.id}
              id={product.id}
              img={product.imagePath}
              name={product.name}
              brand={product.brand}
              price={product.price}
              reviews={reviews.filter((review) => review.productID === product.id).length}
            />
          );
        } else {
          return;
        }
      });
    } else {
      return products.map((product, index) => {
        return (
          product.categoryID === categoryID && (
            <ItemCard
              key={product.id}
              id={product.id}
              img={product.imagePath}
              name={product.name}
              brand={product.brand}
              price={product.price}
              reviews={reviews.filter((review) => review.productID === product.id).length}
            />
          )
        );
      });
    }
  };

  return (
    <div>
      {/* <FetchTest /> */}
      <Header onLoginSuccess={onLoginSuccess} />
      <Slider />
      <div className="bg">
        <div className="mainWrap">
          <Intro />
          <SubTitle title={"인기 상품 🌏"} summary={"에코초이스 최고 인기 상품들을 모아보세요."} />
          <div className="ItemList">
            <ItemCard img={logo} price={30000} name={"상품의 이름"} brand={"제조사 및 브랜드"} />
            <ItemCard
              img={
                "https://gametouchmall.com/web/product/tiny/202207/e5daf237d5abed5c4a2e41bd699e1a61.jpg"
              }
              price={655800}
              name={"PS5"}
              brand={"Sony"}
            />
            <ItemCard
              img={"https://i.gifer.com/5K4w.gif"}
              price={30000}
              name={"맷도요새"}
              brand={"개귀엽네"}
            />
            <ItemCard img={logo} price={50000} name={""} brand={"공주대학교"} />
            <ItemCard img={logo} price={30000} name={"와 싸다"} brand={"공주대학교"} />
            <ItemCard img={logo} price={30000} name={"와 싸다"} brand={"공주대학교"} />
            <ItemCard img={logo} price={30000} name={"와 싸다"} brand={"공주대학교"} />
            <ItemCard img={logo} price={30000} name={"와 싸다"} brand={"공주대학교"} />
            <ItemCard img={logo} price={30000} name={"와 싸다"} brand={"공주대학교"} />
            <ItemCard img={logo} price={30000} name={"와 싸다"} brand={"공주대학교"} />
          </div>
          <MoreBtn categoryID={1} />
          <SubTitle title={"신상품 🌱"} summary={"가장 최신의 제품을 만나보세요."} />
          <div className="ItemList">
            {loading || reviewLoading ? "loading..." : renderItemList(2)}
          </div>
          <MoreBtn categoryID={2} />
          <SubTitle title={"생활용품 💡"} summary={"친환경적인 생활용품을 만나보세요."} />
          <div className="ItemList">
            {loading || reviewLoading ? "loading..." : renderItemList(5)}
          </div>
          <MoreBtn categoryID={5} />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
