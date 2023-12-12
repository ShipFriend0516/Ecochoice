import styles from "../Styles/UserPage.module.css";
import { useState } from "react";

const UserForm = () =>{
    const [id, setId] = useState('');
    const [uname, setUname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [ad, setAd] = useState('');
    const onSubmit = () =>{
        console.log(id,uname,email,phone,ad);
    };

    return (
        <div>
            <table className={styles.tb}>
                <tr>
                    <th>회원번호</th>
                    <td><input className="form-control"
                    value={id}
                    onChange={(event) =>{
                        setId(event.target.value);
                    }}
                    /></td>
                </tr>
                <tr>
                    <th>이름</th>
                    <td><input className="form-control"
                    value={uname}
                    onChange={(event) =>{
                        setUname(event.target.value);
                    }}/></td>
                </tr>
                <tr>
                    <th>회원등급</th>
                    <td>vip</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td><input className="form-control"
                    value={email}
                    onChange={(event) =>{
                        setEmail(event.target.value);
                    }}/></td>
                </tr>
                <tr>
                    <th>전화번호</th>
                    <td><input className="form-control"
                    value={phone}
                    onChange={(event) =>{
                        setPhone(event.target.value);
                    }}/></td>
                </tr>
                <tr>
                    <th>주소</th>
                    <td><input className="form-control"
                    value={ad}
                    onChange={(event) =>{
                        setAd(event.target.value);
                    }}/></td>
                </tr>
            </table>
            <div className={`btn btn-light ${styles.save}`}
            onClick={onSubmit}
            >저장</div>
        </div>
    )
}

export default UserForm;