import { useState, useRef } from "react";
import Header from "../Components/Header";

import styles from "../Styles/SellPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellPage = () => {
  const [itemImage, setItemImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemBrand, setItemBrand] = useState("");
  const [itemCount, setItemCount] = useState(1);
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategoryId, setItemCategoryId] = useState(2);
  const [itemOptionTitle, setItemOptionTitle] = useState("");

  const navigate = useNavigate();

  const postProduct = async () => {
    try {
      const response = await axios.post("http://localhost:8080/admin/products/create", {
        title: itemName,
        contents: itemDescription,
        thumbnailImageUrl: itemImage,
        brandName: itemBrand,
        categoryId: itemCategoryId,
        options: [
          {
            isRepresentative: true,
            title: itemOptionTitle,
            price: itemPrice,
            stock: itemCount,
            display: true,
          },
        ],
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const resetInput = () => {
    setItemImage(null);
    setItemName("");
    setItemPrice(0);
    setItemBrand("");
    setItemCount(1);
    setItemDescription("");
    setItemCategoryId(null);
    setItemOptionTitle("");
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
      <div className={`${styles.bg} p-5 vw-100`}>
        <h1 className={`d-block m-5 bold text-center`}>
          <span className={`${styles.title}`}>상품 판매</span>
        </h1>
        <div className={`${styles.addItem} ${styles.effect4}`}>
          <div className={"d-flex justify-content-evenly  align-items-center"}>
            <div className={"d-flex flex-column justify-content-between"}>
              <p className="bold fs-4 mb-2">상품 이미지의 URL</p>
              <input
                type="text"
                className="mb-3 form form-control w-100"
                placeholder="이미지 주소 URL"
                onChange={(e) => setItemImage(e.target.value)}
              ></input>
              <div className={`${styles.addImage}`}>
                {itemImage ? (
                  <img src={itemImage} alt="상품이미지" onError={() => setItemImage(null)}></img>
                ) : (
                  "이미지 미리보기"
                )}
              </div>
            </div>
            <div className={`d-flex flex-column ${styles.itemForm}`}>
              <p className="bold fs-4 mb-2">상품 정보 입력</p>
              <div className="d-flex flex-row text-nowrap">
                <p>상품 이름</p>
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
                <p>옵션 이름</p>
                <input
                  onChange={(e) => {
                    setItemOptionTitle(e.target.value);
                  }}
                  className="form-control"
                  type="text"
                  placeholder="옵션 이름"
                ></input>
              </div>
              <div className="d-flex flex-row text-nowrap">
                <p>카테고리</p>
                <input
                  onChange={(e) => {
                    setItemCategoryId(e.target.value);
                  }}
                  className="form-control"
                  type="number"
                  max={12}
                  min={1}
                  placeholder="카테고리"
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
                if (sellValidate()) {
                  postProduct();
                  resetInput();
                }
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
