import { useState, useRef } from "react";
import Header from "../Components/Header";

import styles from "../Styles/SellPage.module.css";
import { useNavigate } from "react-router-dom";
const SellPage = () => {
  const [itemImage, setItemImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemBrand, setItemBrand] = useState("");
  const [itemCount, setItemCount] = useState(1);
  const [itemDescription, setItemDescription] = useState("");
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    // 클릭 시 input 파일 업로드 클릭
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // 이미지 파일을 선택한 경우
      const reader = new FileReader();

      reader.onload = (e) => {
        // 이미지 미리보기를 위한 작업
        // 여기서는 예시로 alert를 사용하고 실제로는 상태를 업데이트하여 프리뷰에 사용할 수 있습니다.
        setItemImage(e.target.result);
        // alert(`Selected Image: ${e.target.result}`);
      };

      reader.readAsDataURL(file);
    }
  };

  const sellValidate = () => {
    // Validate itemName
    if (itemName.trim() === "") {
      // Item name is empty
      alert("상품 이름은 필수 항목입니다!");
      return false;
    }

    // Validate itemPrice
    if (itemPrice <= 0) {
      // Item price is not a positive number
      alert("상품 가격을 입력해주세요.");
      return false;
    }

    // Validate itemBrand
    if (itemBrand.trim() === "") {
      // Item brand is empty
      alert("상품 브랜드를 입력해주세요.");
      return false;
    }

    // Validate itemCount
    if (itemCount <= 0) {
      // Item count is not a positive number
      alert("올바른 수량을 입력해주세요.");
      return false;
    }

    // Validate itemDescription
    if (itemDescription.trim() === "") {
      // Item description is empty
      alert("세부 정보를 입력해주세요.");
      return false;
    }

    // All fields are valid

    return true;
  };
  return (
    <div>
      <Header isFixed={true} />
      <div className={"bg p-5 vw-100 vh-100"}>
        <h1 className={`d-block m-5 bold text-center`}>
          <span className={`${styles.title}`}>상품 판매</span>
        </h1>
        <div className={`${styles.addItem}`}>
          <div className={`d-flex justify-content-evenly  align-items-center`}>
            <div onClick={handleImageClick} className={`${styles.addImage}`}>
              {itemImage ? (
                <img src={itemImage} alt="상품이미지"></img>
              ) : (
                "클릭하여 이미지 추가하기"
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <div className={`d-flex flex-column ${styles.itemForm}`}>
              <p className="bold fs-4 mb-2">상품 정보 입력</p>
              <div className="d-flex flex-row text-nowrap">
                <p>상품이름</p>
                <input
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}
                  className="form-control"
                  type="text"
                  placeholder="상품이름"
                ></input>
              </div>
              <div className="d-flex flex-row text-nowrap">
                <p>가격</p>
                <input
                  onChange={(e) => {
                    setItemPrice(e.target.value);
                  }}
                  className="form-control"
                  type="text"
                  placeholder="가격"
                ></input>
              </div>
              <div className="d-flex flex-row text-nowrap">
                <p>브랜드</p>
                <input
                  onChange={(e) => {
                    setItemBrand(e.target.value);
                  }}
                  className="form-control"
                  type="text"
                  placeholder="브랜드"
                ></input>
              </div>
              <div className="d-flex flex-row text-nowrap">
                <p>수량</p>
                <input
                  onChange={(e) => {
                    setItemCount(e.target.value);
                  }}
                  className="form-control"
                  type="text"
                  placeholder="수량"
                ></input>
              </div>
              <div className="d-flex flex-row text-nowrap">
                <p>상품 설명</p>
                <textarea
                  onChange={(e) => {
                    setItemDescription(e.target.value);
                  }}
                  rows={5}
                  className="form-control"
                  type="text"
                  placeholder="상품 설명"
                ></textarea>
              </div>
            </div>
          </div>
          <div className={`w-100 ${styles.buttonWrapper}`}>
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              취소하기
            </button>
            <button
              onClick={() => {
                if (sellValidate()) console.log(itemName, "등록");
              }}
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
