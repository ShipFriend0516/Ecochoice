import PropTypes from "prop-types";
import styles from "../Styles/SubTitle.module.css";
const SubTitle = ({ title, summary }) => {
  return (
    <div className={styles.subTitle}>
      <span>{title}</span>
      <p>{summary}</p>
    </div>
  );
};

SubTitle.props = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string,
};

export default SubTitle;
