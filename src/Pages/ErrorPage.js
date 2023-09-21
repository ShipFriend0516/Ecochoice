import Header from "../Components/Header";
import logo from "../Images/logo.jpg";

const ErrorPage = () => {
  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center bg-white">
      <Header isFixed={true} />
      <div className="errorPageWrapper d-flex flex-column align-items-center">
        <img className="rounded-5 img-thumbnail w-25" src={logo} />
        <p className="fs-1 bold">404Error!</p>
        <p>데이터베이스 연결에 실패했습니다..</p>
      </div>
    </div>
  );
};

export default ErrorPage;
