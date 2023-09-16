import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ItemCard from "../Components/ItemCard";
import logo from "../Images/logo.jpg";
import { AiOutlineRight } from "react-icons/ai";
import SubTitle from "../Components/SubTitle";
import Intro from "../Components/Intro";

const Home = () => {
  return (
    <div>
      <Header />
      <img
        className="header-img"
        src="https://atimg.sonyunara.com/files/attrangs/new_banner/1694426684_0.jpg"
      ></img>
      <div className="mainWrap">
        <Intro />
        <SubTitle title={"인기 상품 💖"} summary={"에코초이스 최고 인기 상품들을 모아보세요."} />
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
        <div className="moreBtnWrap">
          <button className="moreBtn">
            MORE
            <AiOutlineRight className="arrow" />
          </button>
        </div>
        <SubTitle title={"신상품 🎁"} summary={"가장 최신의 제품을 만나보세요."} />
        <div className="ItemList">
          <ItemCard img={logo} price={30000} name={"와 싸다"} brand={"공주대학교"} />
          <ItemCard img={logo} price={30000} name={"와 싸다"} brand={"공주대학교"} />
          <ItemCard img={logo} price={30000} name={"와 싸다"} brand={"공주대학교"} />
          <ItemCard img={logo} price={30000} name={"와 싸다"} brand={"공주대학교"} />
          <ItemCard img={logo} price={30000} name={"와 싸다"} brand={"공주대학교"} />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
