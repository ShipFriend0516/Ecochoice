import Header from "../Components/Header";
const SellPage = () => {
  return (
    <div>
      <Header isFixed={true} />
      <div className="bg">
        <p className="fs-2">상품 판매 페이지</p>
        <div>
          <div>이미지를 추가해주세요</div>
          <div>
            <p>상품이름</p>
            <p>상품가격</p>
            <p>브랜드</p>
            <p>수량</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
