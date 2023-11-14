import axios from "axios";
import { useEffect, useState } from "react";

const FetchTest = () => {
  console.log("테스트용 컴포넌트입니다.");
  // 로그인 테스트
  const signUp = async () => {
    const id = "hello3@naver.com";
    const pw = "1234";

    try {
      const response = await axios.post("http://localhost:8080/auth/sign-up", {
        email: id,
        password: pw,
      });

      const data = await response.data;

      console.log("sign in test", data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    signUp();
  }, []);

  //
  return <div></div>;
};

export default FetchTest;
