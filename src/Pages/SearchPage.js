import styles from "../Styles/SearchPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ItemCard from "../Components/ItemCard";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Select from "react-select";

const SearchPage = () => {
  const { searchText } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState(searchText);
  const [loading, setLoading] = useState(true);
  const [validateError, setValidateError] = useState(false);

  const [filter, setFilter] = useState("NEW");
  const navigate = useNavigate();

  const options = [
    { value: "NEW", label: "최신순" },
    { value: "OLD", label: "오래된순" },
    { value: "PRICE_DESC", label: "비싼순" },
    { value: "PRICE_ASC", label: "저렴한순" },
  ];

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  useEffect(() => {
    getSearchResult();
  }, [searchText, filter]);

  const getSearchResult = async () => {
    try {
      const user = sessionStorage.getItem("user");

      const userToken = await JSON.parse(user).accessToken;

      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

      const response = await axios.post(`http://localhost:8080/products`, {
        sort: filter,
        searchKeyword: searchText,
      });

      console.log("검색 결과", response);
      setSearchResult(response.data.list);
      setLoading(false);
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
            <div className={"d-flex flex-row justify-content-between pt-3"}>
              {loading ? (
                <p>검색 중....</p>
              ) : (
                <p>
                  [ {searchText} ] 에 대한 검색 결과입니다. 총 {searchResult.length}개 상품 검색됨
                </p>
              )}
              <Select
                defaultValue={options[0]}
                options={options}
                onChange={(e) => {
                  setFilter(e.value);
                }}
              />
            </div>
            <hr />
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="ItemList">
                {searchResult.length > 0 ? (
                  searchResult.map((product) => {
                    return (
                      <ItemCard
                        key={product.productId}
                        id={product.productId}
                        img={product.thumbnailImageUrl}
                        name={product.title}
                        brand={product.brandName}
                        price={product.representativeOption.price}
                      />
                    );
                  })
                ) : (
                  <div className="d-flex w-100 justify-content-center">상품이 없습니다. 😢</div>
                )}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SearchPage;
