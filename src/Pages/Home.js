import Footer from "../Components/Footer";
import Header from "../Components/Header";
import logoWide from "../Images/logo-wide.jpg";
import ItemCard from "../Components/ItemCard";

import logo from "../Images/logo.jpg";
import { AiOutlineRight } from "react-icons/ai";

const Home = () => {
  return (
    <div>
      <Header />
      <img
        className="header-img"
        src="https://atimg.sonyunara.com/files/attrangs/new_banner/1694426684_0.jpg"
      ></img>
      <div className="mainWrap">
        <div className="intro">
          <span>에코초이스는</span>
          <p>
            당신의 선택이 지구와 우리 모두에게 긍정적인 영향을 미칩니다. <br></br>지금 시작하여
            우리의 노력에 함께 참여하세요. <br />
            친환경한 삶을 누리며, 더 나은 환경을 만들어 갑시다.
          </p>
          <div className="introPicWrap">
            <img src={logoWide} alt="img" />
            <img src={logoWide} alt="img" />
            <img src={logoWide} alt="img" />
            <img src={logoWide} alt="img" />
          </div>
        </div>
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
        </div>
        <div className="ItemList">
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
        <Footer />
      </div>
    </div>
  );
};

export default Home;
