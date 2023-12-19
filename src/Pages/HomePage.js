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
import ItemShelf from "../Components/ItemShelf";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);

  const getProducts = async (categoryId) => {
    try {
      if (categoryId === "2") {
        // NEW 카테고리
        const response = await axios.post("http://localhost:8080/products", {
          // sort: "new",
        });
        const json = await response.data.list;
        return json.reverse().slice(0, 20);
      } else {
        const response = await axios.post("http://localhost:8080/products", {
          categoryId: parseInt(categoryId),
        });
        console.log(response);
        const json = await response.data.list;
        // setProducts(json);
        // console.log(json);
        return json;
      }
    } catch (error) {
      console.error(error);
      console.error("카테고리별 제품 가져오기 실패");
    }
  };

  const [loading, setLoading] = useState(true);

  const renderItemList = async (categoryID) => {
    if (categoryID === 2) {
      const products = getProducts(0);
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
      const products = getProducts(categoryID);
      console.log(products);

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
      <Header />
      <Slider />
      <div className="bg">
        <div className="mainWrap">
          <Intro />
          <SubTitle title={"인기 상품 🌏"} summary={"에코초이스 최고 인기 상품들을 모아보세요."} />
          <div className="ItemList">
            <ItemShelf categoryId={1} />
          </div>
          <MoreBtn categoryID={1} />
          <SubTitle title={"신상품 🌱"} summary={"가장 최신의 제품을 만나보세요."} />
          <div className="ItemList">
            <ItemShelf categoryId={2} />
          </div>
          <MoreBtn categoryID={2} />
          <SubTitle title={"생활용품 💡"} summary={"친환경적인 생활용품을 만나보세요."} />
          <div className="ItemList">
            <ItemShelf categoryId={5} />
          </div>
          <MoreBtn categoryID={5} />
          <SubTitle title={"식품 🍎"} summary={"친환경 식품들을 바로 만나보세요."} />
          <div className="ItemList">
            <ItemShelf categoryId={9} />
          </div>
          <MoreBtn categoryID={9} />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
