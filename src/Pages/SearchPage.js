import styles from "../Styles/SearchPage.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ItemCard from "../Components/ItemCard";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Select from "react-select";
import { GoArrowUp } from "react-icons/go";

const SearchPage = () => {
  const { searchText } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState(searchText);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const [validateError, setValidateError] = useState(false);

  // 필터 상태
  const [filter, setFilter] = useState("NEW");

  // 무한 스크롤 구현
  const [scrollLoading, setScrollLoading] = useState(false);
  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (scrollLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          setScrollLoading(true);
          await additionalGetProducts();
          setScrollLoading(false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [scrollLoading]
  );

  const additionalGetProducts = async () => {
    try {
      if (!searchResult.isLast) {
        const response = await axios.post("http://localhost:8080/products", {
          sort: filter,
          searchKeyword: searchText,
          page: searchResult.nextPage,
        });

        console.log(response);
        setSearchResult((prevSearchResult) => ({
          list: [...prevSearchResult.list, ...response.data.list],
          isLast: response.data.isLast,
          nextPage: response.data.nextPage,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log(searchResult);
    }
  };

  // 최상단으로 이동하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    // 현재 스크롤 위치가 300px 이상이면 버튼을 표시
    const currentScrollPos = window.pageYOffset;
    setIsVisible(currentScrollPos > 300);
  };

  // 페이지 로드 시 및 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  const options = [
    { value: "NEW", label: "최신순" },
    { value: "OLD", label: "오래된순" },
    { value: "PRICE_DESC", label: "비싼순" },
    { value: "PRICE_ASC", label: "저렴한순" },
  ];

  useEffect(() => {
    getSearchResult();
  }, [searchText, filter]);

  const getSearchResult = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/products`, {
        sort: filter,
        searchKeyword: searchText,
      });
      console.log("검색 결과", response);
      setSearchResult(response.data);
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
                  [ {searchText} ] 에 대한 검색 결과입니다. 총 {searchResult.list.length}개 상품
                  검색됨
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
                {searchResult.list.length > 0 ? (
                  searchResult.list.map((product, index) => {
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
                <div className="" ref={lastItemRef}></div>
                {scrollLoading && <p>Loading more items...</p>}
              </div>
            )}
          </div>
        </div>
        <div>
          {isVisible && (
            <button
              onClick={scrollToTop}
              className="btn rounded"
              style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 999 }}
            >
              <GoArrowUp size={1.2 + "em"} />
            </button>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SearchPage;
