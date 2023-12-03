import logoWide from "../Images/logo-wide.jpg";
import ecoImg1 from "../Images/ecoImg1.jpg";
import earth from "../Images/earth.jpg";
import grass from "../Images/grass2.jpg";
const Intro = () => {
  return (
    <div className="intro">
      <span>에코초이스는</span>
      <p>
        당신의 선택이 지구와 우리 모두에게 긍정적인 영향을 미칩니다. <br></br>지금 시작하여 우리의
        노력에 함께 참여하세요. <br />
        친환경한 삶을 누리며, 더 나은 환경을 만들어 갑시다.
      </p>
      <div className="introPicWrap">
        <img src={logoWide} alt="img" />
        <img src={ecoImg1} alt="img" />
        <img src={earth} alt="img" />
        <img src={grass} alt="img" />
      </div>
    </div>
  );
};

export default Intro;
