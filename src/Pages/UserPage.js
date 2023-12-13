import Header from "../Components/Header";
import UserForm from "../Components/UserForm";
import styles from "../Styles/UserPage.module.css";


const UserPage = () => {

    

    return(
        <div>
            <Header isFixed={true} />
            <div className={styles.bg}>
                <h1 className={styles.h1}>회원정보 수정</h1>
                <UserForm/>
            </div>
        </div>
    );
};

export default UserPage;