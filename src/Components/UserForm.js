import styles from "../Styles/UserPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [user, setUser] = useState("");
  const onSubmit = () => {
    console.log();
  };

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <table className={styles.tb}>
        <tr>
          <th>회원번호</th>
          <td>
            <input
              className="form-control"
              value={user.userId}
              onChange={(event) => {}}
            />
          </td>
        </tr>
        <tr>
          <th>이름</th>
          <td>
            <input
              className="form-control"
              value={user.nickname}
              onChange={(event) => {}}
            />
          </td>
        </tr>
        <tr>
          <th>회원등급</th>
          <td>
            <input className="form-control" value={user.rank} />
          </td>
        </tr>
        <tr>
          <th>Email</th>
          <td>
            <input
              className="form-control"
              value={user.email}
              onChange={(event) => {}}
            />
          </td>
        </tr>
        <tr>
          <th>전화번호</th>
          <td>
            <input
              className="form-control"
              value={user.phoneNumber}
              onChange={(event) => {}}
            />
          </td>
        </tr>
      </table>
      <div className={`btn btn-light ${styles.save}`} onClick={onSubmit}>
        저장
      </div>
    </div>
  );
};

export default UserForm;
