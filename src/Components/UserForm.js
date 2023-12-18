import styles from "../Styles/UserPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../Images/logo.jpg";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await updateUser();
      navigate("/mypage");
    } catch (error) {
      console.error(error);
    }
  };

  // 유저 정보 업데이트 관련 상태
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userProfileURL, setUserProfileURL] = useState("");
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const userdata = sessionStorage.getItem("user");

      if (userdata) {
        const userToken = JSON.parse(userdata).accessToken;
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      }
      const response = await axios.get("http://localhost:8080/users");
      console.log(response.data);
      setUser(response.data);
      setUserProfileURL(response.data.profileImageUrl);
      setUserName(response.data.nickname);
      setUserPhone(response.data.phoneNumber);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    try {
      const userdata = sessionStorage.getItem("user");

      if (userdata) {
        const userToken = JSON.parse(userdata).accessToken;
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      }
      const response = await axios.post("http://localhost:8080/users", {
        nickname: userName,
        phoneNumber: userPhone,
        profileImageUrl: userProfileURL,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <img
              style={{
                borderRadius: "50%",
                width: 12 + "%",
                margin: 10 + "px",
                border: "3px solid gray",
                aspectRatio: "1/1",
              }}
              defaultValue={userProfileURL}
              srcSet={[userProfileURL, logo]}
              alt="프로필사진"
            />
          </div>

          <table className={styles.tb}>
            <tr>
              <th>프로필 이미지</th>
              <td>
                <input
                  className="form-control"
                  type="url"
                  defaultValue={userProfileURL}
                  onChange={(event) => {
                    setUserProfileURL(event.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>이름</th>
              <td>
                <input
                  className="form-control"
                  defaultValue={userName}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>회원등급</th>
              <td>
                <input className="form-control" disabled value={user.rank} />
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                <input className="form-control" defaultValue={user.email} disabled />
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input
                  className="form-control"
                  value={userPhone}
                  onChange={(event) => {
                    setUserPhone(event.target.value);
                  }}
                />
              </td>
            </tr>
          </table>
          <div className={`btn btn-light ${styles.save}`} onClick={onSubmit}>
            저장
          </div>
        </>
      )}
    </div>
  );
};

export default UserForm;
