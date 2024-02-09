import Header from "../mainPage-header.component/header";
import "./mainpage.scss";
import backgroundImg from "../../assets/images/360_F_452162906_FjLw4deIWXY76kMrPLJVpa9hTP4qBg3X.jpg";
import Footer from "../footer.component/footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LogIn from "../login.component/login";
import SignUp from "../signup.component/signup";

const MainPage: React.FC = () => {
  const [page, setPage] = useState<string | JSX.Element | null>(null);
  const userSelection: string = useSelector(
    (state: any) => state.AllReducers.userselect.selector
  );

  useEffect(() => {
    switch (userSelection) {
      case "login":
        setPage(<LogIn />);
        break;
      case "signup":
        setPage(<SignUp />);
        break;
      default:
        setPage("");
        break;
    }
  }, [userSelection]);

  return (
    <div className="mainpage-main-container">
      <Header />
      <div>
        <div className="img-container">
          <img alt="bgimg" src={backgroundImg} className="desktop-image"></img>
        </div>
        <div className="pageDisplay">{page}</div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
