import styles from "../Styles/SearchPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ItemCard from "../Components/ItemCard";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const SearchPage = () => {
  const { searchText } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState(searchText);
  const [validateError, setValidateError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getSearchResult();
  }, [searchText]);

  const getSearchResult = async () => {
    try {
      const user = sessionStorage.getItem("user");

      const userToken = await JSON.parse(user).accessToken;

      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

      const response = await axios.post(`http://localhost:8080/products`, {
        categoryId: "1",
      });

      console.log("검색 결과", response);
      setSearchResult(response.data);
    } catch (error) {
      console.error(error);
      console.error("검색 결과를 불러오는데 실패했습니다.");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formValidate()) {
      navigate(`/search/${search}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  const formValidate = () => {
    if (search === "") {
      console.error("검색할 문자열이 없습니다.");
      return false;
    }

    return true;
  };

  return (
    <>
      <div className={styles.SearchPageWrapper}>
        <Header isFixed={true} />
        <div className={styles.searchDetail}>
          <div className={styles.title}>검색 결과</div>
          <div className="d-flex justify-content-between gap-2 text-nowrap mt-3">
            <input
              value={search}
              placeholder="원하는 상품을 찾아보세요"
              type="search"
              className="form-control"
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-outline-success" onClick={onSubmit}>
              검색
            </button>
          </div>
          <div className={styles.searchResult}>
            <div className={`pt-3`}>
              <p>
                [ {searchText} ] 에 대한 검색 결과입니다. 총 {searchResult.length} 개 상품 검색됨
              </p>
            </div>
            <hr />
            <div className="ItemList">
              {searchResult.length > 0 ? (
                searchResult.map((product) => {
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
                })
              ) : (
                <div className="d-flex w-100 justify-content-center">상품이 없습니다. 😢</div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SearchPage;
