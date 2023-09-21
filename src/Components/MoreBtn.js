import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const MoreBtn = ({ categoryID }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/category/${categoryID}`);
  };
  return (
    <div className="moreBtnWrap">
      <button className="moreBtn" onClick={onClick}>
        MORE
        <AiOutlineRight className="arrow" />
      </button>
    </div>
  );
};

export default MoreBtn;
