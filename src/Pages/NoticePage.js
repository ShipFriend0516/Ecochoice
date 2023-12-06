import Header from "../Components/Header";
import Footer from "../Components/Footer";
const NoticePage = () => {
  return (
    <div>
      <Header isFixed={true} />
      <div style={{ backgroundColor: "white", height: "80vh", padding: "50px" }}>
        <h3>여러분의 개인정보는 제가 잘 쓰겠습니다~</h3>
      </div>
      <Footer />
    </div>
  );
};

export default NoticePage;
