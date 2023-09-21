import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ItemCard from "../Components/ItemCard";
import SubTitle from "../Components/SubTitle";
import Intro from "../Components/Intro";
import axios from "axios";
import { useEffect, useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import MoreBtn from "../Components/MoreBtn";
import logo from "../Images/logo.jpg";
import cover1 from "../Images/cover1.jpg";
import cover2 from "../Images/cover2.jpg";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [translateForce, setTranslateForce] = useState(0);

  const onClickNext = () => {
    if (currentSlide === imgURL.length) {
      return;
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };
  const onClickPrev = () => {
    if (currentSlide === 0) {
      return;
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      const json = await response.data;
      setProducts(json);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    setTranslateForce((-(currentSlide - 1) * 100) / imgURL.length);
  }, [currentSlide]);

  useEffect(() => {
    getProducts();
  }, []);

  const [products, setProducts] = useState([]);

  let imgURL = [
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1694426684_0.jpg",
    cover1,
    cover2,
  ];

  return (
    <div>
      <Header />

      <div className="sliderWrapper header-img">
        <button className="prev" onClick={onClickPrev}>
          <GrPrevious />
        </button>
        <button className="next" onClick={onClickNext}>
          <GrNext />
        </button>
        <div className="imgWrapper" style={{ transform: `translateX(${translateForce}%)` }}>
          {imgURL.map((imageUrl, index) => (
            <img src={imageUrl} alt={`cover-${index}`} key={index} />
          ))}
        </div>
      </div>
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
            {products.map((product) => {
              return (
                <ItemCard
                  key={product.id}
                  id={product.id}
                  img={product.imagePath}
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                />
              );
            })}
          </div>
          <MoreBtn categoryID={2} />

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
