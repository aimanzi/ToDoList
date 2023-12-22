import Header from "../mainPage-header.component/header";
import "./mainpage.scss";
import backgroundImg from "../../assets/images/360_F_452162906_FjLw4deIWXY76kMrPLJVpa9hTP4qBg3X.jpg";
import Footer from "../footer.component/footer";

const MainPage: React.FC = () => {
  return (
    <div className="mainpage-main-container">
      <Header />
      <div className="img-container">
        <img alt="bgimg" src={backgroundImg} className="desktop-image"></img>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
