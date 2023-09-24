import { GrPrevious, GrNext } from "react-icons/gr";
import cover1 from "../Images/cover1.jpg";
import cover2 from "../Images/cover2.jpg";
import { useState, useEffect } from "react";
import styles from "../Styles/Slider.module.css";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [translateForce, setTranslateForce] = useState(0);
  const onClickNext = () => {
    if (currentSlide === imgURL.length) {
      return;
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };
  const onClickPrev = () => {
    if (currentSlide === 1) {
      return;
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setTranslateForce((-(currentSlide - 1) * 100) / imgURL.length);
  }, [currentSlide]);

  let imgURL = [
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1694426684_0.jpg",
    cover1,
    cover2,
  ];

  return (
    <div className={styles.sliderWrapper + " " + styles.header_img}>
      <button className={styles.prev} onClick={onClickPrev}>
        <GrPrevious />
      </button>
      <button className={styles.next} onClick={onClickNext}>
        <GrNext />
      </button>
      <div className={styles.imgWrapper} style={{ transform: `translateX(${translateForce}%)` }}>
        {imgURL.map((imageUrl, index) => (
          <img src={imageUrl} alt={`cover-${index}`} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Slider;
