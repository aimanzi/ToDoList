import "./header.scss";
import { Link } from "react-router-dom";
import HeaderImg from "../../assets/images/OIP.jpg";

const Header: React.FC = () => {
  return (
    <div className="header-main-container">
      <div>
        <img src={HeaderImg} alt="tdlimg" />
      </div>
      <div>
        <h1>List To Do</h1>
      </div>
      <div className="links-container">
        <ul className="list-item">
          <li className="linkto">
            <Link to={"/login"} className="link">
              Longin
            </Link>
          </li>
          <li className="linkto">
            <Link to={"/signup"} className="link">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
