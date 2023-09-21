import Header from "../Components/Header";
import styles from "../Styles/MyPage.module.css";
import profileImg from "../Images/logo.jpg";

const MyPage = () => {
  return (
    <div>
      <Header isFixed={true} />
      <div
        className={`d-flex flex-column justify-content-center align-items-center h-100 ${styles.myPage}`}
      >
        <div className="fs-2 bold">마이페이지</div>
        <div className={styles.top_info}>
          <div className={styles.left_contents}>
            <div className={styles.profile}>
              <div className={styles.profile_pic}>
                <img src={profileImg} alt="profileImg"></img>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.name}>님</div>
            </div>
            <div className="rank"></div>
          </div>
          <div className={styles.right_contents}>
            <div>쿠폰 1개</div>
            <div>적립금 0원</div>
            <div>등급 브론즈</div>
          </div>
        </div>
        <div className={`${styles.myPageDetail}`}></div>
      </div>
    </div>
  );
};

export default MyPage;
