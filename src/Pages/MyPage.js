import React from 'react';
import Header from "../Components/Header";
import styles from "../Styles/MyPage.module.css";
import profileImg from "../Images/logo.jpg";
import CouponModal from "../Components/CouponModal";


const MyPage = () => {
  const [modalHandle,setModalHandle] = React.useState(false);

  return (
    <div>
      <Header isFixed={true} />
      <div
        className={`d-flex flex-column justify-content-center align-items-center h-100 ${styles.myPage}`}
      >
        <div className={styles.mytop}>
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
            <div className={styles.center_contents}>
              <div>적립금 0원</div>
              <div>등급 VIP</div>
            </div>
            <div className={styles.right_contents}>
              <div>현재 가진 쿠폰</div>
              <div className={`fs-1 ${styles.count_coupon}`}>1개</div>
              <button className={`btn btn-light ${styles.coupon_b}`} 
              onClick={() => { setModalHandle(true) }}>쿠폰 등록하기</button>

            </div>
          </div>
        </div>
        <div className={`${styles.myPageDetail}`}>
            <div className="fs-3 text-center mt-3">회원정보</div>
            <hr className={styles.top_hr}/>
          <div className="ms-3 me-3">
            <div>회원번호</div>
            <hr style={{height: 10+'px'}}/>
            <div>이름</div>
            <hr />
            <div>회원 등급</div>
            <hr />
            <div>이메일</div>
            <hr />
            <div>전화번호</div>
            <hr />
            <div>주소</div>
            <hr />
          </div>

        </div>
      </div>
      {modalHandle && <CouponModal closeModal={() => setModalHandle(false)} />}

    </div>
  );

};

export default MyPage;
