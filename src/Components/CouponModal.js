import React from 'react';
import styles from '../Styles/CouponModal.module.css';

const CouponModal = ({ closeModal }) => {
  return (
    <div className={styles.container}>
      <div className={styles.background} onClick={closeModal}/>
      <div className={styles.block}>
        <div className={styles.close} onClick={closeModal}>x</div>
        <div className={styles.head}>  &gt; 쿠폰 등록</div>
        <form className='row g-2'>
            <div class="col-auto">
            <input id="coupon" className={"form-control"}></input></div>
            <div class="col-auto">
            <button className='btn btn-dark'>등록</button></div>
        </form>
      </div>
    </div>
  );
};


export default CouponModal;
